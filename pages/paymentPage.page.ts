import { BasePage } from './BasePage.page';
import { expect } from '@playwright/test';

export class PaymentPage extends BasePage {
  get submitPaymentButton() {
    return this.page.locator('button:has-text("Bezahlen")').first();
  }

  async verifyPaymentPageLoaded(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    await expect(this.page.getByText('Zahlungsweise')).toBeVisible();
  }

  async submitPayment(): Promise<void> {
    await this.submitPaymentButton.waitFor({ state: 'visible', timeout: 15000 });
    await this.submitPaymentButton.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(500);
    await this.submitPaymentButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}

