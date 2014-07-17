module Mizumanju {
	"use strict";
	// サーバからのレスポンスデータ
	export class ResponseData<T> {
		public constructor(public msgs:  { [key: string]: string[]; }, public data: T) {
		}
	}
}
