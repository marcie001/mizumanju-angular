///<reference path='../libs/typing/angularjs/angular.d.ts' />
///<reference path='../typing/navigator.d.ts' />
///<reference path='../services/AuthService.ts' />
///<reference path='../interfaces/ICameraControllerScope.ts' />
///<reference path='../services/ImageService.ts' />
module Mizumanju {
	"use strict";
	declare var navigator: INavigator;
	// カメラ画像の取得、画像の加工を行うコントローラ
	export class CameraController {
		public static $inject = ["$scope", "$interval", "$http", "AuthService", "ImageService"];
		public constructor(
			private $scope: ICameraControllerScope,
			private $interval: ng.IIntervalService,
			private $http: ng.IHttpService,
			private authService: AuthService,
			private imgService: ImageService
		) {
			navigator.getMedia = navigator.getUserMedia ||
					navigator.webkitGetUserMedia ||
					navigator.mozGetUserMedia ||
					navigator.msGetUserMedia;

			var mediaStream: IMediaStream;
			$scope.isActive = false;
			// カメラ制御を取得
			$scope.start = () => {
				if (navigator.getMedia) {
					var video = <HTMLVideoElement> document.getElementById("myvideo");
					var canvas0 = <HTMLCanvasElement> document.getElementById("mycanvas0");
					var ctx0 = canvas0.getContext("2d");
					var canvas1 = <HTMLCanvasElement> document.getElementById("mycanvas1");
					var ctx1 = canvas1.getContext("2d");
					navigator.getMedia(
						{
							video: true,
							audio: false
						},
						(stream) => {
							$scope.isActive = true;
							mediaStream = stream;
							var width = 160;
							var height = 120;
							video.src = URL.createObjectURL(stream);
							video.play();
							video.addEventListener("loadedmetadata", () => {
								canvas0.width = width;
								canvas0.height = height;
								canvas1.width = width;
								canvas1.height = height;
							});
							$interval(() => {
								if (!$scope.isActive) {
									return;
								}
								// 画像をキャンバスの大きさに縮小
								ctx0.drawImage(video, 0, 0, canvas0.width, canvas0.height);
								// 画像の加工
								var origin = ctx0.getImageData(0, 0, canvas0.width, canvas0.height);
								origin.data.set(this.imgService.grayScale(origin.data));
								ctx1.putImageData(origin, 0, 0);
								// 加工した画像を取得
								var img = canvas1.toDataURL("image/png");
								// 画像を送信
								if (authService.isAuthenticated()) {
									$http.put("/api/users/me/image", {
										image: img.substring(img.indexOf(",") + 1)
									}).success((data, status, headers, config) => console.log("success to upload."))
									.error((data, status, headers, config) => console.log("fail to upload. " + status));
								}
							}, 5000);
						},
						(err: string) => {
							console.log(err);
						}
					);
				} else {
					console.log("getUserMedia is not supported.");
				}
			};
			// カメラ制御を解放
			$scope.stop = () => {
				//mediaStream.stop();
				mediaStream.getVideoTracks().forEach(track => track.stop());
				mediaStream.getAudioTracks().forEach(track => track.stop());
				$scope.isActive = false;
			};

			$scope.isAuthenticated = () => {
				return authService.isAuthenticated();
			};

			$scope.start();
		}

	}
}
