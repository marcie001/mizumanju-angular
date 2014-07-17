///<reference path='../libs/typing/angularjs/angular.d.ts' />
///<reference path='../models/Credentials.ts' />
///<reference path='../models/User.ts' />
///<reference path='SessionService.ts' />
///<reference path='../models/ResponseData.ts' />
module Mizumanju {
	"use strict";
	// 認証サービス
	export class AuthService {
		public static $inject = ["$http", "Session"];
		public constructor(
			private $http: ng.IHttpService,
			private session: SessionService
		) {
			$http.get<ResponseData<User>>("/api/users/me")
			.then((res) => {
				session.create(res.data.data);
			});
		}
		public login(credentials: Credentials) {
			return this.$http.post<ResponseData<User>>("/api/login", credentials)
			.then((res) => {
				this.session.create(res.data.data);
				return res;
			});
		}
		public isAuthenticated() {
			return this.session.user != null;
		}
		public isAuthorized(authorizedRoles: string[]) {
			return this.isAuthenticated() && authorizedRoles.indexOf(this.session.user.role) >= 0;
		}
	}
}
