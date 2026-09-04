import { Locator, Page } from "@playwright/test";

export class Menu {
  readonly menuContainer: Locator;
  readonly storiesButton: Locator;
  readonly jobsButton: Locator;
  readonly newsroomButton: Locator;
  readonly ourBusinessButton: Locator;

  constructor(page: Page) {
    this.menuContainer = page.locator("header");
    this.storiesButton = this.menuContainer.locator(
      "[data-text='Stories']:visible",
    );
    this.jobsButton = this.menuContainer.locator("[data-text='Jobs']:visible");
    this.newsroomButton = this.menuContainer.locator(
      "[data-text='Newsroom']:visible",
    );
    this.ourBusinessButton = this.menuContainer.locator(
      "[data-text='Our business']:visible",
    );
  }
}
