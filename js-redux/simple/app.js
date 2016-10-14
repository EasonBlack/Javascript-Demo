const counter = (state = 0, action={type:null})=> {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

const { createStore } = Redux;
const store = createStore(counter);

const render=()=> {
    document.body.innerHTML =
        '<h1>Clicked: ' +
        store.getState() +
        ' times.';
};

store.subscribe(render);
render();

document.addEventListener('click', ()=> {
    store.dispatch({ type: 'INCREMENT' });
});