///<reference path='../libs/typing/angularjs/angular.d.ts' />

///<reference path='../interfaces/IRecoveryRequestControllerScope.ts' />
///<reference path='../models/RecoveryRequest.ts' />
///<reference path='../models/ResponseData.ts' />
module Mizumanju {
	"use strict";
	// Send recovery request
	export class RecoveryRequestController {
		// $inject annotation
		public static $inject = [
			"$modalInstance", "$scope", "$http"
		];
		// constructor
		public constructor (
			private $modalInstance: ng.ui.bootstrap.IModalServiceInstance,
			public $scope: IRecoveryRequestControllerScope,
			private $http: ng.IHttpService
		) {
			$scope.send = (result) => {
				this.$http.post("/api/recovery", result)
				.then((res) => {
					$scope.msgs = {};
					$scope.success = true;
				}, (res) => {
					if (res.data.hasOwnProperty("msgs")) {
						$scope.msgs = (<ResponseData<any>>res.data).msgs;
					} else {
						$scope.msgs = { "global": [ res.status + " " + res.statusText] };
					}
					$scope.success = false;
				});
			};
			$scope.$dismiss = (result) => {
				$modalInstance.close();
			};
			$scope.success = false;
			$scope.recoveryRequest = new RecoveryRequest();
		}
	}
}
