import angular from 'angular';
import 'angular-route';
import route from './route';

angular.module('app', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        route($routeProvider);
    }]);
