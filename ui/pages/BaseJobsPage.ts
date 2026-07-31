import { Page } from "@playwright/test";
import { JobsHeader } from "./elements/JobsHeader";
import { JobsCookieBanner } from "./elements/JobsCookieBanner";

export class BaseJobsPage {
  readonly page: Page;
  readonly header: JobsHeader;
  readonly cookieBanner: JobsCookieBanner;

  constructor(page: Page) {
    this.page = page;
    this.header = new JobsHeader(page);
    this.cookieBanner = new JobsCookieBanner(page);
  }
}
