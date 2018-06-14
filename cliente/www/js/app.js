
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
  
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('MainCtrl', function($scope, $document) {

    console.log('MainCtrl loaded.');

    var SERVER_URL = 'ws://localhost:7007';

    var ws;

    $scope.showNameInput = true;
    $scope.showChatScreen = false;

    $scope.messageLog = '';
    $scope.userName = '';

  
    function toggleScreens() {
        $scope.showNameInput = !$scope.showNameInput;
        $scope.showChatScreen = !$scope.showChatScreen;
    }
    function connect() {

        ws = new WebSocket(SERVER_URL, []);
        ws.onmessage = handleMessageReceived;
        ws.onopen = handleConnected;
        ws.onerror = handleError;
    }
    function handleMessageReceived(data) {

        logMessage(data.data);
    }

 
    function handleConnected(data) {

        logMessage(logMsg)
    }

    function handleError(err) {
   
        console.log("Error: ", err);
    }
    function logMessage(msg) {
        $scope.$apply(function() {        
            $scope.messageLog =  $scope.messageLog + msg + "\n";       
            updateScrolling();
        });
    }

    function updateScrolling() {       
        var msgLogId = '#messageLog';
     
        var msgLog = $document[0].querySelector(msgLogId);
                msgLog.scrollTop = msgLog.scrollHeight;
    }
    
    $scope.submitName = function submitName(name) {
       
        if (!name) {
            return;
        }       
        $scope.userName = name;      
        connect();      
        toggleScreens();
    };


    $scope.sendMessage = function sendMessage(msg) {
       
        var nameAndMsg = $scope.userName + ": " + msg;
        ws.send(nameAndMsg);
    };
})
