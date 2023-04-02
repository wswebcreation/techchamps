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
    const menuSelector = driver.isIOS ? '~tab bar option menu' : '~open menu';
    await $(menuSelector).click();
    //
    // 2. Go to Login
    const loginMenuSelector = '~menu item log in';
    await $(loginMenuSelector).waitForDisplayed();
    await $(loginMenuSelector).click();
    //
    // 3. Login
    const usernameSelector = driver.isIOS
      ? '~Username'
      : '//android.widget.EditText[1]';
    const passwordSelector = driver.isIOS
      ? '~Password'
      : '//android.widget.EditText[2]';
    await $(usernameSelector).waitForDisplayed();
    await $(usernameSelector).setValue('bob@example.com');
    //
    // !! TIP !!
    // Think about smaller screens and how to make sure the keyboard is not covering the input field
    await hideKeyboard();
    await $(passwordSelector).setValue('10203040');
    //
    // !! TIP !!
    // Think about smaller screens and how to make sure the keyboard is not covering the submit button
    await hideKeyboard();
    const loginSelector = '~Login button';
    await $(loginSelector).click();
    //
    // 4. Validate that you are back on the products screen
    // This is debatable, but I think that waiting for an element to be displayed
    // is equal to asserting that it is displayed
    await $('~products screen').waitForDisplayed({ timeout: 30000 });
  });

  it('Should be able to find the Sauce Labs Onesie and add it to the cart', async () => {
    //
    // 1. Find the Sauce Labs Onesie
    //    There are multiple ways to execute Gestures:
    //    - Cross platform:
    //      - https://webdriver.io/docs/api/webdriver#performactions and then also read:
    //        https://github.com/jlipps/simple-wd-spec#perform-actions
    //    - Android Specific:
    //      - https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/android-mobile-gestures.md
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

const hideKeyboard = async (): Promise<void> => {
  // The hideKeyboard is not working on ios devices, so take a different approach
  if (!(await driver.isKeyboardShown())) {
    return;
  }

  if (driver.isIOS) {
    await $('id=Return').click();
  } else {
    try {
      await driver.hideKeyboard('pressKey', 'Done');
    } catch (e) {
      // Fallback
      await driver.back();
    }
  }

  // Wait for the keyboard animation to be done
  await driver.pause(750);
};
