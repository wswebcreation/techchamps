/**
 * Extra info:
 * - Tips for Element selectors can be found here
 *   - Android:
 *    - https://github.com/appium/appium-uiautomator2-driver#element-location
 *   - iOS:
 *    - https://appium.github.io/appium-xcuitest-driver/4.19/locator-strategies/
 * - Mobile Selectors for WebdriverIO can be found here
 *   https://webdriver.io/docs/selectors#mobile-selectors
 * - Appium Inspector will be used to find and inspect elements for
 *   Android and iOS and can be found here
 *   https://github.com/appium/appium-inspector
 *   Make sure to have the Appium server running before using the inspector
 */

describe('My First Native App Test', () => {
  beforeEach(async () => {
    //
    // 1. This one is for free
    await $('~products screen').waitForDisplayed({ timeout: 30000 });
  });

  /**
   * You can add the `.only` modifier to a test to only run that test
   * This is useful when you want to run only one test
   * You can also add the `.skip` modifier to a test to skip that test
   * This is useful when you want to skip a test
   */

  it.only('Should be able to login', async () => {
    //
    // 1. Open the menu
    //
    // 2. Go to Login
    //
    // 3. Login
    //
    // 4. Validate that you are back on the products screen
  });

  it('Should be able to find the Sauce Labs Onesie and add it to the cart', async () => {
    //
    // 1. Find the Sauce Labs Onesie
    //    There are multiple ways to execute Gestures:
    //    - Cross platform:
    //      - https://webdriver.io/docs/api/webdriver#performactions and then also read:
    //        https://github.com/jlipps/simple-wd-spec#perform-actions     //
    //    - Android Specific:
    //      - https://github.com/appium/appium-uiautomator2-driver#mobile-gesture-commands
    //    - iOS Specific:
    //      - https://appium.github.io/appium-xcuitest-driver/4.19/execute-methods/
    // 2. Add it to the cart
    //
    // 3. Validate that the cart has 1 item
    //
    // 4. Go to the cart
    //
    // 5. Validate that the cart has 1 item
  });
});
