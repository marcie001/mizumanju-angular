///<reference path='../libs/typing/angularjs/angular.d.ts' />

///<reference path='../interfaces/IPasswordControllerScope.ts' />
///<reference path='../models/Password.ts' />
///<reference path='../models/ResponseData.ts' />
module Mizumanju {
	"use strict";
	// Change password
	export class PasswordController {
		// $inject annotation
		public static $inject = [
			"$modalInstance", "$scope", "$http"
		];
		// constructor
		public constructor (
			private $modalInstance: ng.ui.bootstrap.IModalServiceInstance,
			public $scope: IPasswordControllerScope,
			private $http: ng.IHttpService
		) {
			$scope.$close = (result) => {
				this.$http.put<ResponseData<any>>("/api/users/me/password", result)
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
			$scope.$dismiss = (result) => {
				$modalInstance.close();
			};
			$scope.password = new Password();
		}
	}
}
