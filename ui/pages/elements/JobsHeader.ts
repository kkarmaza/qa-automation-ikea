import { Locator, Page } from "@playwright/test";

export class JobsHeader {
  readonly headerContainer: Locator;
  readonly language: Locator;
  readonly savedJobsButton: Locator;
  readonly savedJobsNumber: Locator;
  readonly savedJobsDropdown: Locator;
  readonly savedJobsItems: Locator;

  constructor(page: Page) {
    this.headerContainer = page.locator(".header__wrapper");
    this.language = page.locator(".lang-picker");
    this.savedJobsButton = page.locator(".saved-jobs-dropdown__button");
    this.savedJobsNumber = this.savedJobsButton.locator(
      ".saved-jobs-dropdown__number",
    );
    this.savedJobsDropdown = page.locator(".saved-jobs-dropdown__wrapper");
    this.savedJobsItems = this.savedJobsDropdown.locator(
      ".saved-jobs-dropdown__list-item",
    );
  }

  async getSavedJobTitle(savedJob: Locator): Promise<string> {
    return (
      await savedJob.locator(".saved-jobs-dropdown__jobtitle").innerText()
    ).trim();
  }
}
