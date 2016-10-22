angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.mainpage', {
        url: '/mainpage',
        views: {
            'menuContent': {
                templateUrl: 'js/mainpage/mainpage.html',
                controller: 'MainPageCtrl'
            }
        }
    })

    .state('app.aboutpage', {
        url: '/aboutpage',
        views: {
            'menuContent': {
                templateUrl: 'js/aboutpage/aboutpage.html',
                controller: 'AboutPageCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/mainpage');
});




angular.module('starter.controllers', [])
.controller('AppCtrl', function($scope, $ionicModal) {
    // App controller
})
