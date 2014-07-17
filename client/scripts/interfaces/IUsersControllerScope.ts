///<reference path='../libs/typing/angularjs/angular.d.ts' />
///<reference path='../models/User.ts' />
module Mizumanju {
	"use strict";
	export interface IUsersControllerScope extends ng.ui.bootstrap.IModalScope {
		create(user: User): void;
		update(user: User): void;
		users: User[];
		newUser: User;
		msgs: { [key:string]: string[] };
		usersMsgs: { [key:string]: string[] };
	}
}
