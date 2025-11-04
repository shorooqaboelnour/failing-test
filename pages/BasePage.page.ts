import { expect, Page, Locator } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async verifyPageLoaded(selector: Locator): Promise<void> {
    await expect(selector).toBeVisible();
  }
}
