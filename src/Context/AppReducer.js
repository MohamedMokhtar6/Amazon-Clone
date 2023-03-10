export const getBasketTotal = (basket) => {
  return basket.reduce((amount, item) => {
    return +amount + +item.price;
  }, 0);
};
export const initialState = {
  basket: [],
  user: null,
};
function AppReducer(state = initialState, action) {
  switch (action.type) {
    case "Set_User":
      return {
        ...state,
        user: action.user,
      };
    case "Add_To_Cart":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "Empty_Basket":
      return {
        ...state,
        basket: [],
      };
    case "Remove_From_Basket":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.log(`cant remove ${action.id}`);
      }
      return {
        ...state,
        basket: newBasket,
      };
    default:
      return state;
  }
}

export default AppReducer;
