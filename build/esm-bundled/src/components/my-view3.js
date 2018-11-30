import{LitElement,html,connect,store,addToCartIcon,removeFromCartIcon,ButtonSharedStyles,PageViewElement,SharedStyles}from"./my-app.js";function defaultEqualityCheck(a,b){return a===b}function areArgumentsShallowlyEqual(equalityCheck,prev,next){if(null===prev||null===next||prev.length!==next.length){return!1}for(var length=prev.length,i=0;i<length;i++){if(!equalityCheck(prev[i],next[i])){return!1}}return!0}function defaultMemoize(func){var equalityCheck=1<arguments.length&&arguments[1]!==void 0?arguments[1]:defaultEqualityCheck,lastArgs=null,lastResult=null;return function(){if(!areArgumentsShallowlyEqual(equalityCheck,lastArgs,arguments)){lastResult=func.apply(null,arguments)}lastArgs=arguments;return lastResult}}function getDependencies(funcs){var dependencies=Array.isArray(funcs[0])?funcs[0]:funcs;if(!dependencies.every(function(dep){return"function"===typeof dep})){var dependencyTypes=dependencies.map(function(dep){return typeof dep}).join(", ");throw new Error("Selector creators expect all input-selectors to be functions, "+("instead received the following types: ["+dependencyTypes+"]"))}return dependencies}function createSelectorCreator(memoize){for(var _len=arguments.length,memoizeOptions=Array(1<_len?_len-1:0),_key=1;_key<_len;_key++){memoizeOptions[_key-1]=arguments[_key]}return function(){for(var _len2=arguments.length,funcs=Array(_len2),_key2=0;_key2<_len2;_key2++){funcs[_key2]=arguments[_key2]}var recomputations=0,resultFunc=funcs.pop(),dependencies=getDependencies(funcs),memoizedResultFunc=memoize.apply(void 0,[function(){recomputations++;return resultFunc.apply(null,arguments)}].concat(memoizeOptions)),selector=memoize(function(){for(var params=[],length=dependencies.length,i=0;i<length;i++){params.push(dependencies[i].apply(null,arguments))}return memoizedResultFunc.apply(null,params)});selector.resultFunc=resultFunc;selector.dependencies=dependencies;selector.recomputations=function(){return recomputations};selector.resetRecomputations=function(){return recomputations=0};return selector}}var createSelector=createSelectorCreator(defaultMemoize);function createStructuredSelector(selectors){var selectorCreator=1<arguments.length&&arguments[1]!==void 0?arguments[1]:createSelector;if("object"!==typeof selectors){throw new Error("createStructuredSelector expects first argument to be an object "+("where each property is a selector, instead received a "+typeof selectors))}var objectKeys=Object.keys(selectors);return selectorCreator(objectKeys.map(function(key){return selectors[key]}),function(){for(var _len3=arguments.length,values=Array(_len3),_key3=0;_key3<_len3;_key3++){values[_key3]=arguments[_key3]}return values.reduce(function(composition,value,index){composition[objectKeys[index]]=value;return composition},{})})}var index={defaultMemoize:defaultMemoize,createSelectorCreator:createSelectorCreator,createSelector:createSelector,createStructuredSelector:createStructuredSelector};const GET_PRODUCTS="GET_PRODUCTS",ADD_TO_CART="ADD_TO_CART",REMOVE_FROM_CART="REMOVE_FROM_CART",CHECKOUT_SUCCESS="CHECKOUT_SUCCESS",CHECKOUT_FAILURE="CHECKOUT_FAILURE",PRODUCT_LIST=[{id:1,title:"Zebra Fox",des:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nis",price:10.99,inventory:2,img:"1.png"},{id:2,title:"Deer Horse",des:"velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",price:29.99,inventory:10,img:"2.png"},{id:3,title:"Pink n Blue Fox",des:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quas",price:8.99,inventory:5,img:"3.png"},{id:4,title:"Bunny Horse",des:"t enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel e",price:24.99,inventory:7,img:"4.png"},{id:5,title:"Flying Green Fox Horse",des:"nis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vit",price:11.99,inventory:3,img:"5.png"}],getAllProducts=()=>dispatch=>{const products=PRODUCT_LIST.reduce((obj,product)=>{obj[product.id]=product;return obj},{});dispatch({type:GET_PRODUCTS,products})},checkout=()=>dispatch=>{const flip=Math.floor(2*Math.random());if(0===flip){dispatch({type:CHECKOUT_FAILURE})}else{dispatch({type:CHECKOUT_SUCCESS})}},addToCart=productId=>(dispatch,getState)=>{const state=getState();if(0<state.shop.products[productId].inventory){dispatch(addToCartUnsafe(productId))}},removeFromCart=productId=>{return{type:REMOVE_FROM_CART,productId}},addToCartUnsafe=productId=>{return{type:ADD_TO_CART,productId}};var shop={GET_PRODUCTS:GET_PRODUCTS,ADD_TO_CART:ADD_TO_CART,REMOVE_FROM_CART:REMOVE_FROM_CART,CHECKOUT_SUCCESS:CHECKOUT_SUCCESS,CHECKOUT_FAILURE:CHECKOUT_FAILURE,getAllProducts:getAllProducts,checkout:checkout,addToCart:addToCart,removeFromCart:removeFromCart,addToCartUnsafe:addToCartUnsafe};const INITIAL_STATE={products:{},cart:{},error:""},shop$1=(state=INITIAL_STATE,action)=>{switch(action.type){case GET_PRODUCTS:return{...state,products:action.products};case ADD_TO_CART:case REMOVE_FROM_CART:case CHECKOUT_SUCCESS:return{...state,products:products(state.products,action),cart:cart(state.cart,action),error:""};case CHECKOUT_FAILURE:return{...state,error:"Checkout failed. Please try again"};default:return state;}},products=(state,action)=>{switch(action.type){case ADD_TO_CART:case REMOVE_FROM_CART:const productId=action.productId;return{...state,[productId]:product(state[productId],action)};default:return state;}},product=(state,action)=>{switch(action.type){case ADD_TO_CART:return{...state,inventory:state.inventory-1};case REMOVE_FROM_CART:return{...state,inventory:state.inventory+1};default:return state;}},cart=(state,action)=>{switch(action.type){case ADD_TO_CART:const addId=action.productId;return{...state,[addId]:(state[addId]||0)+1};case REMOVE_FROM_CART:const removeId=action.productId,quantity=(state[removeId]||0)-1;if(0>=quantity){const newState={...state};delete newState[removeId];return newState}else{return{...state,[removeId]:quantity}}case CHECKOUT_SUCCESS:return{};default:return state;}},cartSelector=state=>state.shop.cart,productsSelector=state=>state.shop.products,cartItemsSelector=createSelector(cartSelector,productsSelector,(cart,products)=>{return Object.keys(cart).map(id=>{const item=products[id];return{id:item.id,title:item.title,amount:cart[id],price:item.price}})}),cartTotalSelector=createSelector(cartSelector,productsSelector,(cart,products)=>{let total=0;Object.keys(cart).forEach(id=>{const item=products[id];total+=item.price*cart[id]});return Math.round(100*total)/100}),cartQuantitySelector=createSelector(cartSelector,cart=>{let num=0;Object.keys(cart).forEach(id=>{num+=cart[id]});return num});var shop$2={default:shop$1,cartItemsSelector:cartItemsSelector,cartTotalSelector:cartTotalSelector,cartQuantitySelector:cartQuantitySelector};class ShopItem extends LitElement{render(){return html`
      ${this.name}:
      <span ?hidden="${0===this.amount}">${this.amount} * </span>
      $${this.price}
      </span>
    `}static get properties(){return{name:{type:String},amount:{type:String},price:{type:String}}}}window.customElements.define("shop-item",ShopItem);class ShopProducts extends connect(store)(LitElement){render(){return html`
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
      ${Object.keys(this._products).map(key=>{const item=this._products[key];return html`
          <div class="adopt">

          <div class="container">
  
          <img class="next_to" src="images/${item.img}">

         
            <shop-item name="${item.title}" amount="${item.inventory}" price="${item.price}" class="next_to"></shop-item>
          <p> ${item.des}</p>       
   
          </div>

            <button
                .disabled="${0===item.inventory}"
                @click="${this._addButtonClicked}"
                data-index="${item.id}"
                title="${0===item.inventory?"Sold out":"Add to cart"}">
              ${0===item.inventory?"Sold out":addToCartIcon}
            </button>
          </div>
        `})}
    `}static get properties(){return{_products:{type:Object}}}firstUpdated(){store.dispatch(getAllProducts())}_addButtonClicked(e){store.dispatch(addToCart(e.currentTarget.dataset.index))}stateChanged(state){this._products=state.shop.products}}window.customElements.define("shop-products",ShopProducts);class ShopCart extends connect(store)(LitElement){render(){return html`
      ${ButtonSharedStyles}
      <style>
        :host { display: block; }
      </style>
      <p ?hidden="${0!==this._items.length}">You have not yet chosen someone to Adopt...</p>
      ${this._items.map(item=>html`
          <div>
            <shop-item .name="${item.title}" .amount="${item.amount}" .price="${item.price}"></shop-item>
            <button
                @click="${this._removeButtonClicked}"
                data-index="${item.id}"
                title="Remove from cart">
              ${removeFromCartIcon}
            </button>
          </div>
        `)}
      <p ?hidden="${!this._items.length}"><b>Total:</b> ${this._total}</p>
    `}static get properties(){return{_items:{type:Array},_total:{type:Number}}}_removeButtonClicked(e){store.dispatch(removeFromCart(e.currentTarget.dataset.index))}stateChanged(state){this._items=cartItemsSelector(state);this._total=cartTotalSelector(state)}}window.customElements.define("shop-cart",ShopCart);store.addReducers({shop:shop$1});class MyView3 extends connect(store)(PageViewElement){render(){return html`
      ${SharedStyles}
      ${ButtonSharedStyles}

      <style>
        button {
          border: 2px solid var(--app-dark-text-color);
          border-radius: 3px;
          padding: 8px 16px;
        }
        button:hover {
          border-color: var(--app-primary-color);
          color: var(--app-primary-color);
        }
        .cart, .cart svg {
          fill: var(--app-primary-color);
          width: 64px;
          height: 64px;
        }
        .circle.small {
          margin-top: -72px;
          width: 28px;
          height: 28px;
          font-size: 16px;
          font-weight: bold;
          line-height: 30px;

        }

        p{
          font-family: "Adobe Myungjo Std";
          text-align:center;
        }

        h3{
          font-family: 'Gabriola';
          font-size:2.6rem;
          text-align:center;
        }

        
        h4{
          font-family: 'Gabriola';
          font-size:2rem;
          text-align:center;
        }

        #cart{
          
          border: 4px #ffe6e6 dotted;
          margin-bottom:3rem;
        }

      </style>
      
      <section>
        <h2>Purchase magical beings</h2>
        <div class="cart">${addToCartIcon}<div class="circle small">${this._quantity}</div></div>
        <p>Get your own magical beings!</p>
      </section>



      <section>
        <h3>Animals you can Adopt!</h3>
        
<div id="cart">
        <br>
        <h4>Beings you have chosen to Adopt</h4>
        <shop-cart></shop-cart>

        <div>${this._error}</div>
        <br>

        </div>


        <p>
          <button ?hidden="${0==this._quantity}" @click="${this._checkoutButtonClicked}">
            Adopt
          </button>
        </p>
        
        <shop-products></shop-products>
      </section>
    `}static get properties(){return{_quantity:{type:Number},_error:{type:String}}}_checkoutButtonClicked(){store.dispatch(checkout())}stateChanged(state){this._quantity=cartQuantitySelector(state);this._error=state.shop.error}}window.customElements.define("my-view3",MyView3);export{index as $index,shop as $shop,shop$2 as $shop$1,defaultMemoize,createSelectorCreator,createSelector,createStructuredSelector,GET_PRODUCTS,ADD_TO_CART,REMOVE_FROM_CART,CHECKOUT_SUCCESS,CHECKOUT_FAILURE,getAllProducts,checkout,addToCart,removeFromCart,addToCartUnsafe,shop$1 as $shopDefault,cartItemsSelector,cartTotalSelector,cartQuantitySelector};