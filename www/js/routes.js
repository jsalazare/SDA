

angular.module('app.routes', [])

   
    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            
            .state('menu', {
                url: '/side-menu21',
                templateUrl: 'templates/menu.html',
                abstract: true,
                controller: 'menuCtrl'
            })

            .state('menu.landingpage', {
                url: "/landingpage",
                views: {
                    'side-menu21': {
                        templateUrl: 'templates/landingpage.html',
                        controller: 'landingpageCtrl'
                    }
                }
            })

            .state('menu.profile', {
                url: "/profile",
                views: {
                    'side-menu21': {
                        templateUrl: 'templates/profile.html',
                        controller: 'ProfileCtrl'
                    }
                }
            })
            .state('menu.myshares', {
                url: "/myshares",
                views: {
                    'side-menu21': {
                        templateUrl: 'templates/myshares.html',
                        controller: 'SettingsCtrl'
                    }
                }
            })

            .state('menu.owlview', {
                url: "/owlview",
                views: {
                    'side-menu21': {
                        templateUrl: 'templates/owlView.html',
                        controller: 'OwlViewCtrl'
                    }
                }
            })

            .state('menu.cards', {
                url: "/cards",
                views: {
                    'side-menu21': {
                        templateUrl: 'templates/CardsView.html',
                        controller: 'CardsCtrl'
                    }
                }
            })
             .state('menu.cardsRestaurant', {
                url: "/cardsrestaurant",
                views: {
                    'side-menu21': {
                        templateUrl: 'templates/restaurantCard.html',
                        controller: 'CardsCtrl'
                    }
                }
            })


            .state('acceptevent', {
                url: '/acceptevent',
                templateUrl: 'templates/acceptEventPage.html',
                controller: 'AcceptEventCtrl'
            })

            .state('login', {
                url: '/loginPage',
                templateUrl: 'templates/login.html',
                controller: 'loginCtrl'
            })

            .state('signUp', {
                url: '/signUpPage',
                templateUrl: 'templates/signUp.html',
                controller: 'signUpCtrl'
            })

            .state('forgotPass', {
                url: '/forgotPage',
                templateUrl: 'templates/forgotPass.html',
                controller: 'forgotPassCtrl'
            })

        $urlRouterProvider.otherwise('/loginPage');


    });