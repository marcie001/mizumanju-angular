///<reference path='../libs/typing/angularjs/angular.d.ts' />
///<reference path='../interfaces/IAuthEvents.ts' />
///<reference path='../services/SessionService.ts' />
module Mizumanju {
	"use strict";
	export class AuthInterceptor {
		public static $inject = ["$q", "$rootScope", "AUTH_EVENTS", "Session"];
		public constructor(
			private $q: ng.IQService,
			private $rootScope: ng.IRootScopeService,
			private AUTH_EVENTS: IAuthEvents,
			private session: SessionService
		) {
		}
		public responseError = (response: ng.IHttpPromiseCallbackArg<any>) => {
			var ev: string;
			switch (response.status) {
			case 401:
				this.session.destroy();
				ev = this.AUTH_EVENTS.notAuthenticated;
				break;
			case 403:
				this.session.destroy();
				ev = this.AUTH_EVENTS.notAuthorized;
				break;
			case 419:
			case 440:
				this.session.destroy();
				ev = this.AUTH_EVENTS.sessionTimeout;
				break;
			}
			this.$rootScope.$broadcast(ev, response);
			return this.$q.reject(response);
		};
	}
}
