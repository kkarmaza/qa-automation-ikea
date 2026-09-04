import { Page } from "@playwright/test";
import { Header } from "./elements/Header";
import { CookieBanner } from "./elements/CookieBanner";

export class BasePage {
  readonly page: Page;
  readonly url: string;
  readonly header: Header;
  readonly cookieBanner: CookieBanner;

  constructor(page: Page, url: string) {
    this.page = page;
    this.url = url;
    this.header = new Header(page);
    this.cookieBanner = new CookieBanner(page);
  }

  async navigate() {
    if (!this.url) {
      throw new Error("URL is not defined");
    }
    await this.page.goto(this.url);
  }
}
