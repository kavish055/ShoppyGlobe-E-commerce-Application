import React from "react";

const initialState = {
  cart: [],
  searchQuery: "",
};

// Reducer to handle cart and search actions
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        ),
      };

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };

    case "SET_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.payload,
      };

    default:
      return state;
  }
};

const StoreContext = React.createContext();

// The provider that wraps app and supplies store state and dispatch
const StoreProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(cartReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

// Hook for consuming store context with error handling
const useStore = () => {
  const context = React.useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
};

export { StoreProvider, StoreContext, useStore };
