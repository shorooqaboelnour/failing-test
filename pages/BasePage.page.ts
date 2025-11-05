import { expect, Page, Locator } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}
  get submitButton(): Locator {
    return this.page.getByTestId('selling-flow-submit-button');
  }

  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async verifyPageLoaded(selector: Locator): Promise<void> {
    await expect(selector).toBeVisible();
  }

  async clickSubmitButton(): Promise<void> {
    await this.submitButton.click();
  }
}
