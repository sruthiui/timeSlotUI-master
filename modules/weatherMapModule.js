var weatherMapModule = angular.module('weatherMapModule', ['ui.bootstrap', 'ui.select']);

weatherMapModule.config(['$httpProvider', function( $httpProvider ) {
	// Enable http caching for all requests.
	$httpProvider.defaults.cache = true;
}]);


angular.module('weatherMapModule').filter('customDate', function() {
	return function(input, option) {
		var monthParsing = {'01': 'JAN', '02': 'FEB', '03': 'MAR', '04': 'APR',
			'05': 'MAY', '06': 'JUN', '07': 'JUL', '08': 'AUG', '09': 'SEP',
			'10': 'OCT', '11': 'NOV', '12': 'DEC'};
		var output;
		if(option == 'dd')
			output = input.charAt(8) + input.charAt(9);
		else if(option == 'MMM')
		{
			var month = input.charAt(5) + input.charAt(6);
			output = monthParsing[month];
		}
		else if(option == 'YYYY')
			output = input.charAt(0) + input.charAt(1) + input.charAt(2) + input.charAt(3);
		else if(option == 'tt')
		{
			var time = input.charAt(11) + input.charAt(12);
			if(parseInt(time) == 00)
				output = "12AM";
			else if(parseInt(time) < 12)
				output = parseInt(time) + "AM";
			else if(parseInt(time) == 12)
				output = parseInt(time) + "PM";
			else
				output = parseInt(time) - 12 + "PM";
		}
		return output;
	}
});

angular.module('weatherMapModule').filter('convertIntoCelcius', function() {
	return function(input) {
		return parseInt(input - 273.15) ;
	}
});
