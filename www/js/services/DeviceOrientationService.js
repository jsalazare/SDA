angular.module('app.services').service('DeviceOrientationService', ['$window','$ionicPlatform',function ($window,$ionicPlatform) {



    
    this.listenForRotation = function (callback) {
        $ionicPlatform.ready(function () {
            $window.addEventListener('deviceorientation',callback, function (eventData) {

              

                /* gamma is the left-to-right tilt in degrees, where right is positive
                    var tiltLR = eventData.gamma;
        
                    // beta is the front-to-back tilt in degrees, where front is positive
                    var tiltFB = eventData.beta;
        
                    // alpha is the compass direction the device is facing in degrees
                    var dir = eventData.alpha
                    // deviceorientation does not provide this data
                    var motUD = null;*/
            }, false);
        })
    }

    this.stopListening = function (callback) {
        $ionicPlatform.ready(function () {
             $window.removeEventListener('deviceorientation',callback,false);
        })
    }


}]);

