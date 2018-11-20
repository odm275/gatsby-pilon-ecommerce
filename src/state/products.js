import config from '../config';
const GET_PRODUCTS = 'GET_PRODUCTS';
const initialState = {
  productList: null,
};

//reducers
export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        productList: payload,
      };
    default:
      return state;
  }
};

export const getShopProducts = () => dispatch => {
  config.pilonApi
    .post('/token', {
      token_scope: 'public',
      environment_id: config.environmentId,
    })
    .then(resToken => {
      config.pilonApi
        .get('/products', {
          headers: {
            Authorization: `Bearer ${resToken.data.token}`,
            Accept: 'application/json',
          },
        })
        .then(resProducts => {
          const products = resProducts.data;
          dispatch({
            type: GET_PRODUCTS,
            payload: products,
          });
        });
    });
};
