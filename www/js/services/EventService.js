angular.module('app.services')
    /**
     * manage everything related with the events.
     */

    .service('EventService', ['$rootScope', 'GeoFenceTransitionStorager', 'EventStorager', function ($rootScope, GeoFenceTransitionStorager, EventStorager) {

        $rootScope.eventDiscriminator;

        var eventsInLocalStorage;

        EventStorager.toArray().then(function (res) {
            eventsInLocalStorage = res;
        });



        var fakeEventsFixed = [
            {
                "_id": "2671eb515fff45ce49c71a7a128d10b4",
                "_rev": "1-7618a2a093f6b759536fe3e2fea97f89",
                "doc_type": "event",
                "id_geofence": "e4ea6cadcdd6b3d64a5ecbafdadd48e2",
                "type": "train",
                "status": "availabe",
                "info": {
                    "name": "Train on Building 6",
                    "description": "some description"
                },
                "departure": {
                    "type": "feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            "48.993461",
                            "8.401950"
                        ]
                    },
                    "properties": {
                        "name": "canteen",
                        "description": "Share in the cantine"
                    }
                },
                "destiny": null,
                "starting_time": null,
                "ending_time": null
            },
            {
                "_id": "1",
                "_rev": "1-3be485a4bcfb6cf5ef68e2ba8a3a154d",
                "doc_type": "event",
                "id_geofence": "56ff15859808bfb05ae55b3518b3116e",
                "type": "taxi",
                "status": "availabe",
                "info": {
                    "name": "Taxy on Building 6",
                    "description": "some description"
                },
                "departure": {
                    "type": "feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            "48.993461",
                            "8.401950"
                        ]
                    },
                    "properties": {
                        "name": "Taxi In Hbf",
                        "description": ""
                    }
                },
                "destiny": {
                    "type": "feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            "48.993461",
                            "8.401950"
                        ]
                    },
                    "properties": {
                        "name": "Fiducia",
                        "description": ""
                    }
                },
                "starting_time": "8:30 AM",
                "ending_time": null
            },
            {
                "_id": "2",
                "_rev": "1-3be485a4bcfb6cf5ef68e2ba8a3a154d",
                "doc_type": "event",
                "id_geofence": "e4ea6cadcdd6b3d64a5ecbafdadd48e2",
                "type": "taxi",
                "status": "availabe",
                "info": {
                    "name": "Taxi on Building 6",
                    "description": "some description"
                },
                "departure": {
                    "type": "feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            "48.993461",
                            "8.401950"
                        ]
                    },
                    "properties": {
                        "name": "Taxi In Hbf",
                        "description": ""
                    }
                },
                "destiny": {
                    "type": "feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            "48.993461",
                            "8.401950"
                        ]
                    },
                    "properties": {
                        "name": "Fiducia",
                        "description": ""
                    }
                },
                "starting_time": "8:30 AM",
                "ending_time": null
            },
            {
                "_id": "f7ac95b58077fc13b28fdd332fe1fbcc",
                "_rev": "1-b3bbb32781e32be6f7e53dee6121970a",
                "doc_type": "event",
                "id_geofence": "e4ea6cadcdd6b3d64a5ecbafdadd48e2",
                "type": "restaurant",
                "status": "availabe",
                "info": {
                    "name": "diner in building 6",
                    "description": "some description"
                },
                "departure": {
                    "type": "feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            "48.994696",
                            "8.446619"
                        ]
                    },
                    "properties": {
                        "name": "canteen",
                        "description": "Share in the cantine"
                    }
                },
                "destiny": null,
                "starting_time": null,
                "ending_time": null
            },
            {
                "_id": "f7ac95b58077fc13b28fdd332fe20a1e",
                "_rev": "1-e7230cbb1ddb89edd3300b1fc2043e0e",
                "doc_type": "event",
                "id_geofence": "509c882611c018e7097be24b46d7d3c0",
                "type": "restaurant",
                "status": "availabe",
                "info": {
                    "name": "dinner in Canteen",
                    "description": "some description"
                },
                "departure": {
                    "type": "feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            "48.994703",
                            "8.446626"
                        ]
                    },
                    "properties": {
                        "name": "canteen",
                        "description": "Share in the cantine"
                    }
                },
                "destiny": null,
                "starting_time": null,
                "ending_time": null
            }
        ];

        /**
         * Get the fences storaged in the local storage, search for the related event 
         * and storage the related ones in the local storage.
         * 
         */
        this.syncEventWithLocalFences = function () {
            var self = this;
            self.clean().then(function (res) {

            });
            return GeoFenceTransitionStorager.toArray().then(function (geoFences) {
                geos = geoFences;
                geos.forEach(function (geo) {
                    var events = this.getEventsByFenceId(geo.data.id);
                    events.forEach(function (event) {
                        EventStorager.addEvent(event);
                    });
                });
                return 'Successfully Event Local Storage updated with GeoFenceLocal';
            });
        };

        /**
         * Return the events that match with the fence id sent in the parameters.
         */
        this.getEventsByFenceId = function (fenceId) {
            var res = [];
            fakeEventsFixed.forEach(function (event) {
                if (event.id_geofence === fenceId) {
                    res.push(event);
                }
            });
            return res;
        };


        /**
         * Find the type event that match with type sent in parameters.
         */
        this.filterBy = function (option) {
            var res = [];
            fakeEventsFixed.forEach(function (card) {
                if (card.type === option) {
                    res.push(card);
                }
            });
            return res;
        };

        /**
         * return all the fake events.
         */
        this.getAllEvents = function () {
            return fakeEventsFixed;
        };

        /**
         * return the events filtered by the user selection.
         */
        this.getEventsFiltered = function () {
            return this.filterBy($rootScope.eventDiscriminator);
        };

        /**
         * Set the root variable event discriminator.
         */
        this.setEventDiscriminator = function (value) {
            $rootScope.eventDiscriminator = value;
        };

        /**
         * get the current value of the event discriminator.
         */
        this.getEventDiscriminator = function () {
            return $rootScope.eventDiscriminator;
        };

    }]);