import { BasePage } from './BasePage.page';

export class ApplicationFormPage extends BasePage {
  get continueButton() {
    return this.page.locator('button:has-text("Weiter")').first();
  }

  get errorMessage() {
    return this.page.locator('.error, [class*="error"]').first();
  }

  async verifyApplicationFormLoaded(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }
}

