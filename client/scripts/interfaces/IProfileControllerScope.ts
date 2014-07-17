///<reference path='../libs/typing/angularjs/angular.d.ts' />
///<reference path='../models/User.ts' />
module Mizumanju {
	"use strict";
	export interface IProfileControllerScope extends ng.ui.bootstrap.IModalScope {
		update(user: User): void;
		isAdmin(): boolean;
		user: User;
		msgs: { [key: string]: string[]; }
	}
}
