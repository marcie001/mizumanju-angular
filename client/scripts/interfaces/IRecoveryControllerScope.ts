///<reference path='../libs/typing/angularjs/angular.d.ts' />
///<reference path='../models/Recovery.ts' />
module Mizumanju {
	"use strict";
	export interface IRecoveryControllerScope extends ng.ui.bootstrap.IModalScope {
		msgs: { [key:string]: string[] };
		success: boolean;
		password: Recovery;
		update(password: Recovery): void;
	}
}
