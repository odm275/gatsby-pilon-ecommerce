import config from '../config';
//  TYPES
const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
const CLEAR_AUTHENTICATED_USER = 'CLEAR_AUTHENTICATED_USER';
const SET_AUTHENTICATED_CUSTOMER = 'SET_AUTHENTICATED_CUSTOMER';

//  AUTH
const initialState = {
  token: null,
  environmentId: null,
  customerId: null,
  expiration: null,
  redirectAfterLogin: null,
  customer: {},
};
//reducers
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case AUTHENTICATE_USER:
      return {
        ...state,
        user: payload,
      };
    case CLEAR_AUTHENTICATED_USER:
      return {
        ...state.auth,
        token: null,
        environmentId: null,
        customerId: null,
        expiration: null,
        redirectAfterLogin: null,
      };
    case SET_AUTHENTICATED_CUSTOMER:
      return {
        ...state.auth.customer,
        ...payload,
      };
    default:
      return state;
  }
};
//actions
export const register = customerData => dispatch => {
  config.pilonApi
    .post('/token', {
      token_scope: 'public',
      environment_id: config.environmentId,
    })
    .then(resToken => {
      config.pilonApi
        .post(
          '/customers',
          {
            environment: `/v1/environments/${config.environmentId}`,
            first_name: customerData.firstName,
            last_name: customerData.lastName,
            email: customerData.email,
            password: customerData.password,
          },
          {
            headers: {
              Authorization: `Bearer ${resToken.data.token}`,
            },
          },
        )
        .then(() => {
          dispatch(
            login({
              email: customerData.email,
              password: customerData.password,
            }),
          );
        })
        .catch(error => console.log(error));
    });
};

export const login = authData => dispatch => {
  config.pilonApi
    .post('/token', {
      token_scope: 'customer',
      environment_id: config.environmentId,
      customer_email: authData.email,
      password: authData.password,
    })
    .then(res => {
      // Calculate expiration times
      const now = new Date();
      const expirationDate = new Date(
        now.getTime() + res.data.expires_in * 1000,
      );
      // Build authData
      const authState = {
        token: res.data.token,
        environmentId: res.data.environment_id,
        customerId: res.data.customer_id,
        expiration: expirationDate.toString(),
      };
      // Save to local storage
      localStorage.setItem('auth.token', authState.token);
      localStorage.setItem('auth.environmentId', authState.environmentId);
      localStorage.setItem('auth.customerId', authState.customerId);
      localStorage.setItem('auth.expiration', authState.expiration);
      // Commit auth to state
      dispatch(authenticateUser(authState));
      // Set timer for auto-logout
      dispatch(setAutoLogoutTimer(res.data.expires_in));
      // Fetch customer
      dispatch(fetchCustomerDetails(authState.customerId));

      // ToDo: Redirect
    })
    .catch(error => console.log(error));
};

export const logout = () => dispatch => {
  // Clear auth from state
  commit('clearAuthenticatedUser');
  // Clear auth from local storage
  localStorage.removeItem('auth.token');
  localStorage.removeItem('auth.environmentId');
  localStorage.removeItem('auth.customerId');
  localStorage.removeItem('auth.expiration');
  // TODO: Redirect home if we're on a secured page
};

const tryAuthFromLocalStorage = () => dispatch => {
  const token = localStorage.getItem('auth.token');
  if (!token) {
    return;
  }
  const expirationDate = new Date(localStorage.getItem('auth.expiration'));
  const now = new Date();
  if (now >= expirationDate) {
    return;
  }
  const expiresIn = expirationDate - now;
  const customerId = localStorage.getItem('auth.customerId');
  const environmentId = localStorage.getItem('auth.environmentId');
  dispatch(
    authenticatedUser({
      token,
      environmentId,
      customerId,
      expiration: expirationDate,
    }),
  );
  dispatch(setAutoLogoutTimer(expiresIn));
  dispatch(fetchCustomerDetails(customerId));
};

const setAutoLogoutTimer = expirationTime => dispatch => {
  setTimeout(() => {
    dispatch(logout);
  }, expirationTime * 1000);
};
const fetchCustomerDetails = customerId => dispatch => {
  config.pilonApi
    .get(`/customers/${customerId}`, {
      headers: {
        Authorization: `Bearer ${state.auth.token}`,
      },
    })
    .then(res => {
      dispatch(setAuthenticatedCustomer(res.data));
    });
};

//
const authenticateUser = authState => {
  return {
    type: AUTHENTICATE_USER,
    payload: authState,
  };
};

const setAuthenticatedCustomer = customer => {
  return {
    type: SET_AUTHENTICATED_CUSTOMER,
    payload: customer,
  };
};
