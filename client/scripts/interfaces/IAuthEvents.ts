module Mizumanju {
	"use strict";
	// 認証イベント
	export interface IAuthEvents {
		loginSuccess: string;
		loginFailed: string;
		logoutSuccess: string;
		sessionTimeout: string;
		notAuthenticated: string;
		notAuthorized: string;
	}
}
