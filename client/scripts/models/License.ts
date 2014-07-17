module Mizumanju {
	"use strict";
	// User
	export class License {
		public constructor(
			public title: string = "",
			public source: string = "",
			public author: string = "",
			public authorURL: string = "",
			public license: string = "",
			public licenseURL: string = ""
		) {
		}
	}
}
