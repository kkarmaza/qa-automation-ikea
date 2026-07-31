import { expect, Locator, Page } from "@playwright/test";

export class SearchResultPage {
  readonly jobs: Locator;
  readonly searchResults: Locator;
  readonly resultsTitle: Locator;
  readonly jobCategories: Locator;
  constructor(page: Page) {
    this.jobs = page.locator(".job-list__item");
    this.searchResults = page.locator("#search-results");
    this.resultsTitle = page.locator(
      '[data-grabandreplace-name="search-headline"]',
    );
    this.jobCategories = page.locator(".job-list__categories");
  }

  async openJob(job: Locator) {
    await expect(this.searchResults).toBeVisible();
    await job.locator(".job-list__title").click();
  }

  async getJobHref(job: Locator): Promise<string | null> {
    return job.locator(".job-list__anchor").getAttribute("href");
  }

  async getJobsCount(): Promise<number> {
    await this.searchResults.waitFor({ state: "visible" });
    return this.jobs.count();
  }

  async getJobCategories(): Promise<string[]> {
    return (await this.jobCategories.allInnerTexts()).map((text) =>
      text.trim(),
    );
  }
}
