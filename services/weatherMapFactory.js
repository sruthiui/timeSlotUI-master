weatherMapModule.service('weatherMapFactory', function ($http, $parse, $q) {

	this.getCityWeather = function() {
		var deferred = $q.defer();
		var url = 'http://192.168.0.15:3003';
		$http.get(url).then(function(data){
			deferred.resolve(data.data);
		}, function(error) {
			deferred.reject(error);
		});
	return deferred.promise;
    };
});
