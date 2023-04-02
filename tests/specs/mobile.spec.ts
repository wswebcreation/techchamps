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

  it('Should be able to login', async () => {
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

  it.only('Should be able to find the Sauce Labs Onesie and add it to the cart', async () => {
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
    const needle = 'Sauce Labs Onesie';
    const itemSelector = 'store item';
    const iosSelector = `-ios class chain:**/XCUIElementTypeOther[\`name == "${itemSelector}" AND label CONTAINS "${needle}"\`]`;
    const androidSelector = `//android.widget.TextView[contains(@text,'${needle}')]//ancestor::*[@content-desc='${itemSelector}']`;
    const oneSieElement = await $(driver.isIOS ? iosSelector : androidSelector);

    if (!(await oneSieElement.isDisplayed())) {
      // //
      // // Cross platform swipe

      // //
      // // !! TIP !!
      // // Better to scroll inside of an element instead of the whole screen
      // // due to header and footer elements
      const scrollableElement = await $('~products screen');
      await findElementBySwipe({ element: oneSieElement, scrollableElement });

      // // Driver specific swipes
      // if (driver.isIOS) {
      //   // iOS specific swipe
      //   await driver.execute('mobile: scrollToElement', {
      //     elementId: oneSieElement.elementId,
      //   });
      // } else {
      //   // Android specific swipe 1
      //   await driver.execute('mobile: swipeGesture', {
      //     elementId: scrollableElement.elementId,
      //     //
      //     // !! TIP !!
      //     // Swiping down is the same as putting your finger and the bottom of the scrollable element
      //     // and then go up. So the direction is up
      //     direction: 'up',
      //     percent: 0.5,
      //   });

      //   // // Android specific swipe 2
      //   // const oneSieElementAndroidSelector =
      //   //   'android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().textContains("Sauce Labs Onesie"))';
      //   // await $(oneSieElementAndroidSelector);
      // }
    }
    //
    // 2. Add it to the cart

    // Just a check-check-double-check =)
    expect(await getCartBadgeAmount()).toEqual(0);

    await oneSieElement.click();
    const addToCartSelector = '~Add To Cart button';
    await $(addToCartSelector).click();
    //
    // !! TIP !!
    // There is a small animation when the item is added to the cart
    // So it takes a while for the badge to update
    await driver.pause(750);
    //
    // 3. Validate that the cart has 1 item
    expect(await getCartBadgeAmount()).toEqual(1);
    //
    // 4. Go to the cart
    const cartButtonSelector = driver.isIOS
      ? '~tab bar option cart'
      : '~cart badge';
    await $(cartButtonSelector).click();
    //
    // 5. Validate that the cart has 1 item
    const cartScreenSelector = '~cart screen';
    await $(cartScreenSelector).waitForDisplayed();
    const productRowSelector = '~product row';
    expect((await $$(productRowSelector)).length).toEqual(1);
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
const swipe = async (
  from: { x: number; y: number },
  to: { x: number; y: number }
) => {
  await driver.performActions([
    {
      // a. Create the event
      type: 'pointer',
      id: 'finger1',
      parameters: { pointerType: 'touch' },
      actions: [
        // b. Move finger into start position
        { type: 'pointerMove', duration: 0, x: from.x, y: from.y },
        // c. Finger comes down into contact with screen
        { type: 'pointerDown', button: 0 },
        // d. Pause for a little bit
        { type: 'pause', duration: 100 },
        // e. Finger moves to end position
        //    We move our finger from the center of the element to the
        //    starting position of the element
        { type: 'pointerMove', duration: 1000, x: to.x, y: to.y },
        // f. Finger lets up, off the screen
        { type: 'pointerUp', button: 0 },
      ],
    },
  ]);
  await driver.pause(2000);
};
const findElementBySwipe = async ({
  element,
  maxScrolls = 5,
  scrollableElement,
  scrollUp = false,
}: {
  element: WebdriverIO.Element;
  maxScrolls?: number;
  scrollableElement: WebdriverIO.Element;
  scrollUp?: boolean;
}): Promise<WebdriverIO.Element | undefined> => {
  for (let i = 0; i < maxScrolls; i++) {
    if (await element.isDisplayed()) {
      return element;
    }

    const { x, y, height, width } = await driver.getElementRect(
      scrollableElement.elementId
    );
    const centerX = x + width / 2;
    const yStart = y + height * 0.9;
    const yEnd = y + height * 0.1;
    // Swipe
    if (scrollUp) {
      // It's the reverse
      await swipe({ x: centerX, y: yEnd }, { x: centerX, y: yStart });
    } else {
      await swipe({ x: centerX, y: yStart }, { x: centerX, y: yEnd });
    }
  }

  throw new Error('Element not found');
};
const getTextOfElement = async (
  element: WebdriverIO.Element
): Promise<string> => {
  let visualText = '';

  try {
    // Android doesn't hold the text on the parent element
    // so each text view in the parent needs to be checked
    if (driver.isAndroid) {
      const elements = await element.$$('*//android.widget.TextView');
      for (let elm of elements) {
        visualText = `${visualText} ${await elm.getText()}`;
      }
    } else {
      visualText = await element.getText();
    }
  } catch (e) {
    visualText = await element.getText();
  }

  return visualText.trim();
};
const getCartBadgeAmount = async (): Promise<number> => {
  const cartBadgeSelector = driver.isIOS
    ? '~tab bar option cart'
    : '~cart badge';
  let amount = await getTextOfElement(await $(cartBadgeSelector));

  return amount === '' ? 0 : parseInt(amount, 10);
};
