///<reference path='../libs/typing/angularjs/angular.d.ts' />
module Mizumanju {
	"use strict";
	// カメラコントローラのスコープインスタンスのインターフェース
	export interface ICameraControllerScope extends ng.IScope {
		start(): void;
		stop(): void;
		isActive: boolean;
		isAuthenticated(): boolean;
	}
}
