var app = angular.module("testApp", ["ngRoute"]);
app.config(function($routeProvider,$locationProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "html/home.html",
        controller:"testCtrl"
    })

     $locationProvider.html5Mode(true);
});


app.controller('testCtrl', function($scope,calculate,$http) {
   
$scope.numbObj={};
$scope.allNumbs=[];
	
	
	$scope.getData=function()
	{
		$http({
        method : "GET",
        url : "/getData",
        
    }).then(function mySucces(response) {
     $scope.numbObj= response.data[0] || {};
     $scope.allNumbs=response.data.splice(1);
     console.log($scope.allNumbs);
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

    delete $scope.numbObj._id;
    delete $scope.numbObj.lastUpdated;
    $scope.numbObj.isLatest=true;

   	 $http({
        method : "POST",
        url : "/saveData",
        data:{"numbs":JSON.stringify($scope.numbObj)}
    }).then(function mySucces(response) {
      console.log(response);
      
$scope.getData();
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


