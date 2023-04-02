import { config } from './wdio.shared.saucelabs.conf';

// ============
// Capabilities
// ============
config.capabilities = [
  {
    //
    // The defaults you need to have in your config
    platformName: 'iOS',
    //
    // For W3C the appium capabilities need to have an extension prefix
    // This is `appium:` for all Appium Capabilities. You can find the iOS capabilities here
    // https://github.com/appium/appium-xcuitest-driver
    //
    // This will match any Google Pixel or Samsung Galaxy S device
    'appium:deviceName': 'iPhone (X|1[1-4]).*',
    //
    // This will match all Android versions from 14 to 16
    'appium:platformVersion': '^1[4-6].*',
    'appium:orientation': 'PORTRAIT',
    'appium:automationName': 'XCUITest',
    'appium:app': 'storage:filename=MyDemoAppRN.ipa',
    //
    // Enabling this will prevent the session from being reset/remove the app
    // Advantage is that it will be faster to run tests, disadvantage is that
    // the app will not be reset to its initial state
    // 'appium:noReset': true,
    //
    // This is needed for Sauce Labs
    'sauce:options': {
      appiumVersion: '2.0.0',
      name: 'iOS Sauce Labs Demo',
    },
  },
];

exports.config = config;
