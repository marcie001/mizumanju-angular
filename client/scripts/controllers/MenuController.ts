///<reference path='../libs/typing/angularjs/angular.d.ts' />
///<reference path='../libs/typing/angular-ui-bootstrap/angular-ui-bootstrap.d.ts' />

///<reference path='../interfaces/IUserRoles.ts' />
///<reference path='../services/AuthService.ts' />
///<reference path='../interfaces/IMenuControllerScope.ts' />
module Mizumanju {
	"use strict";
	// Menu Controller
	export class MenuController {
		// $inject annotation
		public static $inject = [
			"$modal", "AuthService", "USER_ROLES", "$scope"
		];
		// constructor
		public constructor (
			private $modal: ng.ui.bootstrap.IModalService,
			private auth: AuthService,
			private USER_ROLES: IUserRoles,
			public $scope: IMenuControllerScope
		) {
			$scope.isUserManagement = () => {
				return this.auth.isAuthorized([USER_ROLES.admin]);
			};
			$scope.isPersonalSettings = () => {
				return this.auth.isAuthorized([USER_ROLES.admin, USER_ROLES.editor]);
			};
			$scope.isAuthenticated = () => {
				return this.auth.isAuthenticated();
			};
			$scope.openPassword = () => {
				$modal.open({
					templateUrl: "templates/password.html",
					controller: "PasswordController"
				});
			};
			$scope.openUsers = () => {
				$modal.open({
					templateUrl: "templates/users.html",
					controller: "UsersController",
					size: "lg"
				});
			};
			$scope.openProfile = () => {
				$modal.open({
					templateUrl: "templates/profile.html",
					controller: "ProfileController"
				});
			};
			$scope.openRecoveryRequest = () => {
				$modal.open({
					templateUrl: "templates/recoveryRequest.html",
					controller: "RecoveryRequestController"
				});
			};
			$scope.openLicenses = () => {
				$modal.open({
					templateUrl: "templates/licenses.html",
					controller: "LicensesController"
				});
			};
		}
	}
}
