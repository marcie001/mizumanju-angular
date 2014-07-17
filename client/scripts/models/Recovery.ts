module Mizumanju {
	"use strict";
	// 認証フォーム
	export class Recovery {
		public constructor(
				public recovery: string = "",
				public confirm: string = "") {
		}
	}
}
