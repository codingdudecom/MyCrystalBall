angular.module('myCrystalBallApp.controllers', [])
.controller("CrystalBall",function($scope, $rootScope, $ionicPlatform, $ionicPopup){
	$scope.possibleAnswers = 
	["All stars indicate that the answer is YES", "Faith is totally in your hands", "And the universe says NO"];

	$scope.showAnswerVar = false;


	$scope.showAnswer = function(){
		if (!$scope.showAnswerVar){
			$scope.showAnswerVar=true;
			$scope.answer = $scope.possibleAnswers[Math.floor(Math.random() * $scope.possibleAnswers.length) ];
			setTimeout($scope.hideAnswer, 5000);
		}
	}

	$scope.hideAnswer = function(){
		$scope.showAnswerVar=false;
		$scope.$apply();
	}

	

	$scope.$on("deviceShaken", function(event,obj){
		console.log("deviceShaken event received");
		$scope.showAnswer();
	});

  	ionic.Platform.ready(function(){
  		console.log("deviceready");
		shake.startWatch(
			function(){
		        console.log("device is being shaken");
		        $scope.showAnswer();
		        $scope.$apply();
		    }, 40 /*, onError */
	    );
		}
	);


  $ionicPlatform.registerBackButtonAction(function (e) {
      var confirmPopup = $ionicPopup.confirm({
              title: 'Confirm Exit',
              template: "Are you sure you want to exit?"
          });
      confirmPopup.then(function (close) {
          if (close) {
          	  // Stop watching for shake gestures
			  shake.stopWatch();
              // there is no back view, so close the app instead
              ionic.Platform.exitApp();
          } // otherwise do nothing
          console.log("User canceled exit.");
      });
      e.preventDefault();
      return false;
  }, 101); // 1 more priority than back button  
	
});
