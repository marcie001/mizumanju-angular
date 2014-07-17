describe("Lounge Application", function() {
	describe("Login", function() {
		beforeEach(function() {
			browser.addMockModule("httpBackendMock", function() {
				angular.module("httpBackendMock", ["ngMockE2E"]).run(function($httpBackend) {
					// Login OK
					$httpBackend
					.when("POST", "/api/login", {
						username: "validuser",
						password: "validpassword"
					})
					.respond(function (method, url, data, headers) {
						return [200, {
							id: 1,
							name: "validname",
							voiceChatId: "validVCId",
							display: true,
							image: "/api/users/1/image",
							role: "admin"
						}];
					});

					// Login NG
					$httpBackend
					.when("POST", "/api/login", {
						username: "invaliduser",
						password: "invalidpassword"
					})
					.respond(function(method, url, data) {
						return [401, "Unauthorized", {}];
					});

					$httpBackend
					.when("GET", "/api/displaySettings")
					.respond([
						{
							id: 2,
							name: "user2",
							voiceChatId: "VCId2",
							display: true,
							image: "/api/users/2/image",
							role: "editor"
						},
						{
							id: 4,
							name: "user4",
							voiceChatId: "VCId4",
							display: false,
							image: "/api/users/4/image",
							role: "editor"
						},
						{
							id: 3,
							name: "user3",
							voiceChatId: "VCId3",
							display: true,
							image: "/api/users/3/image",
							role: "editor"
						}
					]);
				});
			});
			browser.get("http://127.0.0.1:8000/");
		});

		it("should change disabled attribute's value of a login button.", function() {
			var btn = element(by.css("form[name=\"loginForm\"] button"));
			expect(btn.isEnabled()).toEqual(false);
			element(by.model("credentials.username")).sendKeys("validuser");
			expect(btn.isEnabled()).toEqual(false);
			element(by.model("credentials.password")).sendKeys("validpassword");
			expect(btn.isEnabled()).toEqual(true);
		});

		it("should not login and show a message.", function() {
			var btn = element(by.css("form[name=\"loginForm\"] button"));
			var username = element(by.model("credentials.username"));
			var password = element(by.model("credentials.password"));

			username.sendKeys("invaliduser");
			password.sendKeys("invalidpassword");
			btn.click();

			var loginForm = element(by.css("form[name=\"loginForm\"]"));
			expect(loginForm.isDisplayed()).toEqual(true);
			
		});

		it("should login.", function() {
			var btn = element(by.css("form[name=\"loginForm\"] button"));
			var username = element(by.model("credentials.username"));
			var password = element(by.model("credentials.password"));
			username.sendKeys("validuser");
			password.sendKeys("validpassword");
			btn.click();

			var loginForm = element(by.css("form[name=\"loginForm\"]"));
			expect(loginForm.isDisplayed()).toEqual(false);
			expect(username.getAttribute("value")).toEqual("");
			expect(password.getAttribute("value")).toEqual("");

			var userToggles = element.all(by.repeater("user in users"));
			expect(userToggles.count()).toEqual(3);
			expect(userToggles.get(0).getText()).toEqual("user2");
			expect(userToggles.get(1).getText()).toEqual("user4");
			expect(userToggles.get(2).getText()).toEqual("user3");

			var userImages = element.all(by.repeater("u in users"));
			expect(userImages.count()).toEqual(3);
			expect(userImages.get(0).isDisplayed()).toEqual(true);
			expect(userImages.get(1).isDisplayed()).toEqual(false);
			expect(userImages.get(2).isDisplayed()).toEqual(true);
		});
	});

	describe("User images", function() {
		var userToggles, userImages;
		beforeEach(function() {
			browser.addMockModule("httpBackendMock", function() {
				angular.module("httpBackendMock", ["ngMockE2E"]).run(function($httpBackend) {
					$httpBackend
					.when("POST", "/api/login", {
						username: "validuser",
						password: "validpassword"
					})
					.respond(function (method, url, data, headers) {
						return [200, {
							id: 1,
							name: "validname",
							voiceChatId: "validVCId",
							display: true,
							image: "/api/users/1/image",
							role: "admin"
						}];
					});
					$httpBackend
					.when("GET", "/api/displaySettings")
					.respond([
						{
							id: 2,
							name: "user2",
							voiceChatId: "VCId2",
							display: true,
							image: "/api/users/2/image",
							role: "editor"
						},
						{
							id: 4,
							name: "user4",
							voiceChatId: "VCId4",
							display: false,
							image: "/api/users/4/image",
							role: "editor"
						},
						{
							id: 3,
							name: "user3",
							voiceChatId: "VCId3",
							display: true,
							image: "/api/users/3/image",
							role: "editor"
						}
					]);
				});
			});
			browser.get("http://127.0.0.1:8000/");
			var btn = element(by.css("form[name=\"loginForm\"] button"));
			var username = element(by.model("credentials.username"));
			var password = element(by.model("credentials.password"));
			username.sendKeys("validuser");
			password.sendKeys("validpassword");
			btn.click();
			userToggles = element.all(by.repeater("user in users"));
			userImages = element.all(by.repeater("u in users"));
		});

		it("toggle image display.", function() {
			userToggles.get(0).click();
			expect(userImages.get(0).isDisplayed()).toEqual(false);
			expect(userImages.get(1).isDisplayed()).toEqual(false);
			expect(userImages.get(2).isDisplayed()).toEqual(true);

			userToggles.get(1).click();
			expect(userImages.get(0).isDisplayed()).toEqual(false);
			expect(userImages.get(1).isDisplayed()).toEqual(true);
			expect(userImages.get(2).isDisplayed()).toEqual(true);

			userImages.get(2).element(by.css("button")).click();
			expect(userImages.get(0).isDisplayed()).toEqual(false);
			expect(userImages.get(1).isDisplayed()).toEqual(true);
			expect(userImages.get(2).isDisplayed()).toEqual(false);

		});
	});

	describe("User Management", function() {
		var userToggles, userImages;
		beforeEach(function() {
			browser.addMockModule("httpBackendMock", function() {
				angular.module("httpBackendMock", ["ngMockE2E"]).run(function($httpBackend) {
					$httpBackend
					.when("POST", "/api/login", {
						username: "validuser",
						password: "validpassword"
					})
					.respond(function (method, url, data, headers) {
						return [200, {
							id: 1,
							name: "validname",
							voiceChatId: "validVCId",
							display: true,
							image: "/api/users/1/image",
							role: "admin"
						}];
					});
					$httpBackend
					.when("GET", "/api/displaySettings")
					.respond([
						{
							id: 2,
							name: "user2",
							voiceChatId: "VCId2",
							display: true,
							image: "/api/users/2/image",
							role: "editor"
						}
					]);
				});
			});
			browser.get("http://127.0.0.1:8000/");
			element(by.model("credentials.username")).sendKeys("validuser");
			element(by.model("credentials.password")).sendKeys("validpassword");
			element(by.css("form[name=\"loginForm\"] button")).click();
		});

		it("shows user management page.", function() {
			expect(element(by.css("div[role=\"navigation\"] li:nth-child(2)")).isDisplayed()).toEqual(true);
			expect(element(by.css("div[role=\"navigation\"] li:nth-child(3)")).isDisplayed()).toEqual(true);
		});
	});
});
