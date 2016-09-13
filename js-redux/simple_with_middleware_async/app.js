const actions = {
    fetch: ()=> {
        return (dispatch) => {
            setTimeout(()=> {
                dispatch(actions.showList('xxxxx'));
            }, 1000)
        }
    },

    showList: (str)=> {
        return {
            type: 'SHOW',
            str: str
        }
    }
}

const reducer = (state = 0, action = {type: null})=> {
    switch (action.type) {
        case 'SHOW':
            return action.str + new Date().toString();
        default:
            return state;
    }
}

const {createStore} = Redux;

let middlewares = Redux.applyMiddleware(thunk);

const store = createStore(reducer, middlewares);


const render = ()=> {
    document.body.innerHTML =
        '<h1>Clicked: ' +
        store.getState() +
        ' times.';
};

store.subscribe(render);
render();

document.addEventListener('click', ()=> {
    store.dispatch(actions.fetch());

});