const initialState = {
  isDrawerOpen: false,
};
//action
const TOOGLE_DRAWER = 'TOGGLE_DRAWER';
export const toggleDrawer = open => ({ type: TOOGLE_DRAWER, payload: open });
//reducer
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TOOGLE_DRAWER:
      return { ...state, isDrawerOpen: payload };
    default:
      return state;
  }
};
