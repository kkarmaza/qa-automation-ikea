import { test as baseTest } from "@playwright/test";
import { HomePage } from "../ui/pages/HomePage";
import { JobPage } from "../ui/pages/JobPage";
import { GlobalJobsPage } from "../ui/pages/GlobalJobsPage";
import { JobsPage } from "../ui/pages/JobsPage";
import { SearchResultPage } from "../ui/pages/SearchResultPage";

interface ExtendedFixture {
  homePage: HomePage;
  globalJobsPage: GlobalJobsPage;
  jobsPage: JobsPage;
  jobPage: JobPage;
  searchResultPage: SearchResultPage;
}

export const test = baseTest.extend<ExtendedFixture>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.cookieBanner.cookierBannerContainer.waitFor({
      state: "visible",
    });
    await homePage.cookieBanner.rejectButton.click();
    await use(homePage);
  },

  globalJobsPage: async ({ page }, use) => {
    const globalJobsPage = new GlobalJobsPage(page);
    await globalJobsPage.navigate();
    await use(globalJobsPage);
  },

  jobsPage: async ({ page }, use) => {
    const jobsPage = new JobsPage(page);
    await use(jobsPage);
  },

  jobPage: async ({ page }, use) => {
    const jobPage = new JobPage(page);
    await use(jobPage);
  },

  searchResultPage: async ({ page }, use) => {
    const searchResultPage = new SearchResultPage(page);
    await use(searchResultPage);
  },
});
