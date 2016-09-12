
var thunk = middlewareAPI => next => action => {
    if (typeof action === 'function'){
        return action(middlewareAPI.dispatch,middlewareAPI.getState);
    } else {
        return next(action);
    }
}