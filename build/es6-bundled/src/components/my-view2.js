define(["exports","./my-app.js"],function(_exports,_myApp){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.$counterDefault=_exports.decrement=_exports.increment=_exports.DECREMENT=_exports.INCREMENT=_exports.$counter$1=_exports.$counter=void 0;const INCREMENT="INCREMENT";_exports.INCREMENT=INCREMENT;const DECREMENT="DECREMENT";_exports.DECREMENT=DECREMENT;const increment=()=>{return{type:INCREMENT}};_exports.increment=increment;const decrement=()=>{return{type:DECREMENT}};_exports.decrement=decrement;var counter={INCREMENT:INCREMENT,DECREMENT:DECREMENT,increment:increment,decrement:decrement};_exports.$counter=counter;class CounterElement extends _myApp.LitElement{render(){return _myApp.html`
      ${_myApp.ButtonSharedStyles}
      <style>
        span { width: 20px; display: inline-block; text-align: center; font-weight: bold;}
      </style>
      <div>
        <p>
          Clicked: <span>${this.clicks}</span> times.
          Cents donated: <span>${this.value}</span>.
          <button @click="${this._onIncrement}" title="Add 1">${_myApp.plusIcon}</button>
          <button @click="${this._onDecrement}" title="Minus 1">${_myApp.minusIcon}</button>
        </p>
      </div>
    `}static get properties(){return{clicks:{type:Number},value:{type:Number}}}constructor(){super();this.clicks=0;this.value=0}_onIncrement(){this.value++;this.clicks++;this.dispatchEvent(new CustomEvent("counter-incremented"))}_onDecrement(){this.value--;this.clicks++;this.dispatchEvent(new CustomEvent("counter-decremented"))}}window.customElements.define("counter-element",CounterElement);const INITIAL_STATE={clicks:0,value:0},counter$1=(state=INITIAL_STATE,action)=>{switch(action.type){case INCREMENT:return{clicks:state.clicks+1,value:state.value+1};case DECREMENT:return{clicks:state.clicks+1,value:state.value-1};default:return state;}};_exports.$counterDefault=counter$1;var counter$2={default:counter$1};_exports.$counter$1=counter$2;_myApp.store.addReducers({counter:counter$1});class MyView2 extends(0,_myApp.connect)(_myApp.store)(_myApp.PageViewElement){render(){return _myApp.html`
      ${_myApp.SharedStyles}
      <section>
        <h2>Click to help!</h2>
        <div class="circle">${this._value}</div>
        <p>Everytime you click the plus, magic will be send to those sad little beings! - </p>
        <p> For every click 1 cent is donated by *This foundation is made up*! </p>
        <br><br>
      </section>
      <section>
        <p>
          <counter-element value="${this._value}" clicks="${this._clicks}"
              @counter-incremented="${this._counterIncremented}"
              @counter-decremented="${this._counterDecremented}">
          </counter-element>
        </p>
      </section>
    `}static get properties(){return{_clicks:{type:Number},_value:{type:Number}}}_counterIncremented(){_myApp.store.dispatch(increment())}_counterDecremented(){_myApp.store.dispatch(decrement())}stateChanged(state){this._clicks=state.counter.clicks;this._value=state.counter.value}}window.customElements.define("my-view2",MyView2)});