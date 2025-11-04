import { BasePage } from './BasePage.page';

export class QuoteContinuePage extends BasePage {
  get continueButton() {
    return this.page.locator('button:has-text("Weiter"), [data-test="selling-flow-submit-button"]').first();
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }
}

