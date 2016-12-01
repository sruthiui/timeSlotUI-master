weatherMapModule.controller('weatherMapController', ['$scope', '$parse', 'weatherMapFactory', '$rootScope',
	function ($scope, $parse, weatherMapFactory, $rootScope) {

		$rootScope.showLoader = false;
		$scope.cityArray = [];
		$scope.data = [];
		$scope.cityEntered = function(){
			$scope.data = [];
			$rootScope.showLoader = true;
            weatherMapFactory.getCityWeather().then(function(data){
                $scope.slots = data;
                var index = 0;
                $scope.localStorage = [];
                $scope.slots.forEach(function(item) {
                    $scope.localStorage.push({
                        index: index,
                        title: item,
                        name: '',
                        number: ''
                    });
                    index++;
                })
                $rootScope.showLoader = false;
            }, function(){
                alert("Please try after some time..!");
            });

		}();

        $scope.localStorage = [];

        $scope.enterDetails = function(index) {
            $scope.index = index;
            $scope.name = $scope.localStorage[index].name;
            $scope.number = $scope.localStorage[index].number;
            $scope.isModalOpen = true;
        }

		$scope.save = function(name, number) {
            $scope.localStorage[$scope.index].name = name;
            $scope.localStorage[$scope.index].number = number;
            $scope.isModalOpen = false;
            // weatherMapFactory.saveSettings($scope.name, $scope.number);
        }
	}
]);

