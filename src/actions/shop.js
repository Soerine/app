/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS';
export const CHECKOUT_FAILURE = 'CHECKOUT_FAILURE';

const PRODUCT_LIST = [
  { "id": 1, "title": "Unicorn with stripes", "price": 10.99, "inventory": 2, "img": "1.png" },
  { "id": 2, "title": "Cat with wings", "price": 29.99, "inventory": 10, "img": "2.png" },
  { "id": 3, "title": "Rainbow colored pig with cheese powers", "price": 8.99, "inventory": 5, "img": "3.png" },
  { "id": 4, "title": "Ninjatrained lizard", "price": 24.99, "inventory": 7, "img": "4.png" },
  { "id": 5, "title": "Dragon but tiny", "price": 11.99, "inventory": 3, "img": "5.png" }
];

export const getAllProducts = () => (dispatch) => {
  // Here you would normally get the data from the server. We're simulating
  // that by dispatching an async action (that you would dispatch when you
  // succesfully got the data back)

  // You could reformat the data in the right format as well:
  const products = PRODUCT_LIST.reduce((obj, product) => {
    obj[product.id] = product
    return obj
  }, {});

  dispatch({
    type: GET_PRODUCTS,
    products
  });
};

export const checkout = () => (dispatch) => {
  // Here you could do things like credit card validation, etc.
  // If that fails, dispatch CHECKOUT_FAILURE. We're simulating that
  // by flipping a coin :)
  const flip = Math.floor(Math.random() * 2);
  if (flip === 0) {
    dispatch({
      type: CHECKOUT_FAILURE
    });
  } else {
    dispatch({
      type: CHECKOUT_SUCCESS
    });
  }
};

export const addToCart = (productId) => (dispatch, getState) => {
  const state = getState();
  // Just because the UI thinks you can add this to the cart
  // doesn't mean it's in the inventory (user could've fixed it);
  if (state.shop.products[productId].inventory > 0) {
    dispatch(addToCartUnsafe(productId));
  }
};

export const removeFromCart = (productId) => {
  return {
    type: REMOVE_FROM_CART,
    productId
  };
};

export const addToCartUnsafe = (productId) => {
  return {
    type: ADD_TO_CART,
    productId
  };
};
