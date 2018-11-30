/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the elements needed by this element.
import './shop-item.js';

// These are the actions needed by this element.
import { getAllProducts, addToCart } from '../actions/shop.js';

// These are the elements needed by this element.
import { addToCartIcon } from './my-icons.js';

// These are the shared styles needed by this element.
import { ButtonSharedStyles } from './button-shared-styles.js';

class ShopProducts extends connect(store)(LitElement) {
  render() {
    return html`
      ${ButtonSharedStyles}
      <style>
        :host { display: block; }

        img{
          max-width:150px !important;
          height:auto;
          background-color:#fff;
          opacity:0.6;
          border-radius: 55%;
          padding:1.5rem;
          display:block;
          text-align:center;
          margin:0 auto;
        }
          img:hover{
            opacity:1;
          }

        shop-item{
          font-size:1.5rem;
          font-family: 'Gabriola';
        }

        p{
          text-align:left;
        }

        button{
          margin-bottom:2rem;
        }
    
      </style>
      ${Object.keys(this._products).map((key) => {
        const item = this._products[key];
        return html`
          <div class="adopt">

          <div class="container">
  
          <img class="next_to" src="images/${item.img}">

         
            <shop-item name="${item.title}" amount="${item.inventory}" price="${item.price}" class="next_to"></shop-item>
          <p> ${item.des}</p>       
   
          </div>

            <button
                .disabled="${item.inventory === 0}"
                @click="${this._addButtonClicked}"
                data-index="${item.id}"
                title="${item.inventory === 0 ? 'Sold out' : 'Add to cart'}">
              ${item.inventory === 0 ? 'Sold out' : addToCartIcon}
            </button>
          </div>
        `
      })}
    `;
  }

  static get properties() {
    return {
      _products: { type: Object }
    }
  }

  firstUpdated() {
    store.dispatch(getAllProducts());
  }

  _addButtonClicked(e) {
    store.dispatch(addToCart(e.currentTarget.dataset['index']));
  }

  // This is called every time something is updated in the store.
  stateChanged(state) {
    this._products = state.shop.products;
  }
}

window.customElements.define('shop-products', ShopProducts);
