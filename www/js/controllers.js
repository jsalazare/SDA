angular.module('app.controllers', [])


    /**
     * Concerning Controller for the side menu.
     * encapsulate all logic for the side menu here.
     */

    .controller('menuCtrl', ['$scope', '$stateParams', '$state', 'FireB',
        function($scope, $stateParams, $state, FireB) {

            //$scope.userData = $ionicUser.details;
            /*$scope.logout = function () {

                FireB.auth().signOut().then(function () {
                    $state.go('login');
                }, function (error) {
                    alert(error.message);
                });
            };*/

        }])

    /**
    * Concerning Controller for the login page.
    */

    .controller('loginCtrl', ['$scope', '$stateParams', '$state', 'FireB', 'RandomUser', '$http',
        function($scope, $stateParams, $state, FireB, RandomUser, $http) {
            console.log("Login Controller Started");

            $scope.data = {
                'email': '',
                'password': ''
            }

            $scope.error = '';

            //Create a new random user
            RandomUser.setUser(FireB.auth().currentUser);
            var user = RandomUser.getUser();

            if (user) {
                console.log("usuario logeado");
                console.log(user);
                $state.go("menu.landingpage");
            }

            // login method for firebase authentication.
            $scope.login = function() {
                $scope.error = '';
                FireB.auth().signInWithEmailAndPassword($scope.data.email, $scope.data.password)
                    .then(function() {
                        $state.go("menu.landingpage");
                        RandomUser.setUser(FireB.auth().currentUser);
                        user = RandomUser.getUser();
                    })
                    .catch(function(error) {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        $scope.error = errorMessage;
                        $scope.$apply();
                    });
            };


            //in case of login as Anonymous.
            $scope.loginAnonymous = function() {
                $state.go("menu.landingpage");
                RandomUser.setRandomUser();
                user = RandomUser.getUser();
            };


        }])

    /**
    * Concerning Controller for the sign Up page.
    */
    .controller('signUpCtrl', ['$scope', '$stateParams', '$state', '$timeout', 'FireB',
        function($scope, $stateParams, $state, $timeout, FireB) {

            $scope.data = {
                'name': '',
                'email': '',
                'password': ''
            }

            $scope.error = '';
            /**
             * call this motheod for siging up using firebase Auth.
             */
            $scope.signup = function() {

                FireB.auth().createUserWithEmailAndPassword($scope.data.email, $scope.data.password)
                    .then(function() {

                        FireB.auth().currentUser.sendEmailVerification().then(function() {

                            $scope.error = 'Your User has been created. We sent a verification email to you';
                            $scope.$apply();
                            $timeout(function() {
                                $state.go('login');
                                $scope.error = '';
                            }, 4000);
                        }, function(error) {
                            console.log("un error: " + error.message);
                        });
                    })
                    .catch(function(error) {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        $scope.error = errorMessage;
                        $scope.$apply();
                    });

            };

            $scope.back = function() {
                $state.go('login');
            };
        }])


    /**
     *  Concerning Controller for the forgotPass page.
     * 
     */
    .controller('forgotPassCtrl', ['$scope', '$stateParams', '$state', 'FireB',
        function($scope, $stateParams, $state, FireB) {

            $scope.data = {
                'email': ''
            }

            $scope.msg = '';

            /**
             * invoke the FireBase services for resetting your password.
             * 
             */
            $scope.forgotPass = function() {
                FireB.auth().sendPasswordResetEmail($scope.data.email).then(function() {
                    $scope.msg = 'We have sent an email to you';
                    $scope.$apply();
                }, function(error) {
                    $scope.msg = error.message;
                    $scope.$apply();
                    alert(error.message)
                });
            };
        }])

    /**
     *  Concerning Controller for the profile Controller.
     */
    .controller('profileCtrl', ['$scope', '$stateParams',
        function($scope, $stateParams) {


        }])

    /**
     * Concerning Controller for the cards page.
     * largest controller with the biggest implementation.
     */
    .controller('CardsCtrl', ['$scope', '$interval', '$ionicSwipeCardDelegate', '$ionicPlatform', '$rootScope', 'GeoFenceTransitionStorager', 'EventService', 'RestRequestService', 'ChangesService', 'RandomUser', 'HashUsersInEvents', '$location'
        , '$ionicPopup', '$ionicModal', '$state', function($scope, $interval, $ionicSwipeCardDelegate, $ionicPlatform, $rootScope, GeoFenceTransitionStorager, EventService, RestRequestService, ChangesService, RandomUser, HashUsersInEvents, $location, $ionicPopup, $ionicModal, $state) {

            var geofencetitle;
            var geofence;
            console.log('cardsControlersLoaded');
            var cardTypes = [];
            $scope.numberOfSubs = 0;
            //Use this method to handle the information of the geofences every time the app is oppened by a notification.
            $ionicPlatform.ready(function() {
                var geos = [];
                GeoFenceTransitionStorager.toArray().then(function(geoFences) {
                    geos = geoFences;
                });
            });

            //Use this method to handle the information of the geofences when the app is oppened from the background
            $ionicPlatform.on('resume', function() {
                var geos = [];
                GeoFenceTransitionStorager.toArray().then(function(geoFences) {
                    geos = geoFences;
                });
            });

            // Method triggered when the user chose between the diferentes options in the landing page..
            // it filter between the events storaged on the database.
            $scope.$watch('$root.eventDiscriminator', function() {
                cardTypes = EventService.getEventsFiltered();
                $scope.cards = cardTypes.slice();
                $scope.actual = 0
            });


            cardTypes = EventService.getEventsFiltered();
            var myuser = RandomUser.getUser();
            $scope.myUserId = myuser._id;

            //Called when you slide a card.
            $scope.cardDestroyed = function(index) {
                $scope.cards.splice(index, 1);
            };


            $scope.saveLastCard = function(index) {
                $scope.lastCard = cardTypes[index];
            }


            $scope.goBack = function() {
                $state.go('menu.landingpage');
                /*momentCards = $scope.cards.slice();
                momentCards.splice($scope.actual, 0, $scope.lastCard);
                $scope.cards = momentCards.reverse();*/
            }

            //Called when the user accept the card. it creates a new subscription file.
            $scope.cardSwiped = function(userid, idEvent) {
                console.log('swiped');
                increaseActual();
                RestRequestService.subscribeToShare(userid, idEvent)
                    .then(function success(response) {
                        console.log('Sussesfully subscripted' + response);
                    }, function error(response) {
                        console.log('error in subscripted');
                        console.log(response);
                    });
            };

            var hash;
            var userSubscripted;
            //Initiliazitate the UserHash.
            HashUsersInEvents.fillHash().then(function(res) {
                hash = res;
                console.log('hash loaded');
                $scope.$watch('actual', function() {
                    console.log('actual changed');
                    getUsersInShare(hash);
                });
            });

            function increaseActual() {
                /*if ($scope.actual < cardTypes.length - 1) {
                    $scope.actual++;
                }*/
                $scope.actual++;
            }

            function getUsersInShare(hash) {
                var previousCard = cardTypes[$scope.actual - 1];
                if (previousCard) {
                    var previousUsersIds = hash.getItem(previousCard._id);
                    $scope.previousUsers = RandomUser.findUsers(previousUsersIds);;
                }

                var actualCard = cardTypes[$scope.actual];
                if (actualCard) {
                    var usersIds = hash.getItem(actualCard._id);
                    userSubscripted = RandomUser.findUsers(usersIds);
                    $scope.users = userSubscripted;
                }
            };


            // Method executed everytime the user open the respective view.
            // Initiliazitate the changes service, detects when a new user subscribe to an event.
            // and refill the UserHash for the new user.
            var changePromise;
            $scope.$on("$ionicView.enter", function(event, data) {
                changePromise = ChangesService.liveChangesInSubs(function onChange(change) {
                    console.log('general change callback');
                    if (change.deleted) {
                        console.log(change);
                        console.log('something was deleted');
                        // document was deleted
                    } else {
                        // document was added/modified
                        if (change.doc.doc_type) {
                            HashUsersInEvents.fillHash().then(function(newHash) {
                                hash = newHash;
                                hash.each(function(key, item) {
                                    if (item.length >= 4) {
                                        RestRequestService.checkLimit(key).then(function(res) {

                                        });
                                    }
                                });
                                getUsersInShare(hash);
                            });
                        }
                    }
                })
            });

            // Stop the connection with CloudAnt when the user leave the view.
            $scope.$on("$ionicView.leave", function(event, data) {
                //ChangesService.cancelChanges();
                changePromise.cancel();
            });

            //countdown timer till the event starts
            var countDownDate = new Date("2017-04-19 17:00").getTime();
            $interval(countdownTimer, 1000);
            function countdownTimer() {

                var now = new Date().getTime();

                var distance = countDownDate - now;
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                if (minutes < 10) {
                    minutes = "0" + minutes;
                }
                if (seconds < 10) {
                    seconds = "0" + seconds;
                }
                $scope.date = minutes + ":" + seconds;
            }

            $scope.alertPopup;
            $scope.invitePopup;
            $scope.acceptPopup;
            $scope.chatPopup;
            $scope.alertMe = function() {
                $scope.alertPopup = $ionicPopup.show({
                    cssClass: 'myPopup',
                    title: 'Title',
                    templateUrl: 'templates/popUPprofile.html',
                    scope: $scope
                });
            };

            $scope.closeAlertPopup = function() {
                console.log('click');
                $scope.alertPopup.close();
            }

            $scope.closeAcceptPopup = function() {
                console.log('click');
                $scope.acceptPopup.close();

            }
            $scope.closeInvitePopup = function() {
                console.log('click');
                $scope.invitePopup.close();

            }

            /*$scope.myValue=false;
            $scope.myValue2=false;*/
            $scope.AcceptRide = function() {


                $scope.acceptPopup = $ionicPopup.show({
                    cssClass: 'myPopup',
                    title: 'Title',
                    templateUrl: 'templates/acceptCard.html',
                    scope: $scope
                });
            };
            /*$scope.CancelRide=function()
             {
                $scope.myValue2=true;
 
 
             }*/

            $scope.InviteOthers = function() {
                $scope.acceptPopup.close();

                $scope.invitePopup = $ionicPopup.show({
                    cssClass: 'myPopup',
                    title: 'Title',
                    templateUrl: 'templates/inviteCard.html',
                    scope: $scope
                });
            };
            $scope.chat = function() {
                console.log("ivanaaa");
                $scope.chatPopup = $ionicPopup.show({
                    title: 'Chat with Ivana',
                    subTitle: 'Send her a message now!',
                    template: '<input type="email">',
                    scope: $scope,
                    buttons: [{ text: 'Send' }]


                });

            };



            $scope.isClickedhistory = false;
            $scope.isClickedpersonal = false;
            $scope.SwitchTabHistory = function() {
                $scope.isClickedhistory = !$scope.isClickedhistory;
                $scope.isClickedpersonal = false;

            };

            $scope.SwitchTabPersonal = function() {
                $scope.isClickedpersonal = !$scope.isClickedpersonal;
                $scope.isClickedhistory = false;
            }
            $scope.switchOwlview = function() {

                $scope.invitePopup.close();
                $state.go("menu.owlview");
            }

            $scope.onDragComplete = function(data, evt) {
                alert("You invited someone to join the ride!");
                console.log("drag success, data:", evt);

            }
            $scope.droppedObj = [];
            $scope.onDropComplete = function(data, evt) {
                var index = $scope.droppedObj.indexOf(evt);
                if (index == -1) {
                    $scope.droppedObj.push(evt);
                }
            }




        }])










    .controller('CardCtrl', ['$scope', '$ionicSwipeCardDelegate', function($scope, $ionicSwipeCardDelegate) {
        $scope.goAway = function() {
            var card = $ionicSwipeCardDelegate.getSwipeableCard($scope);
            card.swipe();
        };

        $scope.accept = function() {
            alert("Hello world!");
        };
    }])






    /**
     * Concerning Controller for the landing page
     */
    .controller('landingpageCtrl', ['$scope', '$stateParams', '$window', '$location', 'EventService', '$ionicSideMenuDelegate', '$state', function($scope, $stateParams, $window, $location, EventService, $ionicSideMenuDelegate, $state) {
        $scope.dev_width = $window.innerWidth;
        $scope.dev_height = $window.innerHeight;
        console.log('landingPage loadded');

        // Method called when the user click on any square on the landing page.
        $scope.goToCards = function(eventDiscriminator) {
            if (eventDiscriminator == 'restaurant') {

                $state.go('menu.cardsRestaurant');

            }
            else {
                $state.go('menu.cards');

            }
            EventService.setEventDiscriminator(eventDiscriminator);
        }

        $scope.toggleRight = function() {
            $ionicSideMenuDelegate.toggleRight();
        };

    }])

    /**
     * Concerning Controller for the Accept Event PopUp.
     *
     */
    .controller('AcceptEventCtrl', ['$scope', '$stateParams', '$window', '$location', function($scope, $stateParams, $window, $location) {



    }])

    /**
     * Concerning Controller for the profile page
     */
    .controller('ProfileCtrl', ['$scope', '$ionicHistory', function($scope, $ionicHistory) {
        console.log('goingback');
        $scope.myGoBack = function() {
            console.log('goingback');
            $ionicHistory.goBack();
        };

    }])

    /**
     * Concerning Controller for the OwlView page
     */
    .controller('OwlViewCtrl', ['$scope', 'DirectionTracking', '$cordovaDeviceOrientation', 'DeviceOrientationService', function($scope, DirectionTracking, $cordovaDeviceOrientation, DeviceOrientationService) {

        // create fake random coordinates.
        var list = DirectionTracking.createFakeCoordinates(100);
        var groupSeparator = 30;

        //creates the hash with the concerning number
        DirectionTracking.fillHash(groupSeparator);
        var hash = DirectionTracking.getHash();
        console.log(hash);
        var count = 0;
        /*hash.each(function (key, item) {
            count = item.length + count;
        });

        console.log(count);*/
        var lengthOfArr = 0;

        // called when all dependencies of the device are loaded.
        document.addEventListener("deviceready", function() {

            var options = {
                frequency: 500
            };

            //Cordova plugin that listen for changes on the device orientation, in this case we use it to track the compass.
            var watch = $cordovaDeviceOrientation.watchHeading(options).then(
                function(res) {
                    console.log(res);
                },
                function(error) {
                    // An error occurred
                    console.log("error");
                },
                function(result) {   // updates constantly (depending on frequency value)
                    var magneticHeading = result.magneticHeading;
                    var trueHeading = result.trueHeading === undefined ? 0 : result.trueHeading;
                    var accuracy = result.headingAccuracy;
                    var timeStamp = result.timestamp;

                    var intTrueHeading = Math.floor(trueHeading);
                    var group = DirectionTracking.detectGroup(intTrueHeading, groupSeparator);
                    $scope.angle = intTrueHeading;

                    var groupLength = hash.getItem(group) === undefined ? 0 : hash.getItem(group).length;
                    $scope.numCoord = groupLength;

                });
            //watch.clearWatch();
        }, false);

        $scope.showView = false;
        function callback(eventData) {
            var tiltFB = eventData.beta;
            if (50 <= tiltFB && tiltFB <= 150) {
                $scope.showView = true;
            } else {
                $scope.showView = false;
            }
        }

        // Every time the user enter to the respective view, the phone start to listen for the phone rotation.
        // used to detect when the user rise up his phone.
        $scope.$on("$ionicView.enter", function(event, data) {
            DeviceOrientationService.listenForRotation(callback);
        });
        // stop listening when the user leave the view.
        $scope.$on("$ionicView.leave", function(event, data) {
            DeviceOrientationService.stopListening(callback);
            console.log('leave');
        });

    }])



    /**
     * Concerning Controller for the Setting page.
     */
    .controller('SettingsCtrl', ['$scope', '$cordovaDeviceMotion', '$ionicPlatform', 'ShakeService', '$ionicPopup', '$ionicLoading', '$compile', function($scope, $cordovaDeviceMotion, $ionicPlatform, ShakeService, $ionicPopup, $ionicLoading, $compile) {

        mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbmFrIiwiYSI6ImNqMTdmaDR4cDA1Mmcycm82OGVoYzJ2ZXEifQ.YzmGomBxoSIhvlHtoYhy_A';
        var mymap = new mapboxgl.Map({
            container: 'mapid',
            style: 'mapbox://styles/mapbox/streets-v9'
        });
    }])



