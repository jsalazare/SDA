angular.module('firebaseConfig', ['firebase'])

.run(function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDr1Xhhm3KJzcBXaSVhtuuA7Plmb86Eaho",
    authDomain: "bbox4sharea.firebaseapp.com",
    databaseURL: "https://bbox4sharea.firebaseio.com",
    storageBucket: "bbox4sharea.appspot.com",
  };
  firebase.initializeApp(config);

})

.service("FireB", [function($firebaseAuth){
    return firebase;
}])

/*

.service("TodoExample", ["$firebaseArray", function($firebaseArray){
    var ref = firebase.database().ref().child("todos");
    var items = $firebaseArray(ref);
    var todos = {
        items: items,
        addItem: function(title){
            items.$add({
                title: title,
                finished: false
            })
        },
        setFinished: function(item, newV){
            item.finished = newV;
            items.$save(item);
        }
    }
    return todos;
}])

*/