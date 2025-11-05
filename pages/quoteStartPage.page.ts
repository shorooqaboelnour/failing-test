import { BasePage } from './BasePage.page';
import { expect } from '@playwright/test';

export class QuoteStartPage extends BasePage {
  get priceRangeSelector() {
    return this.page.getByTestId('select-container-values_price');
  }

  get purchaseDateField() {
    return this.page
      .getByTestId('input-wrapper-helpers_purchasedAtOnline')
      .locator('input');
  }

  async clickSubmitButton(): Promise<void> {
    await this.submitButton.click();
  }

  async selectPriceRange(priceRange: RegExp): Promise<void> {
    await this.priceRangeSelector.click();
    const option = this.priceRangeSelector.getByText(priceRange);
    await option.click();
  }
  async fillPurchaseDate(purchaseDate: string): Promise<void> {
    await this.purchaseDateField.fill(purchaseDate);
    await this.purchaseDateField.press('Enter');
  }
}
