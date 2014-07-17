///<reference path='../libs/typing/angularjs/angular.d.ts' />

///<reference path='../interfaces/IAuthEvents.ts' />
///<reference path='../services/AuthService.ts' />
///<reference path='../models/Credentials.ts' />
///<reference path='../models/ResponseData.ts' />
///<reference path='../interfaces/ILoginControllerScope.ts' />
module Mizumanju {
	"use strict";
	// ログインコントローラ
	export class LoginController {
		// $inject annotation
		public static $inject = [
			"AuthService", "AUTH_EVENTS", "$scope", "$rootScope"
		];
		// constructor
		public constructor (
			private auth: AuthService,
			private AUTH_EVENTS: IAuthEvents,
			public $scope: ILoginControllerScope,
			private $rootScope: ng.IRootScopeService
		) {
			$scope.login = (credentials: Credentials) => {
				this.auth.login(credentials).then((res) => {
					$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
					$scope.credentials = new Credentials("", "");
				}, (res) => {
					this.$rootScope.$broadcast(this.AUTH_EVENTS.loginFailed);
					if (res.data.hasOwnProperty("msgs")) {
						$scope.msgs = (<ResponseData<any>>res.data).msgs;
					} else {
						$scope.msgs = { "global": [ res.status + " " + res.statusText] };
					}
				});
			};
			$scope.isAuthenticated = () => {
				return auth.isAuthenticated();
			};
		}
	}
}
