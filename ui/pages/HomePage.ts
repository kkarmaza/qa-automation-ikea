import { expect, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page, "/");
  }

  async openJobPage() {
    await expect(this.header.menu.jobsButton).toBeVisible();
    await this.header.menu.jobsButton.click();
  }
}
