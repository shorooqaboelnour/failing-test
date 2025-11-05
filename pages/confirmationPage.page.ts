import { BasePage } from './BasePage.page';
import { expect } from '@playwright/test';

export class ConfirmationPage extends BasePage {
  get successMessage() {
    return this.page.locator('h1:has-text("Danke!")').first();
  }

  async verifyConfirmationPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/ebike\/erfolgreich\b/);
    await expect(this.successMessage).toBeVisible();
  }
}
