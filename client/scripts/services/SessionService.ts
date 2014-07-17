///<reference path='../models/User.ts' />
module Mizumanju {
	"use strict";
	// Session
	export class SessionService {
		public user: User;
		public create(me: User): void {
			this.user = me;
		}
		public destroy(): void {
			this.user = null;
		}
	}
}
