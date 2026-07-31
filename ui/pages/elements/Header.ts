import { Locator, Page } from "@playwright/test";
import { Menu } from "./Menu";

export class Header {
  readonly headerContainer: Locator;
  readonly menu: Menu;

  constructor(page: Page) {
    this.headerContainer = page.locator("nav");
    this.menu = new Menu(page);
  }
}
