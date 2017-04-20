angular.module('app.services')

/*
    Shake service is responsible for 
*/ 
.service('ShakeService', ['$cordovaDeviceMotion', '$ionicPlatform', function ($cordovaDeviceMotion, $ionicPlatform) {
    // watch Acceleration options
    var defaultOptions = {
        frequency: 100, // Measure every 100ms
        deviation: 50  // We'll use deviation to determine the shake event, best values in the range between 25 and 30
    };

    // Current measurements
    var measurements = {
        x: null,
        y: null,
        z: null,
        timestamp: null
    }

    // Previous measurements    
    var previousMeasurements = {
        x: null,
        y: null,
        z: null,
        timestamp: null
    }

    // Watcher object
    var watch = null;

    var self = this;

    this.startWatching = function (callBack, options) {
        console.log('starting waching');
        if (!options) {
            options = defaultOptions;
        }
        watch = $cordovaDeviceMotion.watchAcceleration(options);

        // Device motion initilaization
        watch.then(null, function (error) {
            console.log('Error');
        }, function (result) {

            // Set current data  
            measurements.x = result.x;
            measurements.y = result.y;
            measurements.z = result.z;
            measurements.timestamp = result.timestamp;

            // Detecta shake  
            detectShake(result, callBack, options);

        });
    }

    this.stopWatch = function () {
        watch.clearWatch();
        console.log('stop waching');
    }

    var permitSheking = true;

    //check if this shit sheck
    function detectShake(result, callBack, options) {
        //Object to hold measurement difference between current and old data
        var measurementsChange = {};

        // Calculate measurement change only if we have two sets of data, current and old
        if (previousMeasurements.x !== null) {
            measurementsChange.x = Math.abs(previousMeasurements.x - result.x);
            measurementsChange.y = Math.abs(previousMeasurements.y - result.y);
            measurementsChange.z = Math.abs(previousMeasurements.z - result.z);
        }

        if (permitSheking){
            if (measurementsChange.x + measurementsChange.y + measurementsChange.z > options.deviation) {
                self.stopWatch();  // Stop watching because it will start triggering like hell
                callBack();
                // Clean previous measurements after succesfull shake detection, so we can do it next time
                previousMeasurements = {
                    x: null,
                    y: null,
                    z: null
                }
                
                permitSheking = false;
                setTimeout(function(){
                    self.startWatching(callBack, options);
                    permitSheking = true;
                }, 1500);

            } else {
                // On first measurements set it as the previous one
                previousMeasurements = {
                    x: result.x,
                    y: result.y,
                    z: result.z
                }
            }
        }
    }

}]);

