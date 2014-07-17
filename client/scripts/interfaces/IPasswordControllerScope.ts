///<reference path='../libs/typing/angularjs/angular.d.ts' />
///<reference path='../models/Password.ts' />
module Mizumanju {
	"use strict";
	export interface IPasswordControllerScope extends ng.ui.bootstrap.IModalScope {
		msgs: { [key: string]: string[]; };
		password: Password;
	}
}
