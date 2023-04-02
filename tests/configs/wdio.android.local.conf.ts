import { join } from 'path';
import { config } from './wdio.shared.appium.local.conf';

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
    'appium:deviceName': 'Pixel_4_12.0_M1_Chrome', // Change this to the name of your Android device
    'appium:platformVersion': '12.0', // Change this to the version of your Android device
    'appium:orientation': 'PORTRAIT',
    'appium:automationName': 'UiAutomator2',
    'appium:app': join(__dirname, '../../apps/MyDemoAppRN.apk'),
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
  },
];

exports.config = config;
