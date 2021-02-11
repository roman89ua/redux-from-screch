import './styles.css';
import {createStore} from "./createStore";
import {rootReducer} from "./redux/rootReducer";

const counter = document.getElementById('counter');
const addBtn = document.getElementById('add');
const subBtn = document.getElementById('sub');
const asyncBtn = document.getElementById('async');
const themeBtn = document.getElementById('theme');


const store = createStore(rootReducer, 0);

window.store = store;

addBtn.addEventListener('click', () => {
    store.dispatch({type: 'INCREMENT'});
    // counter.textContent = store.getState().toString();
});
subBtn.addEventListener('click', () => {
    store.dispatch({type: 'DECREMENT'});
    // counter.textContent = store.getState().toString();
});
asyncBtn.addEventListener('click', () => {

});
themeBtn.addEventListener('click', () => {
    // document.body.classList.toggle('dark');
});
store.subscribe(()=>{
    counter.textContent = store.getState().toString();
})

store.dispatch({type: '__INITIAL_STATE__'});