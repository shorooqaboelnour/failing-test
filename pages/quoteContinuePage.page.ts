import { BasePage } from './BasePage.page';
import { expect } from '@playwright/test';

export class QuoteContinuePage extends BasePage {
  get continueButton() {
    // Priority: data-test > id > type submit > text
    return this.page.locator(
      '[data-test="selling-flow-submit-button"], ' +
      'button[data-test*="submit"], ' +
      'button[id*="submit"], ' +
      'button[type="submit"]:has-text("Weiter"), ' +
      'button:has-text("Weiter")'
    ).first();
  }

  async verifyQuoteContinuePageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/ebike\/quote-continue\b/);
    await this.page.waitForLoadState('networkidle');
  }

  async selectQuoteAndContinue(): Promise<void> {
    await this.verifyQuoteContinuePageLoaded();
    await this.page.waitForTimeout(1500);
    
    // Scroll to the end of the page
    await this.page.evaluate(() => {
      // @ts-ignore - window and document exist in browser context
      window.scrollTo(0, document.body.scrollHeight);
    });
    await this.page.waitForTimeout(1500);
    
    // Bulletproof selector strategy - try all possible ways
    const buttonSelectors = [
      '[data-test="selling-flow-submit-button"]',
      'button[data-test="selling-flow-submit-button"]',
      '[data-test*="submit-button"]',
      'button[data-test*="submit"]',
      'button[id*="submit"]',
      'button[id*="continue"]',
      'button[id*="weiter"]',
      'button[type="submit"]',
      'button:has-text("Weiter")',
      'button:has-text("weiter")',
      'button:has-text("Continue")',
      'form button[type="submit"]'
    ];
    
    let buttonClicked = false;
    for (const selector of buttonSelectors) {
      try {
        const button = this.page.locator(selector);
        const count = await button.count();
        if (count > 0) {
          const firstButton = button.first();
          await firstButton.waitFor({ state: 'visible', timeout: 5000 });
          await firstButton.scrollIntoViewIfNeeded();
          await this.page.waitForTimeout(500);
          await firstButton.click();
          buttonClicked = true;
          break;
        }
      } catch (e) {
        continue;
      }
    }
    
    if (!buttonClicked) {
      // Last resort: find any submit button on the page
      const anySubmit = this.page.locator('button[type="submit"]').first();
      if (await anySubmit.count() > 0) {
        await anySubmit.waitFor({ state: 'visible', timeout: 5000 });
        await anySubmit.scrollIntoViewIfNeeded();
        await anySubmit.click();
        buttonClicked = true;
      }
    }
    
    if (!buttonClicked) {
      throw new Error('Could not find Weiter/submit button on quote-continue page');
    }
    
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);
  }
}
