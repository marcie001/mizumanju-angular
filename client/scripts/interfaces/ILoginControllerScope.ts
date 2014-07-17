///<reference path='../libs/typing/angularjs/angular.d.ts' />
///<reference path='../models/Credentials.ts' />
module Mizumanju {
	"use strict";
	// ログインコントローラのスコープインスタンスのインターフェース
	export interface ILoginControllerScope extends ng.IScope {
		credentials: Credentials;
		login(credentials: Credentials): void;
		isAuthenticated(): boolean;
		msgs: { [key: string]: string[]; };
	}
}
