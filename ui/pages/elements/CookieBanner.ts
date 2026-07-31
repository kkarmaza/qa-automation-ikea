import { Locator, Page } from "@playwright/test";

export class CookieBanner {
  readonly cookierBannerContainer: Locator;
  readonly acceptButton: Locator;
  readonly rejectButton: Locator;

  constructor(page: Page) {
    this.cookierBannerContainer = page.locator(".ot-sdk-row");
    this.acceptButton = this.cookierBannerContainer.locator(
      "#onetrust-accept-btn-handler",
    );
    this.rejectButton = this.cookierBannerContainer.locator(
      "#onetrust-reject-all-handler",
    );
  }
}
