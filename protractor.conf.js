exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: ['client-test/e2e/*.js'],
    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            'args': ['test-type']
        }
    },
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }
};
