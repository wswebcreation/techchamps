import { join } from 'path';
import { config } from './wdio.shared.appium.local.conf';

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
    'appium:deviceName': 'iPhone 14', // Change this to the name of your iOS device
    'appium:platformVersion': '16.4', // Change this to the version of your iOS device
    'appium:orientation': 'PORTRAIT',
    'appium:automationName': 'XCUITest',
    'appium:app': join(__dirname, '../../apps/MyDemoAppRN.zip'),
    //
    // Enabling this will prevent the session from being reset/remove the app
    // Advantage is that it will be faster to run tests, disadvantage is that
    // the app will not be reset to its initial state
    // 'appium:noReset': true,
  },
];

exports.config = config;
