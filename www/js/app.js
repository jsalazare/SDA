// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js


angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives', 'app.services', 'ionic.cloud', 'ionic.cloud.init', 'firebase', 'firebaseConfig', 'ionic.contrib.ui.cards', 'ngCordova', 'ionic.contrib.ui.tinderCards','ngDraggable'])


    .config(function ($ionicConfigProvider, $sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist(['self', '*://www.youtube.com/**', '*://player.vimeo.com/video/**']);
    })

    .run(function (
        $window,
        $document,
        $ionicLoading,
        $state,
        $ionicPlatform,
        $log,
        $rootScope,
        GeofencePluginMock,
        GeoFenceTransitionStorager,
        $ionicPopup,
        PouchDBTest,
        HashUsersInEvents,
        ShakeService,
        HarcodedFences,
        Utils,
        RandomUser,
        ChangesService,
        RestRequestService,
        $http
    ) {

        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }

            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

            if ($window.geofence === undefined) {
                $log.warn("Geofence Plugin not found. Using mock insteaddd.");
                $window.geofence = GeofencePluginMock;
                $window.TransitionType = GeofencePluginMock.TransitionType;
            }


            // window.geofence is now available
            HashUsersInEvents.fillHash().then(function (hash) {
                console.log(hash);
            });

            var options = {
                frequency: 100, // Measure every 100ms
                deviation: 70  // We'll use deviation to determine the shake event, best values in the range between 25 and 30
            };

            // Start measurements when Cordova device is ready
            /**
             * Watching for everytime the user shake his phone.
             */
            ShakeService.startWatching(function () {
                if (RandomUser.getUser()) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Shake Mode',
                        template: 'Shake Activated.'
                    });
                    alertPopup.then(function (res) {
                        console.log('ok presed');
                    });

                    console.log('Sh-Sh-Sh-Shaked');
                    var myuser = RandomUser.getUser();

                    RestRequestService.shakeRequest(myuser).then(function successful(res) {
                        console.log(res.data);
                    }, function error(err) {
                        console.log(err);
                    });
                }
            }, options);

            //Listen for live changes on subscription files in the database.
            ChangesService.liveChangesInShakes(function (change) {
                if (change.deleted) {

                } else {
                    var names = "";
                    var flag = false;
                    change.doc.users.forEach(function (user) {
                        names = user.name + ", " + names;
                        if (user._id == RandomUser.getUser()._id) {
                            flag = true;
                        }
                    })

                    if (flag) {
                        $ionicPopup.alert({
                            title: 'Shake Mode',
                            template: names + 'have shaked their Phones, let\'s share a secret or an idea!'
                        });
                    }
                }
            });

            var _addGeoFences = HarcodedFences.getAllHardcodedFences();

            //Load the GeoFences stored in teh data base.
            GeoFenceTransitionStorager.toArray().then(function (res) {
                console.log("Local storaged Fences: ");
                console.log(res);
            });

            $window.geofence.initialize().then(function () {
                console.log("Successful initialization");

                $window.geofence.removeAll().then(function () {
                    console.log('All previous geofences successfully removed.');
                    $window.geofence.addOrUpdate(_addGeoFences).then(function () {
                        console.log('All new Geofences successfully added');
                    }, function (reason) {
                        console.log('Adding all geofences failed', reason);
                    });
                }, function (reason) {
                    console.log('Removing geofences failed', reason);
                });

                $window.geofence.onTransitionReceived = function (geofences) {
                    //console.log(geofences);
                    if (geofences) {
                        var smallestGeo = Utils.findSmallestFence(geofences);
                        $ionicPopup.alert({
                            title: smallestGeo.notification.title,
                            template: smallestGeo.notification.text
                        });
                        GeoFenceTransitionStorager.addGeo(smallestGeo).then(function (res) {
                            console.log('new Fence Added to the storage');
                            /*EventService.syncEventWithLocalFences().then(function(res){
                                console.log(res);
                                EventStorager.toArray().then(function(res){
                                    console.log("Events Registered in local storage");
                                    console.log(res);
                                });
                            });*/
                        });
                    }
                };

                $window.geofence.onNotificationClicked = function (notificationData) {
                    if (notificationData) {

                    }
                    //GeoFenceTransitionStorager.addGeo(notificationData);
                    $state.go('landingpage');
                };

            }, function (error) {
                console.log("Error", error);
            });
        });

    })