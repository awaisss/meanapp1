var myApp = angular.module('myApp',[]);

myApp.controller('myController',function($scope,$http){
	$scope.users = [];
	$scope.editFlag = false;
	$scope.addFlag = false;

	// Edit User ---
	$scope.editUser = function(data){
		console.log(data);
		$scope.editFlag = true;

	}

	$scope.deleteUser = function(user){
		var index = $scope.users.indexOf(user);
		$http.delete('http://localhost:3000/api/student/delete?id='+user._id)
		.success(function(data,status){
			if(data.status){
				console.log('user deleted successfully--');
				$scope.users.splice(index,1);
			}

		})
		.error(function(data,status){
			console.log('failed to delete user');

		})

	}


	// Get all users 
	$scope.getAllUsers = function(){
		
		$http.get('http://localhost:3000/api/students')
		.success(function(data,status,headers,config){
			console.log('getting all useres');
			console.log(data);
			if(data.status){
				$scope.users = data.data;
			} else {
				$scope.users = [];
			}

		})
		.error(function(data,status,headers,config){
			console.log('failed to get data!!!! error occured');
			$scope.users = [];

		})

	}
	$scope.getAllUsers();


})