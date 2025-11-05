import { BasePage } from './BasePage.page';
import { expect } from '@playwright/test';

export class PricingPage extends BasePage {
  get continueToPaymentButton() {
    // Priority: data-test > id > type submit > text
    return this.page.locator(
      '[data-test="selling-flow-submit-button"], ' +
      'button[data-test*="submit"], ' +
      'button[id*="submit"], ' +
      'button[id*="continue"], ' +
      'button[type="submit"]:has-text("Weiter"), ' +
      'button:has-text("Weiter")'
    ).first();
  }

  async verifyPricingPageLoaded(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    await expect(this.page.getByText('Ihr Angebot')).toBeVisible();
  }

  async clickContinueToPayment(): Promise<void> {
    // Try multiple selectors
    const buttonSelectors = [
      '[data-test="selling-flow-submit-button"]',
      'button[data-test="selling-flow-submit-button"]',
      '[data-test*="submit-button"]',
      'button[data-test*="submit"]',
      'button[id*="submit"]',
      'button[id*="continue"]',
      'button[type="submit"]',
      'button:has-text("Weiter")'
    ];
    
    let clicked = false;
    for (const selector of buttonSelectors) {
      try {
        const button = this.page.locator(selector).first();
        if (await button.count() > 0) {
          await button.waitFor({ state: 'visible', timeout: 10000 });
          await button.scrollIntoViewIfNeeded();
          await this.page.waitForTimeout(500);
          await button.click();
          clicked = true;
          break;
        }
      } catch (e) {
        continue;
      }
    }
    
    if (!clicked) {
      // Fallback to the getter
      await this.continueToPaymentButton.waitFor({ state: 'visible', timeout: 15000 });
      await this.continueToPaymentButton.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      await this.continueToPaymentButton.click();
    }
    
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);
  }
}

