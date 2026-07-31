import { expect, Locator, Page } from "@playwright/test";
import { BaseJobsPage } from "./BaseJobsPage";
import { getRandomIndex } from "../../utils/randomData";

export class JobsPage extends BaseJobsPage {
  readonly searchPanel: Locator;
  readonly searchKeyword: Locator;
  readonly searchLocation: Locator;
  readonly searchJobsButton: Locator;
  readonly getJobAlertSection: Locator;
  readonly emailInput: Locator;
  readonly categoryDropDown: Locator;
  readonly locationInput: Locator;
  readonly addButton: Locator;
  readonly selectedJobAlert: Locator;
  readonly selectedJobs: Locator;
  readonly signUpButton: Locator;
  readonly confirmationMessage: Locator;
  readonly successMessage = "Your subscription was submitted successfully.";
  readonly roleTabs: Locator;
  readonly categoryTiles: Locator;
  readonly categoryTileLinks: Locator;

  constructor(page: Page) {
    super(page);
    this.searchPanel = page.locator(".page-banner__search-form");
    this.searchKeyword = this.searchPanel.locator(
      "[id^='search-keyword-']:visible",
    );
    this.searchLocation = this.searchPanel.locator(
      "input[id^='search-location-']:visible",
    );
    this.searchJobsButton = this.searchPanel.locator(
      "[id^='search-submit-']:visible",
    );
    this.getJobAlertSection = page.locator(".data-form.job-alert");
    this.emailInput = this.getJobAlertSection.locator("[name='EmailAddress']");
    this.categoryDropDown =
      this.getJobAlertSection.locator("[name='Category']");
    this.locationInput = this.getJobAlertSection.locator("[name='Location']");
    this.addButton = this.getJobAlertSection.locator(".keyword-add");
    this.selectedJobAlert =
      this.getJobAlertSection.locator(".keyword-selected");
    this.selectedJobs = this.selectedJobAlert.locator(".keyword-text");
    this.signUpButton = this.getJobAlertSection.locator("[type='submit']");
    this.confirmationMessage = this.getJobAlertSection.locator(
      ".form-field.form-message b",
    );
    this.roleTabs = page.locator(".vertical-tab-to-accordion__button");
    this.categoryTiles = page.locator(
      ".vertical-tab-to-accordion__tile:visible",
    );
    this.categoryTileLinks = page.locator(
      ".vertical-tab-to-accordion__tile-link-arrow:visible",
    );
  }

  async searchJobs(searchKeyword: string, searchLocation: string = "") {
    await expect(this.searchPanel).toBeVisible();
    await this.searchKeyword.fill(searchKeyword);
    await this.searchLocation.fill(searchLocation);
    await this.searchJobsButton.click();
  }

  async acceptCookies() {
    await this.cookieBanner.container.waitFor({
      state: "visible",
    });
    await this.cookieBanner.acceptButton.click();
  }

  async rejectCookies() {
    await this.cookieBanner.container.waitFor({
      state: "visible",
    });
    await this.cookieBanner.rejectButton.click();
  }

  async selectCategory(category: string) {
    await this.categoryDropDown.selectOption(category);
    await this.addButton.click();
  }
  async selectLocation(location: string) {
    await this.locationInput.pressSequentially(location, {
      delay: 100,
    });

    const listboxId = await this.locationInput.getAttribute("aria-controls");
    const locationListbox = this.page.locator(`#${listboxId}`);
    await locationListbox.waitFor({ state: "visible" });
    await locationListbox.getByRole("option").first().click();
  }

  async openRandomRole() {
    const rolesCount = await this.roleTabs.count();
    await this.roleTabs.nth(getRandomIndex(rolesCount)).click();
  }

  async selectFirstCategory(): Promise<{
    categoryName: string;
    acmValue: string;
  }> {
    const tile = this.categoryTiles.first();
    await expect(tile).toBeVisible();

    const categoryName = (
      await tile.locator(".vertical-tab-to-accordion__tile-title").innerText()
    ).trim();

    const categoryLink = tile.locator(
      ".vertical-tab-to-accordion__tile-link-arrow",
    );
    //href is in the form "/EN/<acm-id>", the id is reused as the acm query param on the search-jobs page
    const href = await categoryLink.getAttribute("href");
    const acmValue = href!.split("/").pop()!;

    await categoryLink.click();
    return { categoryName, acmValue };
  }
}
