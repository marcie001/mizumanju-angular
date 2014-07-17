///<reference path='../libs/typing/angularjs/angular.d.ts' />

///<reference path='../interfaces/IProfileControllerScope.ts' />
///<reference path='../models/ResponseData.ts' />
module Mizumanju {
	"use strict";
	// profile
	export class ProfileController {
		// $inject annotation
		public static $inject = [
			"$modalInstance", "$scope", "AuthService", "USER_ROLES", "$http"
		];
		// constructor
		public constructor (
			private $modalInstance: ng.ui.bootstrap.IModalServiceInstance,
			public $scope: IProfileControllerScope,
			private auth: AuthService,
			private USER_ROLES: IUserRoles,
			private $http: ng.IHttpService
		) {
			$scope.update = (user) => {
				$http.put<ResponseData<User>>("/api/users", user)
				.then((res) => {
					$modalInstance.close();
				}, (res) => {
					if (res.data.hasOwnProperty("msgs")) {
						$scope.msgs = (<ResponseData<User>>res.data).msgs;
					} else {
						$scope.msgs = { "global": [ res.status + " " + res.statusText] };
					}
				});
			};
			$scope.isAdmin = () => {
				return this.auth.isAuthorized([USER_ROLES.admin]);
			};
			$scope.user = new User();
			$http.get<ResponseData<User>>("/api/users/me")
			.then((res) => {
				$scope.user = res.data.data;
			}, (res) => {
				if (res.data.hasOwnProperty("msgs")) {
					$scope.msgs = (<ResponseData<User>>res.data).msgs;
				} else {
					$scope.msgs = { "global": [ res.status + " " + res.statusText] };
				}
			});
		}
	}
}
