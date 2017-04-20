angular.module('app.services').service('HarcodedFences', ['$cordovaDeviceMotion', '$ionicPlatform', function ($cordovaDeviceMotion, $ionicPlatform) {


    var TransitionType = {
        ENTER: 1,
        EXIT: 2,
        BOTH: 3
    };

    var _lastFences = [
        /*{
            id: "35e52623467fge634dr2sdf34",
            latitude: 48.99543848095822,
            longitude: 8.443404078516323,
            radius: 33,
            transitionType: TransitionType.EXIT,
            notification: {
                id: 367,
                title: "Share.A",
                text: "Outside Building 6",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }
        },*/
        {
            id: "e4ea6cadcdd6b3d64a5ecbafdadd48e2",
            latitude: 48.99543848095822,
            longitude: 8.443404078516323,
            radius: 33,
            transitionType: TransitionType.ENTER,
            notification: {
                id: 45781,
                title: "Share.A",
                text: "Inside Building 6 now",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }
        },
        {
            id: "h546ert235423456e5",
            latitude: 48.995359287708425,
            longitude: 8.443935155901272,
            radius: 20,
            transitionType: TransitionType.ENTER,
            notification: {
                id: 56,
                title: "Share.A",
                text: "You are in Building 5 now",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }
        },
        /*{
            id: "dfg345ert5ertert",
            latitude: 48.995359287708425,
            longitude: 8.443935155901272,
            radius: 20,
            transitionType: TransitionType.EXIT,
            notification: {
                id: 6,
                title: "Share.A",
                text: "You are outside Building 5 now",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }
        },*/
        {
            id: "509c882611c018e7097be24b46d7d3c0",
            latitude: 48.994703,
            longitude: 8.446626,
            radius: 50,
            transitionType: TransitionType.ENTER,
            notification: {
                id: 78,
                title: "Inside Canteen",
                text: "You are in the Canteen, Would you like to Share?",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }
        },
        {
            id: "dfghrty34t5ytfgh4345",
            latitude: 48.14999296514036,
            longitude: 11.683874666723566,
            radius: 24,
            transitionType: TransitionType.ENTER,
            notification: {
                id: 56,
                title: "Inside Fiducia München",
                text: "You are inside Invationswerkstatt in Fiducia & GAD München",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }
        },
        {
            id: "dfghrty34t5ytfgh4345",
            latitude: 48.1507320331797,
            longitude: 11.683048546346981,
            radius: 23,
            transitionType: TransitionType.ENTER,
            notification: {
                id: 13,
                title: "Inside Fiducia München",
                text: "You are inside Canteen in Fiducia & GAD München",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }
        },
        {
            id: "wer234",
            latitude: 51.93250444206601,
            longitude: 7.58979964262835,
            radius: 68,
            transitionType: TransitionType.ENTER,
            notification: {
                id: 78,
                title: "Inside Fiducia Münster",
                text: "You are inside Building 1 in Fiducia & GAD Münster",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }
        },
        {
            id: "asdasd234",
            latitude: 51.93412846537704,
            longitude: 7.58802616599496,
            radius: 54,
            transitionType: TransitionType.ENTER,
            notification: {
                id: 16,
                title: "Inside Fiducia Münster",
                text: "You are inside Building 2 in Fiducia & GAD Münster",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }
        },
        {
            id: "asdqwegqweg123",
            latitude: 48.14031072775168,
            longitude: 11.559475422036485,
            radius: 103,
            transitionType: TransitionType.ENTER,
            notification: {
                id: 16,
                title: "Inside München Hauptbahnhof",
                text: "Hey! Click here to Share your transportation.",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }
        }
    ];
    /////////////////////////////////////////////////////////////////////////////////////////
    var closeToMunich = [
        /*{
            id: "sdqwesdfqweqweasdwe",
            latitude: 48.150383079862806,
            longitude: 11.683723926544188,
            radius: 1000,
            transitionType: TransitionType.EXIT,
            notification: {
                id: 174634,
                title: "Share.A",
                text: "Leave Fiducia Munich",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }

        },
        {
            id: "asdgasdqweqwe",
            latitude: 48.150383079862806,
            longitude: 11.683723926544188,
            radius: 1000,
            transitionType: TransitionType.ENTER,
            notification: {
                id: 246,
                title: "Share.A",
                text: "Way to Fiducia Munich",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }

        },
        {
            id: "sasdgsdfsertejw",
            latitude: 48.14043243818811,
            longitude: 11.575469970703125,
            radius: 15000,
            transitionType: TransitionType.ENTER,
            notification: {
                id: 3673468,
                title: "Share.A",
                text: "Enter Munich",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }

        },
        {
            id: "sdgwefsdfgwersdfd",
            latitude: 48.14043243818811,
            longitude: 11.575469970703125,
            radius: 15000,
            transitionType: TransitionType.EXIT,
            notification: {
                id: 456734678,
                title: "Share.A",
                text: "Leave Munich",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }

        },
        {
            id: "asfgsdhdfjhfgufdgs",
            latitude: 48.14043243818811,
            longitude: 11.575469970703125,
            radius: 50000.00,
            transitionType: TransitionType.ENTER,
            notification: {
                id: 545678234,
                title: "Share.A",
                text: "Way to Munich",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }

        },
        {
            id: "wersdgsdrujdft",
            latitude: 48.14043243818811,
            longitude: 11.575469970703125,
            radius: 50000.00,
            transitionType: TransitionType.ENTER,
            notification: {
                id: 656735,
                title: "Share.A",
                text: "Leave Munich",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }

        },*/
        {
            id: "asdfhsdfwerzsdfwser",
            latitude: 48.151184774203145,
            longitude: 11.682736873626707,
            radius: 237,
            transitionType: TransitionType.ENTER,
            notification: {
                id: 787634,
                title: "Share.A",
                text: "Enter Fiducia Campus Munich",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }

        }/*,
        {
            id: "asddhsdfgjdrg",
            latitude: 48.151184774203145,
            longitude: 11.682736873626707,
            radius: 237,
            transitionType: TransitionType.EXIT,
            notification: {
                id: 85673,
                title: "Share.A",
                text: "Leave Fiducia Campus Munich",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }
        }*/
    ];

    ///////////////////////////////////////////////////////////////////////

    var insideMunich = [
        {
            id: "asdgsdfhtfyer",
            latitude: 48.140768930245954,
            longitude: 11.55757427215576,
            radius: 250,
            transitionType: TransitionType.ENTER,
            notification: {
                id: 567,
                title: "Share.A",
                text: "Enter Munich train station",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }

        }/*,
        {
            id: "asdsdgfgsdfawhgsdf",
            latitude: 48.140768930245954,
            longitude: 11.55757427215576,
            radius: 250,
            transitionType: TransitionType.EXIT,
            notification: {
                id: 563,
                title: "Share.A",
                text: "Leave Munich train station",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }

        },*/
        /*{
            id: "dfgert3tdry345",
            latitude: 48.140768930245954,
            longitude: 11.55757427215576,
            radius: 1000,
            transitionType: TransitionType.ENTER,
            notification: {
                id: 11,
                title: "Share.A",
                text: "Near Munich train station",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }

        },*/
        /*{
            id: "2345eryhdrty56drg345",
            latitude: 48.140768930245954,
            longitude: 11.55757427215576,
            radius: 1000,
            transitionType: TransitionType.EXIT,
            notification: {
                id: 12,
                title: "Share.A",
                text: "Leave Munich train station",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }

        },*/
        /*{
            id: "asdasf1234ef23er34",
            latitude: 48.13759006621016,
            longitude: 11.57358169555664,
            radius: 400,
            transitionType: TransitionType.EXIT,
            notification: {
                id: 14,
                title: "Share.A",
                text: "Leave Munich city",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }

        }*/
    ];


    var closeToMunster = [

        {
            id: "asdaweasf234asr234",
            latitude: 51.932345674922416,
            longitude: 7.5898146629333505,
            radius: 300,
            transitionType: TransitionType.ENTER,
            notification: {
                id: 15,
                title: "Share.A",
                text: "Enter Fiducia Munster",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }

        }/*,
        {
            id: "asdq23ease1easf12",
            latitude: 51.932345674922416,
            longitude: 7.5898146629333505,
            radius: 300,
            transitionType: TransitionType.EXIT,
            notification: {
                id: 16,
                title: "Share.A",
                text: "Leave Fiducia Munster",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }

        }*/,
        {
            id: "asd34sdf23erf23",
            latitude: 51.932345674922416,
            longitude: 7.5898146629333505,
            radius: 3000,
            transitionType: TransitionType.ENTER,
            notification: {
                id: 17,
                title: "Share.A",
                text: "Near Fiducia Munster",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }

        }/*,
        {
            id: "asdq3e23re234df2",
            latitude: 51.96193280927054,
            longitude: 7.624855041503906,
            radius: 50000,
            transitionType: TransitionType.ENTER,
            notification: {
                id: 21,
                title: "Share.A",
                text: "Way to Munster",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }

        },
        {
            id: "asdqwer34srt34we3",
            latitude: 51.96193280927054,
            longitude: 7.624855041503906,
            radius: 50000,
            transitionType: TransitionType.EXIT,
            notification: {
                id: 22,
                title: "Share.A",
                text: "Leave Munster",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }
        }*/


    ];

    var insideMunster = [
        {
            id: "asdqw34sdfg2345e33",
            latitude: 51.96193280927054,
            longitude: 7.624855041503906,
            radius: 500,
            transitionType: TransitionType.ENTER,
            notification: {
                id: 19,
                title: "Share.A",
                text: "Enter Munster City",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }
        },
        {
            id: "asdq3easd234wer23",
            latitude: 51.96193280927054,
            longitude: 7.624855041503906,
            radius: 500,
            transitionType: TransitionType.EXIT,
            notification: {
                id: 20,
                title: "Share.A",
                text: "Leave Munster City",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }

        },
        {
            id: "asdq234aesrfw3rsef3",
            latitude: 51.9564718346941,
            longitude: 7.635787725448608,
            radius: 200,
            transitionType: TransitionType.ENTER,
            notification: {
                id: 23,
                title: "Share.A",
                text: "Enter Munster train station",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }
        },/*
        {
            id: "asdq34sdfw3r234",
            latitude: 51.9564718346941,
            longitude: 7.635787725448608,
            radius: 200,
            transitionType: TransitionType.EXIT,
            notification2: {
                id: 24,
                title: "Share.A",
                text: "Leave Munster train station",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }

        },*/
        {
            id: "asdq3sdfw345wer23",
            latitude: 51.9564718346941,
            longitude: 7.635787725448608,
            radius: 2000,
            transitionType: TransitionType.ENTER,
            notification: {
                id: 25,
                title: "Share.A",
                text: "Near Munster train station",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }

        }/*,
        {
            id: "asdq3ersdfw34rer3",
            latitude: 51.9564718346941,
            longitude: 7.635787725448608,
            radius: 2000,
            transitionType: TransitionType.EXIT,
            notification: {
                id: 26,
                title: "Share.A",
                text: "Leave near Munster train station",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }

        }*/
    ];


    var closeToKarlsruhe = [
        {
            id: "asdq3asf4tsefw23",
            latitude: 48.995262495787664,
            longitude: 8.44724178314209,
            radius: 350,
            transitionType: TransitionType.ENTER,
            notification: {
                id: 27,
                title: "Share.A",
                text: "Enter Fiducia Campus Karlsruhe",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }

        }/*,
        {
            id: "asdq3zdfw5ser23rsedf3",
            latitude: 48.995262495787664,
            longitude: 8.44724178314209,
            radius: 350,
            transitionType: TransitionType.EXIT,
            notification: {
                id: 28,
                title: "Share.A",
                text: "Leave Fiducia Campus Karlsruhe",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }

        }*/,
        {
            id: "asdq123asdfq33dzsdf3",
            latitude: 48.995262495787664,
            longitude: 8.44724178314209,
            radius: 5000,
            transitionType: TransitionType.ENTER,
            notification: {
                id: 29,
                title: "Share.A",
                text: "Near Fiducia Campus Karlsruhe",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }

        }/*,
        {
            id: "asdqwzsfgw34",
            latitude: 48.995262495787664,
            longitude: 8.44724178314209,
            radius: 5000,
            transitionType: TransitionType.EXIT,
            notification: {
                id: 30,
                title: "Share.A",
                text: "Leave near Fiducia Campus Karlsruhe",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }

        },
        {
            id: "asdw34dfg45erser3",
            latitude: 49.01338570255377,
            longitude: 8.404455184936523,
            radius: 50000,
            transitionType: TransitionType.EXIT,
            notification: {
                id: 31,
                title: "Share.A",
                text: "Leave near Karlsruhe",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }

        }
        {
            id: "asdq3rsdg4t5wefw3",
            latitude: 49.01338570255377,
            longitude: 8.404455184936523,
            radius: 50000,
            transitionType: TransitionType.ENTER,
            notification: {
                id: 32,
                title: "Share.A",
                text: " near Karlsruhe",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }

        },*/
    ];

    var insideKarlsruhe = [
        {
            id: "sdfasezdfe",
            latitude: 49.01338570255377,
            longitude: 8.404455184936523,
            radius: 1000,
            transitionType: TransitionType.ENTER,
            notification: {
                id: 33,
                title: "Share.A",
                text: "In city Karlsruhe",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }
        },
        {
            id: "asdasfserfdvewr",
            latitude: 49.01338570255377,
            longitude: 8.404455184936523,
            radius: 1000,
            transitionType: TransitionType.EXIT,
            notification: {
                id: 34,
                title: "Share.A",
                text: "Exit city Karlsruhe",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }

        }/*,
        {
            id: "asdqezsfwrse54",
            latitude: 49.00009834207271,
            longitude: 8.470544815063477,
            radius: 1000,
            transitionType: TransitionType.ENTER,
            notification: {
                id: 37,
                title: "Share.A",
                text: "Karlsruhe-Durlach",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }
        },
        {
            id: "asdqasdf2q3awd23",
            latitude: 49.00009834207271,
            longitude: 8.470544815063477,
            radius: 1000,
            transitionType: TransitionType.EXIT,
            notification: {
                id: 38,
                title: "Share.A",
                text: " Leave Karlsruhe-Durlach",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }

        },
        {
            id: "asdwerfzsdf234r",
            latitude: 48.99363636339871,
            longitude: 8.40179443359375,
            radius: 400,
            transitionType: TransitionType.ENTER,
            notification: {
                id: 39,
                title: "Share.A",
                text: " Enter Karlsruhe Hbf",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }

        },
        {
            id: "asdq3zsdfwersdre",
            latitude: 48.99363636339871,
            longitude: 8.40179443359375,
            radius: 400,
            transitionType: TransitionType.EXIT,
            notification: {
                id: 40,
                title: "Share.A",
                text: "Leave Karlsruhe Hbf",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }

        }*/,
        {
            id: "asdqeasd3sdf3",
            latitude: 48.99363636339871,
            longitude: 8.40179443359375,
            radius: 2000,
            transitionType: TransitionType.ENTER,
            notification: {
                id: 41,
                title: "Share.A",
                text: "Near Karlsruhe Hbf",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }

        },
        {
            id: "asd23eqawer234awer",
            latitude: 48.99363636339871,
            longitude: 8.40179443359375,
            radius: 2000,
            transitionType: TransitionType.EXIT,
            notification: {
                id: 42,
                title: "Share.A",
                text: "Leave near Karlsruhe Hbf",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }

        },
        {
            id: "asdqeasd23",
            latitude: 49.009930485436186,
            longitude: 8.39504599571228,
            radius: 200,
            transitionType: TransitionType.ENTER,
            notification: {
                id: 43,
                title: "Share.A",
                text: "Enter Europaplatz",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }

        }/*,
        {
            id: "asd1234df23rr4f4",
            latitude: 49.009930485436186,
            longitude: 8.39504599571228,
            radius: 200,
            transitionType: TransitionType.EXIT,
            notification: {
                id: 44,
                title: "Share.A",
                text: "Leave Europaplatz",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }

        }*/,
        {
            id: "asd23edf34fef23sd",
            latitude: 49.00961380384713,
            longitude: 8.403950929641724,
            radius: 150,
            transitionType: TransitionType.ENTER,
            notification: {
                id: 45,
                title: "Share.A",
                text: "Enter Marktplatz",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }

        }/*,
        {
            id: "asd123esd3dwesfe",
            latitude: 49.00961380384713,
            longitude: 8.403950929641724,
            radius: 150,
            transitionType: TransitionType.EXIT,
            notification: {
                id: 46,
                title: "Share.A",
                text: "Leave Marktplatz",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }

        }*/,
        {
            id: "asdqda23dewdf3e",
            latitude: 49.00655948246403,
            longitude: 8.40229868888855,
            radius: 200,
            transitionType: TransitionType.ENTER,
            notification: {
                id: 47,
                title: "Share.A",
                text: "Enter Ettlinger Tor",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }
        },
        {
            id: "wdasdq23edasd23d",
            latitude: 49.00655948246403,
            longitude: 8.40229868888855,
            radius: 200,
            transitionType: TransitionType.EXIT,
            notification: {
                id: 48,
                title: "Share.A",
                text: "Leave Ettlinger Tor",
                openAppOnClick: true,
                smallIcon: 'file://img/mascot.PNG',
                icon: 'file://img/mascot.PNG',
                vibrate: [1000, 500, 2000]
            }
        }
    ];

    this.getAllHardcodedFences = function () {
        var arr = [];
        var fences =  arr.concat(_lastFences)
            .concat(closeToMunich).concat(insideMunich)
            .concat(closeToMunster).concat(insideMunster)
            .concat(closeToKarlsruhe).concat(insideKarlsruhe);
            fences.forEach(function(item,index){
                if(item.notification.vibrate){
                    item.notification.vibrate = [500,0,0];
                }
            });
            return fences;
    }



}])













