module Mizumanju {
	"use strict";
	export class ImageService {
		// 画像をグレースケール
		public grayScale(data: Uint8Array): Uint8Array {
			for (var i = 0; i < data.length; i += 4) {
				var r = data[i];
				var g = data[i + 1];
				var b = data[i + 2];
				var brightness = (3 * r + 4 * g + b) >>> 3 ;
				data[i] = brightness;
				data[i + 1] = brightness;
				data[i + 2] = brightness;
			}
			return data;
		}
	}
}
