///<reference path='../libs/typing/angularjs/angular.d.ts' />

///<reference path='../interfaces/ILicensesControllerScope.ts' />
///<reference path='../models/License.ts' />
///<reference path='../models/ResponseData.ts' />
module Mizumanju {
	"use strict";
	// list licenses
	export class LicensesController {
		// $inject annotation
		public static $inject = [
			"$modalInstance", "$scope", "$http", "$log"
		];
		// constructor
		public constructor (
			private $modalInstance: ng.ui.bootstrap.IModalServiceInstance,
			public $scope: ILicensesControllerScope,
			private $http: ng.IHttpService,
			private $log: ng.ILogService
		) {
			$scope.$dismiss = () => {
				$modalInstance.close();
			};
			$scope.licenses = [];

			$http.get<ResponseData<License[]>>("/api/licenses")
			.then((res) => {
				this.$scope.licenses = res.data.data;
				this.$scope.msgs = {};
			}, (res) => {
				if (res.data.hasOwnProperty("msgs")) {
					this.$scope.msgs = (<ResponseData<License[]>>res.data).msgs;
				} else {
					this.$scope.msgs = { "global": [ res.status + " " + res.statusText] };
				}
			});
		}
	}
}
