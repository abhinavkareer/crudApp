var app = angular.module("testApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "html/home.html",
        controller:"testCtrl"
    })
});


app.controller('testCtrl', function($scope,calculate,$http) {
   
$scope.numbObj={};
	
	
	$scope.getData=function()
	{
		$http({
        method : "GET",
        url : "/getData",
        
    }).then(function mySucces(response) {
     $scope.numbObj= response.data[0] || {};
     console.log($scope.numbObj);
    }, function myError(error) {
          console.log(error);
    });
	}



   $scope.calculate=function()
   {



   	$scope.numbObj.res=calculate.multiply($scope.numbObj.numb1,$scope.numbObj.numb2);

$scope.saveData();
   }




   $scope.saveData=function()
   {

  

   	 $http({
        method : "POST",
        url : "/saveData",
        data:{"numbs":JSON.stringify($scope.numbObj)}
    }).then(function mySucces(response) {
      console.log(response);
    }, function myError(error) {
          console.log(error);
    });
   }






$scope.getData();

});

app.service('calculate', function() {
    this.multiply = function (numb1,numb2) {
        return numb1*numb2;
    }
});


