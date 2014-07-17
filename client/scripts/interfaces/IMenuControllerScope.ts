///<reference path='../libs/typing/angularjs/angular.d.ts' />
module Mizumanju {
	"use strict";
	// ログインコントローラのスコープインスタンスのインターフェース
	export interface IMenuControllerScope extends ng.IScope {
		isUserManagement(): boolean;
		isPersonalSettings(): boolean;
		isAuthenticated(): boolean;
		openPassword(): void;
		openProfile(): void;
		openUsers(): void;
		openRecoveryRequest(): void;
		openLicenses(): void;
	}
}
