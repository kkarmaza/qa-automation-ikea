import { Locator, Page } from "@playwright/test";

export class JobsCookieBanner {
  readonly container: Locator;
  readonly acceptButton: Locator;
  readonly rejectButton: Locator;
  constructor(page: Page) {
    this.container = page.locator("#system-imessage");
    this.acceptButton = this.container.locator("#system-ialert-button");
    this.rejectButton = this.container.locator("#system-ialert-reject-button");
  }
}
