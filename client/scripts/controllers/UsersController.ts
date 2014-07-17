///<reference path='../libs/typing/angularjs/angular.d.ts' />

///<reference path='../interfaces/IUsersControllerScope.ts' />
///<reference path='../models/User.ts' />
///<reference path='../models/ResponseData.ts' />
module Mizumanju {
	"use strict";
	// manage users
	export class UsersController {
		// $inject annotation
		public static $inject = [
			"$modalInstance", "$scope", "$http", "$log"
		];
		// constructor
		public constructor (
			private $modalInstance: ng.ui.bootstrap.IModalServiceInstance,
			public $scope: IUsersControllerScope,
			private $http: ng.IHttpService,
			private $log: ng.ILogService
		) {
			$scope.$dismiss = () => {
				$modalInstance.close();
			};
			$scope.create = (user) => {
				this.$http.post<ResponseData<User>>("/api/users", user)
				.then((res) => {
					this.$scope.users.push(res.data.data);
					this.$scope.newUser = new User();
					this.$scope.usersMsgs = {};
					this.$scope.msgs = {};
				}, (res) => {
					if (res.data.hasOwnProperty("msgs")) {
						this.$scope.msgs = (<ResponseData<User>>res.data).msgs;
					} else {
						this.$scope.msgs = { "global": [ res.status + " " + res.statusText] };
					}
				});
			};
			$scope.update = (user) => {
				this.$http.put<ResponseData<User>>("/api/users", user)
				.then((res) => {
					this.$scope.usersMsgs = { "success": [res.data.data.authId + " was updated."] };
					this.$scope.msgs = {};
				}, (res) => {
					if (res.data.hasOwnProperty("msgs")) {
						this.$scope.usersMsgs = (<ResponseData<User>>res.data).msgs;
					} else {
						this.$scope.usersMsgs = { "global": [ res.status + " " + res.statusText] };
					}
				});
			};
			$scope.users = [];
			$scope.newUser = new User();

			$http.get<ResponseData<User[]>>("/api/users")
			.then((res) => {
				this.$scope.users = res.data.data;
				this.$scope.usersMsgs = {};
				this.$scope.msgs = {};
			}, (res) => {
				if (res.data.hasOwnProperty("msgs")) {
					this.$scope.usersMsgs = (<ResponseData<User[]>>res.data).msgs;
				} else {
					this.$scope.usersMsgs = { "global": [ res.status + " " + res.statusText] };
				}
			});
		}
	}
}
