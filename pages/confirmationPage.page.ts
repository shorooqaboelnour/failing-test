import { BasePage } from './BasePage.page';

export class ConfirmationPage extends BasePage {
  get successMessage() {
    return this.page.locator('h1:has-text("Bestätigung"), [data-test*="success"]').first();
  }

  async verifyConfirmationPageLoaded(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }
}

