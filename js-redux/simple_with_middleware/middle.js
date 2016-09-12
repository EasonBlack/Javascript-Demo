
var loggerFactory = middlewareAPI => next => action =>{
    console.log('middleware called');
    return next(action);
}