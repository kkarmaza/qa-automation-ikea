import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class GlobalJobsPage extends BasePage {
  readonly exploreAvailableJobsButton: Locator;
  constructor(page: Page) {
    super(page, "/global/en/jobs/");
    this.exploreAvailableJobsButton = page.locator(".button-link");
  }

  async openAvailableJobsPage() {
    await expect(this.exploreAvailableJobsButton).toBeVisible();
    await this.exploreAvailableJobsButton.click();
  }
}
