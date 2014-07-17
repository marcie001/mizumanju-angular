///<reference path='../libs/typing/angularjs/angular.d.ts' />
///<reference path='../interfaces/ILoungeControllerScope.ts' />
///<reference path='../interfaces/IAuthEvents.ts' />
///<reference path='../models/User.ts' />
///<reference path='../models/ResponseData.ts' />
module Mizumanju {
	"use strict";
	// ユーザ画像表示のコントローラ
	export class LoungeController {
		public static $inject = ["$scope", "$interval", "$http", "AuthService", "AUTH_EVENTS"];

		public constructor(
			private $scope: ILoungeControllerScope,
			private $interval: ng.IIntervalService,
			private $http: ng.IHttpService,
			private authService: AuthService,
			private AUTH_EVENTS: IAuthEvents
		) {
			// ユーザ情報
			$scope.users = [];
			$http.get<ResponseData<User[]>>("/api/users/me/displaySettings").success((data, status, headers, config) => {
				$scope.users = data.data;
			});
			$scope.$on(AUTH_EVENTS.loginSuccess, () => {
				this.$http.get<ResponseData<User[]>>("/api/users/me/displaySettings")
				.success((data, status, headers, config) => {
					$scope.users = data.data;
				});
			});

			// ユーザ画像表示切替時処理
			$scope.showImage = (user:User) => {
				user.hide = !user.hide;
				if (!user.hide) {
					this.reloadImage(user);
				}
			};

			// ユーザ画像定期リフレッシュ
			var reload = $interval(() => {
				if (!authService.isAuthenticated()) {
					return;
				}
				angular.forEach($scope.users, (user: User) => {
					if (user.hide) {
						return;
					}
					this.reloadImage(user);
				});
			}, 5000);

			$scope.isAuthenticated = () => {
				return authService.isAuthenticated();
			};

			// ユーザ表示設定保存
			var f = (newVal: User[], oldVal: User[], scope: ILoungeControllerScope) => {
				if (oldVal.length === 0) {
					return;
				}
				this.saveDisplay(scope.users);
			};
			$scope.$watch((scope: ILoungeControllerScope) => {
				return scope.users.map(obj => obj.hide);
			}, f, true);
			$scope.$watchCollection("users", f);

			$scope.$on("$destroy", function() {
				$interval.cancel(reload);
			});
		}

		// ユーザ表示設定保存
		private saveDisplay (users: User[]): void {
			var params = users.map((val, index) => {
				return {
					id: val.id,
					hide: val.hide,
					orderNo: index
				};
			});
			this.$http.post("/api/users/me/displaySettings", params)
					.success((data, status, headers, config) => console.log(data))
					.error((data, status, headers, config) => console.log(status));
		}

		// ユーザ画像リロード
		private reloadImage(user: User): void {
			var time = new Date().getTime();
			var i = user.image.lastIndexOf("?");
			var path = i >= 0 ? user.image.substring(0, i) : user.image;
			user.image = path + "?" + time;
		}
	}
}
