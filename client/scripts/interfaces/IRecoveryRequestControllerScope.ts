///<reference path='../libs/typing/angularjs/angular.d.ts' />
///<reference path='../models/RecoveryRequest.ts' />
module Mizumanju {
	"use strict";
	export interface IRecoveryRequestControllerScope extends ng.ui.bootstrap.IModalScope {
		msgs: { [key:string]: string[] };
		success: boolean;
		recoveryRequest: RecoveryRequest;
		send(recoveryRequest: RecoveryRequest): void;
	}
}
