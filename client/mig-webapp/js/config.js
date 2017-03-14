app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: './templates/home.html',
            controller: 'homeCtrl',
            css: './css/home.css'
        })
        .state('getAction', {
            url: '/action/:actionId',
            templateUrl: '/templates/getAction.html',
            controller: 'actionCtrl',
            css: './css/getAction.css'
        })
        .state('investigator', {
            url: '/investigator/',
            templateUrl: '/templates/investigator.html',
            controller: 'investigatorCtrl',
            css: './css/investigator.css'
        })
        .state('actionCreate', {
            url: '/actionCreate/',
            templateUrl: '/templates/actionCreate.html',
            controller: 'actionCreateCtrl',
            css: './css/actionCreate.css'
        });
    /*.state('actionId', {
        parent: 'home',
        templateUrl: './templates/getAction.html',
        //            controller: 'homeCtrl'
        controller: 'actionCtrl'
    });*/

});