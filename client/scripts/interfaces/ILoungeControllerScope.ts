///<reference path='../libs/typing/angularjs/angular.d.ts' />
///<reference path='../models/User.ts' />
module Mizumanju {
	"use strict";
	// ラウンジコントローラのスコープインスタンスのインターフェース
	export interface ILoungeControllerScope extends ng.IScope {
		users: User[];
		showImage(user: User): void;
		isAuthenticated(): boolean;
	}
}
