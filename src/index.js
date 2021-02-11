import './styles.css';
// import {createStore} from "./createStore";
import {applyMiddleware, createStore, compose} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';

import {rootReducer} from "./redux/rootReducer";
import {asyncIncrement, changeTheme, decrement, increment} from "./redux/actionCreators";
import thunk from "redux-thunk";
import logger from "redux-logger";

const counter = document.getElementById('counter');
const addBtn = document.getElementById('add');
const subBtn = document.getElementById('sub');
const asyncBtn = document.getElementById('async');
const themeBtn = document.getElementById('theme');

// How middleware function works (thunk or etc.)
// function logger (state) {
//     return function (next) {
//         return function (action) {
//             console.log("STATE:", state);
//             console.log("next:", next);
//             console.log("action:", action);
//             return next(action)
//         }
//     }
// }

// create a store
// const store = createStore(rootReducer, compose(
//     applyMiddleware(thunk, logger),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // this line and function compose() connect our app state with devtools in the browser
// ));

// have added redux-devtools-extension and imported composeWithDevTools to handl joining app stor to browser devtools
const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk, logger),
));

console.log('thunk',thunk);


// make the store global variable
window.store = store;

addBtn.addEventListener('click', () => {
    store.dispatch(increment());
});
subBtn.addEventListener('click', () => {
    store.dispatch(decrement());
});
asyncBtn.addEventListener('click', () => {
    store.dispatch(asyncIncrement());
});
themeBtn.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('light') ? 'dark' : 'light';
    store.dispatch(changeTheme(newTheme));

});
store.subscribe(() => {
    const state = store.getState();
    counter.textContent = state.counter;
    document.body.className = state.theme.value;
    [addBtn,subBtn,themeBtn,asyncBtn].forEach((btn) => {
        btn.disabled = state.theme.disabled;
    })

});

store.dispatch({type: '__INITIAL_STATE__'});