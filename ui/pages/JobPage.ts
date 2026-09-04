import { Locator, Page } from "@playwright/test";
import { JobsHeader } from "./elements/JobsHeader";
import { BaseJobsPage } from "./BaseJobsPage";

export class JobPage extends BaseJobsPage {
  readonly jobDetailsSection: Locator;
  readonly jobTitle: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);
    this.jobDetailsSection = page.locator("[data-selector-name='jobdetails']");
    this.jobTitle = this.jobDetailsSection.locator(".text--white");
    this.saveButton = this.jobDetailsSection.locator(
      ".js-save-job-btn.button--save-job--jd",
    );
  }

  async getJobTitle(): Promise<string> {
    return (await this.jobTitle.innerText()).trim();
  }

  async saveJob() {
    await this.saveButton.click();
  }
}
