///<reference path='../libs/typing/angularjs/angular.d.ts' />
///<reference path='../libs/typing/angularjs/angular-route.d.ts' />

///<reference path='../interfaces/IRecoveryControllerScope.ts' />
///<reference path='../models/Recovery.ts' />
///<reference path='../models/ResponseData.ts' />
module Mizumanju {
	"use strict";
	// Recovery password
	export class RecoveryController {
		// $inject annotation
		public static $inject = [
			"$scope", "$routeParams", "$http"
		];
		// constructor
		public constructor (
			public $scope: IRecoveryControllerScope,
			private $routeParams: ng.route.IRouteParamsService,
			private $http: ng.IHttpService
		) {
			var key: string = $routeParams["key"];
			$scope.update = (password) => {
				this.$http.put("/api/recovery/" + key, password)
				.then((res) => {
					$scope.msgs = {};
					$scope.success = true;
				}, (res) => {
					if (res.data.hasOwnProperty("msgs")) {
						$scope.msgs = (<ResponseData<any>>res.data).msgs;
					} else {
						$scope.msgs = { "global": [ res.status + " " + res.statusText] };
					}
				});
			};
			$scope.success = false;
			$scope.msgs = {};
			$scope.password = new Recovery();
		}
	}
}
