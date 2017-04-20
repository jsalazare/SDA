angular.module('app.services', [])

    .factory('BlankFactory', [function () {

    }])

    .service('BlankService', [function () {

    }])


    /**
     * Pouch Db service using the standar connection, this service exist in the code.
     * but doesnt have functionality
     */
    .service('PouchDB', [function () {
        var database = new PouchDB("https://fe82bdd7-d3e4-4c61-9262-81def867a92a-bluemix.cloudant.com/geofences");
        return database;

    }])

    /**
     * PouchDB service that implemente the full cloudAnt Credentails, fully functionality
     * 
     * */
    .service('PouchDBTest', [function () {
        var host = "https://5833fbb2-4eff-4abe-a692-ebbc37023812-bluemix:37b302ac28fe971d6a923bbcebb14a2b783c754c4a80531769dfd2dc687b6a74@5833fbb2-4eff-4abe-a692-ebbc37023812-bluemix.cloudant.com";

        var database = new PouchDB(host + "/geotest");
        return database;
    }])


    /**
     * This service manage local storage of the phone, 
     * the porpouse is to have an Story of the geofences that the user entered before.
     * If the user close the application and reopen again, 
     * the previous geofences that the user entered before will be there.
     */
    .factory('GeoFenceTransitionStorager', function ($q) {
        var db = new PouchDB("GeoFenceLocal");
        var _geofences;

        return {
            /**
             * Add a new fence to the local storage.
             */
            addGeo: function (geo) {
                return $q.when(db.post({
                    data: geo
                }));
            },
            /**
             * Clean the whole local storage.
             */
            clean: function () {
                var self = this;
                _geofences = undefined;
                return self.toArray().then(function (geoFencesArray) {
                    geoFencesArray.forEach(function (geo) {
                        geo._deleted = true;
                    });
                    return db.bulkDocs(geoFencesArray).then(function (result) {
                        _geofences = undefined;
                        return _geofences;
                    }).catch(function (err) {
                        console.log(err);
                    });
                }).catch(function () {

                })
            },
            /**
             * Since local storage, manage the information in a diferent format.
             * This method return the geofence storaged as a JavaScript array.
             */
            toArray: function () {
                var BatchOfFiles = [];
                var geoFences = [];
                if (!_geofences) {
                    return $q.when(db.allDocs({ include_docs: true })
                    ).then(function (result) {
                        result.rows.forEach(function (file) {
                            BatchOfFiles.push(file.doc);
                        });
                        _geofences = BatchOfFiles;
                        return _geofences;
                    }).catch(function (err) {
                        console.log(err);
                    });
                } else {
                    return $q.when(_geofences);
                }
            }
        };
    })


    /**
     * As the previous service, this service manage the Local Storage as well.
     * based on the geofences that the user entered beofre, 
     * the porpouse is to have an Story of the event related with each geofence.
     * this service just manage to storage the information in the device.
     */
    .factory('EventStorager', function ($q, GeoFenceTransitionStorager) {
        var db = new PouchDB("EventsLocal");
        var _events;

        return {
            /**
             * Add a new event to the local storage.
             */
            addEvent: function (event) {
                return $q.when(db.post({
                    data: event
                }));
            },

            /**
             * Clean the whole local storage.
             */
            clean: function () {
                var self = this;
                _events = undefined;
                return self.toArray().then(function (eventsArray) {
                    eventsArray.forEach(function (event) {
                        event._deleted = true;
                    });
                    return db.bulkDocs(eventsArray).then(function (result) {
                        _events = undefined;
                        return _events;
                    }).catch(function (err) {
                        console.log(err);
                    });
                }).catch(function () {

                })
            },
            /**
             * Since local storage, manage the information in a diferent format.
             * This method return the geofence storaged as a JavaScript array.
             */
            toArray: function () {
                var BatchOfFiles = [];
                var events = [];
                if (!_events) {
                    return $q.when(db.allDocs({ include_docs: true })
                    ).then(function (result) {
                        result.rows.forEach(function (file) {
                            BatchOfFiles.push(file.doc.data);
                        });
                        _events = BatchOfFiles;
                        return _events;
                    }).catch(function (err) {
                        console.log(err);
                    });
                } else {
                    return $q.when(_events);
                }
            }
        };
    })


    /**
     * This service process the subscriptions existing in the database.
     * the porpouse is to convet the subscription files in a hash 
     * where the key is the event id and as value an array with the users id of the users subscribed.
     */

    .service('HashUsersInEvents', ['EventService', 'RestRequestService', '$rootScope', '$q', function (EventService, RestRequestService, $rootScope, $q) {
        var h;

        //var fakeEvents = EventService.getAllEvents();
        var hostURL = 'http://sharedota-restapi.eu-gb.mybluemix.net';
        // var hostURL = 'http://localhost:8080';

        /**
         * return a hash, where the keys are the event's id and the values
         * are an array of the people subscribed to the concerning event.
         */
        this.fillHash = function () {
            return RestRequestService.getRequest(hostURL + '/getAllSubscriptions', {}).then(function (response) {
                h = new HashTable();
                response.data.forEach(function (item, index) {
                    if (!h.hasItem(item.id_event)) {
                        h.setItem(item.id_event, [item.id_user]);
                    } else {
                        var arr = h.getItem(item.id_event);
                        arr.push(item.id_user);
                        h.setItem(item.id_event, arr)
                    }
                });
                return h;
            })
        };

        /**
         * return the hash.
         * 
         */
        this.getHash = function () {
            if (!h) {
                return $q.when(this.fillHash());
            } else {
                return $q.when(h);
            }
        };

    }])

    /**
     * Manage everything related with HTTP request nessesary in the app.
     */
    .service('RestRequestService', ['$http', 'PouchDBTest', function ($http, PouchDBTest) {

        //var hostURL = 'http://cors.io/?http://localhost:8080';
        var hostURL = 'http://sharedota-restapi.eu-gb.mybluemix.net';
        //var hostURL = 'http://localhost:8080';

        /**
         * subscribe to an event. Receive the id of the event and the user id
         * of the user to subscribe.
         */
        this.subscribeToShare = function (idUser, idEvent) {
            return $http({
                method: 'GET',
                url: hostURL + '/subscribe',
                params: { "idUser": idUser, "idEvent": idEvent }
            });
        }

        /**
         * Sent the user information every time the user shake his phone.
         * receive as a parameter the user information.
         */
        this.shakeRequest = function (userData) {
            return $http({
                method: 'GET',
                url: 'http://sharedota-restapi.eu-gb.mybluemix.net' + '/sendShake',
                params: userData
            })
        }

        /**
         * Method that restar the subscribes in an event when the event reach the limit.
         * receive as a parameter the event id of the event to check.
         * 
         */
        this.checkLimit = function (eventID) {
            return $http({
                method: 'GET',
                url: hostURL + '/deleteIfReachLimit',
                params: { "eventID": eventID }
            });
        }

        /**
         * Standar HTTP request, it receive as a parameter,
         * the url and the params of the request.
         * 
         */
        this.getRequest = function (url, params) {
            return $http({
                method: 'GET',
                url: url,
                params: params
            });
        }

    }])


    /**
     * This service manage the listener that listen for changes on the database.
     */
    .service('ChangesService', ['PouchDBTest', function (PouchDBTest) {
        /**
         * Listen for new subscription file created on the database.
         */
        this.liveChangesInSubs = function (callback) {
            return PouchDBTest.changes({
                since: 'now',
                live: true,
                include_docs: true,
                filter: function (doc) {
                    return doc.doc_type === 'event_user';
                }
            }).on('change', function (change) {
                callback(change);
            }).on('error', function (err) {
                // handle errors
            });
        }
        /**
         * listen for every shake file create on the database.
         */
        this.liveChangesInShakes = function (callback) {
            return PouchDBTest.changes({
                since: 'now',
                live: true,
                include_docs: true,
                filter: function (doc) {
                    return doc.doc_type === 'shake';
                }
            }).on('change', function (change) {
                callback(change);
            }).on('error', function (err) {
                // handle errors
            });
        }
    }])

    /**
     * Create random users in case of anonymous log in.
     */
    .service('RandomUser', ['PouchDBTest', function (PouchDBTest) {

        var myUser;
        var users = [
            {
                "_id": "4a7128279c1f71sdfsdrh234h234234",
                "_rev": "3-55ca340c393cfe23bb0c022cad258af2",
                "doc_type": "user",
                "name": "ivana",
                "src": "ivana.png",
                "nickname": "DefaultNickname1",
                "department": "DefaultDepartment1"
            },
           
          {
                "_id": "gsdfgerg4r5234g2354e3rwer",
                "_rev": "3-55ca340c393cfe23bb0c022cad258af2",
                "doc_type": "user",
                "name": "javier",
                "src": "javier.png",
                "nickname": "DefaultNickname2",
                "department": "DefaultDepartment2"
            },
            {
                "_id": "sdfwr2354ywet2345werwerwe5234",
                "_rev": "3-55ca340c393cfe23bb0c022cad258af2",
                "doc_type": "user",
                "name": "tala",
                "src": "tala.png",
                "nickname": "DefaultNickname5",
                "department": "DefaultDepartment5"
            }
        ];

        /**
         * Set the new random user.
         */
        this.setRandomUser = function () {
            var random = Math.floor(Math.random() * 5);
            myUser = users[random];
            return myUser;
        };

        /**
         * get the random user.
         */
        this.getUser = function () {
            return myUser;
        };

        /**
         * set the user received in the parameters.
         */
        this.setUser = function (user) {
            myUser = user;
        };

        /**
         * Return an array of userJSON that match with the ids sent as parameters.
         * receive as parameter an array with the users id of the users to find.
         * 
         */
        this.findUsers = function (arrayUsersId) {
            var usersFounded = [];
            arrayUsersId.forEach(function (registerUsersId) {
                users.forEach(function (user) {
                    if (registerUsersId === user._id) {
                        if(usersFounded.length<5)
                        {
                        usersFounded.push(user);
                        }
                    }
                });

            });

            return usersFounded;
        };
    }])


    .filter('relativets', function () {
        return function (value) {
            var now = new Date();
            var diff = now - value;

            // ms units
            var second = 1000;
            var minute = second * 60;
            var hour = minute * 60;
            var day = hour * 24;
            var year = day * 365;
            var month = day * 30;

            var unit = day;
            var unitStr = 'd';
            if (diff > year) {
                unit = year;
                unitStr = 'y';
            } else if (diff > day) {
                unit = day;
                unitStr = 'd';
            } else if (diff > hour) {
                unit = hour;
                unitStr = 'h';
            } else if (diff > minute) {
                unit = minute;
                unitStr = 'm';
            } else {
                unit = second;
                unitStr = 's';
            }

            var amt = Math.ceil(diff / unit);
            return amt + '' + unitStr;
        }
    })


    /**
     * Service to create any utility method.
     */
    .factory('Utils', function () {

        
        var _findSmallestFence = function (geofences) {
            var bigNumber = 999999999;
            var smallest = null;
            geofences.forEach(function (geo) {
                if (geo.radius <= bigNumber) {
                    smallest = geo;
                    bigNumber = geo.radius
                }
            })
            return smallest;
        }

        return {
            findSmallestFence: _findSmallestFence
        }


    });




