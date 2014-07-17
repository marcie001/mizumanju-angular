///<reference path='../libs/typing/angularjs/angular.d.ts' />
module Mizumanju {
	"use strict";
	export function SameValidatorFactory() {
		var ctrls: { [key: string]: ng.INgModelController; } = {};
		return {
			require: "ngModel",
			link: function(scope: ng.IScope, elm: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: ng.INgModelController) {
				var target = <string>attrs["same"];
				var arr = target.split(".");
				ctrls[target] = ctrl;
				ctrl.$parsers.unshift(function(viewValue) {
					var tmp: any = scope;
					for (var i = 0; i < arr.length; i++) {
						tmp = tmp[arr[i]];
					}
					var targetValue = <string>tmp;
					var b = viewValue === targetValue;
					ctrl.$setValidity("same", b);
					ctrls[attrs["ngModel"]].$setValidity("same", b);
					return viewValue;
				});
			}
		};
	}
}
