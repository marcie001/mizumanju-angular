///<reference path='libs/typing/jquery/jquery.d.ts' />
///<reference path='libs/typing/angularjs/angular.d.ts' />
///<reference path='libs/typing/angularjs/angular-route.d.ts' />
///<reference path='typing/navigator.d.ts' />

///<reference path='controllers/MenuController.ts' />
///<reference path='controllers/LoginController.ts' />
///<reference path='controllers/LoungeController.ts' />
///<reference path='controllers/CameraController.ts' />
///<reference path='controllers/ProfileController.ts' />
///<reference path='controllers/UsersController.ts' />
///<reference path='controllers/PasswordController.ts' />
///<reference path='controllers/RecoveryRequestController.ts' />
///<reference path='controllers/RecoveryController.ts' />
///<reference path='controllers/LicensesController.ts' />
///<reference path='services/AuthService.ts' />
///<reference path='services/SessionService.ts' />
///<reference path='services/ImageService.ts' />
///<reference path='interceptors/AuthInterceptor.ts' />
///<reference path='validators/Same.ts' />

module Mizumanju {
	"use strict";

	var app = angular.module("lounge", ["ngRoute", "ui.bootstrap", "ui.sortable"]);

	app.constant("AUTH_EVENTS", {
		loginSuccess: "auth-login-success",
		loginFailed: "auth-login-failed",
		logoutSuccess: "auth-logout-success",
		sessionTimeout: "auth-session-timeout",
		notAuthenticated: "auth-not-authenticated",
		notAuthorized: "auth-not-authorized"
	});
	app.constant("USER_ROLES", {
		admin: "admin",
		editor: "editor"
	});

	// controllers
	app.controller("MenuController", MenuController);
	app.controller("LoginController", LoginController);
	app.controller("LoungeController", LoungeController);
	app.controller("CameraController", CameraController);
	app.controller("UsersController", UsersController);
	app.controller("ProfileController", ProfileController);
	app.controller("PasswordController", PasswordController);
	app.controller("RecoveryRequestController", RecoveryRequestController);
	app.controller("RecoveryController", RecoveryController);
	app.controller("LicensesController", LicensesController);

	// services
	app.service("AuthService", AuthService);
	app.service("Session", SessionService);
	app.service("ImageService", ImageService);

	// interceptors
	app.service("AuthInterceptor", AuthInterceptor);
	app.config(($httpProvider: ng.IHttpProvider) => {
		$httpProvider.interceptors.push("AuthInterceptor");
	});

	// validators
	app.directive("same", SameValidatorFactory);

	// router
	app.config(["$routeProvider", ($routeProvider: ng.route.IRouteProvider) => {
		$routeProvider
		.when("/", {
			templateUrl: "templates/lounge.html"
		})
		.when("/recovery/:key", {
			templateUrl: "templates/recovery.html"
		})
		.otherwise({
			redirectTo: "/"
		});
	}]);
}
