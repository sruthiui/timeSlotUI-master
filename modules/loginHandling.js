weatherMapModule.service('AuthService', function(Session){
	var authService = {};

	authService.login = function(credentials) {
		if(credentials.username === 'admin' && credentials.password === 'admin'){
			var credentials.data.user.role = 'admin';
			var credentials.data.user.id = 'admin';
			var credentials.data.id = 'admin';
			Session.create(credentials.data.id, credentials.data.user.id, credentials.data.user.role);
		}
		return credentials.data.user;
	};

	authService.isAuthenticated = function(){
		return !!Session.userId;
	};

	authService.isAuthorized = function(authorizedRoles){
		if(!angular.isArray(authorizedRoles)){
			authorizedRoles = [authorizedRoles];
		}
		return (authService.isAuthenticated() && authorizedRoles.indexOf(Session.userRole) !== -1);
	};

	return authService;

});

weatherMapModule.service('Session', function(){
	this.create = function(sessionId, userId, userRole){
		this.Id = sessionId;
		this.userId = userId;
		this.userRole = userRole;
	};
	this.destroy = function() {
		this.id = null;
		this.userId = null;
		this.userRole = null;
	};
});

weatherMapModule.constant('AUTH_EVENTS', {
	loginSuccess: 'auth-login-success',
	loginFailed: 'auth-login-failed',
	logoutSuccess: 'auth-logout-success',
	sessionTimeout: 'auth-session-timeout',
	notAuthenticated: 'auth-not-authenticated',
	notAuthorized: 'auth-not-authorized'
});

weatherMapModule.constant('USER_ROLES', {
	all: '*',
	admin: 'admin',
	editor: 'editor',
	guest: 'guest'
});

weatherMapModule.controller('ApplicationController', function($scope, USER_ROLES, AuthService){
	$scope.currentUser = null;
	$scope.userRoles = USER_ROLES;
	$scope.isAuthorized = AuthService.isAuthorized;

	$scope.setCurrentUser = function (user) {
		$scope.currentUser = user;
	};
});

weatherMapModule.controller('LoginController', function($scope, $rootscope, AUTH_EVENTS, AuthService){
	$scope.credentials = {
		username: '',
		password: ''
	};
	$scope.login = function(credentials){
		var user = AuthService.login(credentials);
		if(user != "Failure") {
			$rootscope.$broadcast(AUTH_EVENTS.loginSuccess);
			$scope.setCurrentUser(user);
		} else {
			$rootscope.$broadcast(AUTH_EVENTS.loginFailed);
		}
	};
});
