export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return [...state, action.payload];
    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload.id);
    case "INCREMENT_QUANTITY":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    case "DECREMENT_QUANTITY":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      );

    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
};

export const addToCart = (dispatch) => (product) => {
  dispatch({ type: "ADD_TO_CART", payload: product });
};

export const removeFromCart = (dispatch) => (product) => {
  dispatch({ type: "REMOVE_FROM_CART", payload: product });
};

export const incrementQuantity = (dispatch) => (product) => {
  dispatch({ type: "INCREMENT_QUANTITY", payload: product });
};

export const decrementQuantity = (dispatch) => (product) => {
  dispatch({ type: "DECREMENT_QUANTITY", payload: product });
};

export const clearCart = (dispatch) => () => {
  dispatch({ type: "CLEAR_CART" });
};
