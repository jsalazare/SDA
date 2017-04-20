angular.module('app.services')

    .factory('DirectionTracking', function () {

        var hash = new HashTable();
        var _coordinates = [];

        function Coordinates(x, y) {
            this.x = x;
            this.y = y;

        }

        return {

            getHash: function(){
                return hash;
               
            },

            //calculate the angle of direction of each GPS coordinate 
            CalculateAngle: function (gpsCoordinate) {

                var angleofDirection = 0;
                if (gpsCoordinate.x >= 0 && gpsCoordinate.y >= 0) {
                    angleofDirection = (Math.atan((gpsCoordinate.x / gpsCoordinate.y)) * (180 / Math.PI));
                }
                else if (gpsCoordinate.x >= 0 && gpsCoordinate.y < 0) {
                    angleofDirection = (Math.atan((gpsCoordinate.x / gpsCoordinate.y)) * (180 / Math.PI)) + 180;
                }
                else if (gpsCoordinate.x <= 0 && gpsCoordinate.y < 0) {
                    angleofDirection = (Math.atan((gpsCoordinate.x / gpsCoordinate.y)) * (180 / Math.PI)) + 180;
                }
                else if (gpsCoordinate.x <= 0 && gpsCoordinate.y >= 0) {
                    angleofDirection = (Math.atan((gpsCoordinate.x / gpsCoordinate.y)) * (180 / Math.PI)) + 360;
                }

                return Math.floor(angleofDirection);
            },
            // 10 ==> [objCoor1,objCoor2,objCoor3];
            // 20 ==> [objCoor1,objCoor2,objCoor3];
            // 30 ==> [objCoor1,objCoor2,objCoor3];
            // 40 ==> [objCoor1,objCoor2,objCoor3];


            //get all the GPScoordinates that are in the same angle of direction with the device
            fillHash: function (separator) {
                var arr = [];
                var angle = 0;
                var group = 0;
                var self = this;

                if (_coordinates.length === 0) {
                    createFakeCoordinates(1000);//default init of fake points in case of no previous call of the createFakeCoordinates method.
                }
                _coordinates.forEach(function (coor) {
                    
                    angle = self.CalculateAngle(coor);
                    group = self.detectGroup(angle,separator);
                    if(!hash.hasItem(group)){
                        var initArr = [coor];
                        hash.setItem(group,initArr);
                    } else {
                        var provious = hash.getItem(group);
                        provious.push(coor);
                    }
                });
            },

            //group definition 
            detectGroup: function (angle, groupSeparator) {
                /*var previousValue = 0;
                var count = 0;
                for (var i = groupSeparator; i <= 360; i = i + groupSeparator) {
                    if (previousValue <= angle && angle < i) {
                        return count;
                    }
                    count++;
                    previousValue = i;
                }
                return count;*/

                return Math.floor(angle / groupSeparator);
            },




            createFakeCoordinates: function (cycles) {

                var i = 0;
                for (i = 0; i < cycles; i++) {
                    if (i % 4 === 0) {
                        xCoor = Math.floor(Math.random() * 100);
                        yCoor = Math.floor(Math.random() * 100);
                        _coordinates.push(new Coordinates(xCoor, yCoor));

                    } else if (i % 4 === 1) {
                        xCoor = Math.floor(Math.random() * -100);
                        yCoor = Math.floor(Math.random() * 100);
                        _coordinates.push(new Coordinates(xCoor, yCoor));


                    } else if (i % 4 === 2) {
                        xCoor = Math.floor(Math.random() * -100);
                        yCoor = Math.floor(Math.random() * -100);
                        _coordinates.push(new Coordinates(xCoor, yCoor));

                    } else if (i % 4 === 3) {
                        xCoor = Math.floor(Math.random() * 100);
                        yCoor = Math.floor(Math.random() * -100);
                        _coordinates.push(new Coordinates(xCoor, yCoor));

                    }
                }
                return _coordinates;
            }
        };
    })