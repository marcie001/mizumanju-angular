module Mizumanju {
	"use strict";
	// User
	export class User {
		public constructor(
			public id: number = null,
			public authId: string = "",
			public name: string = "",
			public email: string= "",
			public voiceChatID: string = "",
			public hide: boolean = false,
			public image: string = "",
			public deleteFlag: boolean = false,
			public role: string = "editor"
		) {
		}
	}
}
