import { expect } from "@playwright/test";
import { test } from "../../fixtures/custom-fixtures";
import { randomEmail } from "../../utils/randomData";
import { requireEnv } from "../../utils/envCheck";

/*
Scenario 1: Search for a job
1. Open the IKEA website https://www.ikea.com/
2. Click on 'Jobs' tab
3. Click on 'Explore available jobs'
4. Input 'Manager' in Search field (leave postcode empty)
5. Click on 'Search jobs' button
6. Implement the following logic: If search returns 0 jobs, go back and search for 'Designer' (or any other job title)
7. Click on the first job in the list
8. Check that partial job title is 'Manager'
9. Click on 'Save' button
10. Check that 'Saved jobs' element has '1' in it
11. Click on 'Saved jobs' element
12. Check that the job title in 'Saved jobs' is 'Manager'*/

const baseUrl = requireEnv("BASE_URL");
const baseJobsUrl = requireEnv("BASE_JOBS_URL");

test("Search for a job", async ({
  page,
  homePage,
  globalJobsPage,
  jobsPage,
  jobPage,
  searchResultPage,
}) => {
  let searchInput = "Manager";
  const fallbackSearchInput = "Designer";

  await test.step("Navigate to IKEA website", async () => {
    await homePage.openJobPage();
    await expect(page).toHaveURL(`${baseUrl}/global/en/jobs/`);
  });

  await test.step("Search for the available jobs", async () => {
    await globalJobsPage.openAvailableJobsPage();
    await expect(page).toHaveURL(`${baseJobsUrl}`);
    //without accepting cookies Save button isn't visible
    await jobsPage.acceptCookies();

    await jobsPage.searchJobs(searchInput);
    await expect(searchResultPage.searchResults).toBeVisible();
    await expect(page).toHaveURL(
      new RegExp(`/jobs\\.ikea\\.com/en/search-jobs/${searchInput}/`),
    );
    //If search returns 0 jobs, search again with a fallback job title
    if ((await searchResultPage.getJobsCount()) === 0) {
      searchInput = fallbackSearchInput;
      await jobsPage.searchJobs(searchInput);
      await expect(searchResultPage.searchResults).toBeVisible();
      await expect(page).toHaveURL(
        new RegExp(`${baseJobsUrl}/search-jobs/${searchInput}/`),
      );
    }
  });

  await test.step("Open job and verify title", async () => {
    const firstJob = searchResultPage.jobs.first();
    const expectedHref = await searchResultPage.getJobHref(firstJob);
    await searchResultPage.openJob(firstJob);
    await expect(page).toHaveURL(new RegExp(`${expectedHref}$`));
    expect(await jobPage.getJobTitle()).toContain(searchInput);
  });

  await test.step("Save the job and verify 'Saved jobs' functionality", async () => {
    await jobPage.saveJob();
    await expect(jobPage.header.savedJobsNumber).toHaveText("(1)");
    await jobPage.header.savedJobsButton.click();
    await expect(jobPage.header.savedJobsDropdown).toBeVisible();
    const savedJob = jobPage.header.savedJobsItems.first();
    const savedJobTitle = await jobPage.header.getSavedJobTitle(savedJob);
    expect(savedJobTitle).toContain(searchInput);
  });
});

/*Scenario 2: Subscribe for a job 

1. Open the IKEA website
2. Click on 'Jobs' tab
3. Click on 'Explore available jobs'
4. Input Email in Subscription block (it should be generated every time)
5. Select a 'Category' and Add it
6. Input Location and choose it in dropdown
7. Click on 'Sign up' and check confirmation message*/

test("Subscribe for a job ", async ({
  page,
  homePage,
  globalJobsPage,
  jobsPage,
}) => {
  await test.step("Navigate to IKEA website", async () => {
    await homePage.openJobPage();
    await expect(page).toHaveURL(`${baseUrl}/global/en/jobs/`);
  });

  await test.step("Navigate to Available Jobs Page", async () => {
    await globalJobsPage.openAvailableJobsPage();
    await expect(page).toHaveURL(`${baseJobsUrl}`);
  });

  await test.step("Verify subscription functionality", async () => {
    await jobsPage.rejectCookies();
    await jobsPage.emailInput.fill(randomEmail());
    const selectedCategory = "Administration & Support Services";
    await jobsPage.selectCategory(selectedCategory);
    await expect(jobsPage.selectedJobs).toHaveText(selectedCategory);

    const inputLocation = "Vilnius";
    await jobsPage.selectLocation(inputLocation);
    await jobsPage.signUpButton.click();
    await expect(jobsPage.confirmationMessage).toHaveText(
      jobsPage.successMessage,
    );
  });
});

/*Scenario 3: Search for a job by category

1. Open the IKEA website
2. Click on 'Jobs' tab
3. Click on 'Explore available jobs'
4. Open ramdom role in 'I'm curious about...'
5. Select the first category in opened section
6. Verify opened page by acm value (use href value of selected section to compare)
7. Verify that "results for" title includes selected categoty
8. Verify that each job has selected Category*/

test("Search for a job by category", async ({
  page,
  homePage,
  globalJobsPage,
  jobsPage,
  searchResultPage,
}) => {
  let selectedCategoryName: string;
  let selectedAcmValue: string;

  await test.step("Navigate to IKEA website", async () => {
    await homePage.openJobPage();
    await expect(page).toHaveURL(`${baseUrl}/global/en/jobs/`);
  });

  await test.step("Navigate to Available Jobs Page", async () => {
    await globalJobsPage.openAvailableJobsPage();
    await expect(page).toHaveURL(`${baseJobsUrl}`);
    await jobsPage.rejectCookies();
  });

  await test.step("Open a random role and select the first category", async () => {
    await jobsPage.openRandomRole();
    const selectedCategory = await jobsPage.selectFirstCategory();
    selectedCategoryName = selectedCategory.categoryName;
    selectedAcmValue = selectedCategory.acmValue;
    expect(await searchResultPage.getJobsCount()).toBeGreaterThan(0);
  });

  await test.step("Verify the opened page matches the selected category via acm value", async () => {
    const acmParam = new URL(page.url()).searchParams.get("acm") ?? "";
    expect(acmParam.split(",")).toContain(selectedAcmValue);
  });

  await test.step("Verify the 'results for' title includes the selected category", async () => {
    await expect(searchResultPage.resultsTitle).toContainText(
      selectedCategoryName,
    );
  });

  await test.step("Verify every job in the results has the selected category", async () => {
    const categories = await searchResultPage.getJobCategories();
    for (const category of categories) {
      expect(category).toBe(selectedCategoryName);
    }
  });
});
