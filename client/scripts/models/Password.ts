module Mizumanju {
	"use strict";
	// 認証フォーム
	export class Password {
		public constructor(
				public currentPassword: string = "",
				public newPassword: string = "",
				public confirm: string = "") {
		}
	}
}
