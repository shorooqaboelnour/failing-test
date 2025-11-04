import { BasePage } from './BasePage.page';
import { expect } from '@playwright/test';

export class PricingPage extends BasePage {
  get continueToPaymentButton() {
    return this.page.locator('button:has-text("Weiter")').first();
  }

  async verifyPricingPageLoaded(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    await expect(this.page.getByText('Ihr Angebot')).toBeVisible();
  }

  async clickContinueToPayment(): Promise<void> {
    await this.continueToPaymentButton.click();
  }
}

