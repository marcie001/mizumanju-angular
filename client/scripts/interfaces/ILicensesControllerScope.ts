///<reference path='../libs/typing/angularjs/angular.d.ts' />
///<reference path='../models/License.ts' />
module Mizumanju {
	"use strict";
	export interface ILicensesControllerScope extends ng.ui.bootstrap.IModalScope {
		licenses: License[];
		msgs: { [key:string]: string[] };
	}
}
