
export default ($routeProvider)=> {
    $routeProvider
        .when('/home',
        {
            templateUrl: 'interface/home/index.html',
            controller: 'appCtrl'
        })
        .when('/temp1',
        {
            templateUrl: 'interface/temp1/index.html',
            controller: 'tempCtrl'
        })
        .otherwise({redirectTo: '/home'});

}
