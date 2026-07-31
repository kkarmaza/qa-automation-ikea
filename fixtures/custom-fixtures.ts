import { test as baseTest } from "@playwright/test";
import { HomePage } from "../ui/pages/HomePage";

interface ExtendedFixture {
  homePage: HomePage;
}

export const test = baseTest.extend<ExtendedFixture>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.cookieBanner.cookierBannerContainer.waitFor({
      state: "visible",
    });
    await homePage.cookieBanner.rejectButton.click();
    await use(homePage);
  },
});
