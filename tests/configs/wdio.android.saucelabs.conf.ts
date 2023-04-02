import { config } from './wdio.shared.saucelabs.conf';

// ============
// Capabilities
// ============
config.capabilities = [
  {
    //
    // The defaults you need to have in your config
    platformName: 'Android',
    //
    // For W3C the appium capabilities need to have an extension prefix
    // This is `appium:` for all Appium Capabilities. You can find the Android capabilities here
    // https://github.com/appium/appium-uiautomator2-driver
    //
    // This will match any Google Pixel or Samsung Galaxy S device
    'appium:deviceName': '(Google|Samsung Galaxy S).*',
    //
    // This will match all Android versions from 10 to 13
    'appium:platformVersion': '^1[0-3].*',
    'appium:orientation': 'PORTRAIT',
    'appium:automationName': 'UiAutomator2',
    'appium:app': 'storage:filename=MyDemoAppRN.apk',
    //
    // This will tell Appium to wait for the app activity to start
    // Normally this is not needed because Appium will automatically detect when the app is started
    // bu in some cases this is needed (like when the app takes a long time to start)
    'appium:appWaitActivity': 'com.saucelabs.mydemoapp.rn.MainActivity',
    //
    // Enabling this will prevent the session from being reset/remove the app
    // Advantage is that it will be faster to run tests, disadvantage is that
    // the app will not be reset to its initial state
    // 'appium:noReset': true,
    //
    // This is needed for Sauce Labs
    'sauce:options': {
      appiumVersion: '2.0.0',
      name: 'Android Sauce Labs Demo',
    },
  },
];

exports.config = config;
