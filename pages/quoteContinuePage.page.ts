import { BasePage } from './BasePage.page';
import { expect } from '@playwright/test';

export class QuoteContinuePage extends BasePage {
  get theftProtectionCoverageTypeSelector() {
    return this.page.getByTestId('diebstahlschutz');
  }

  get monthlyPaymentTypeSelector() {
    return this.page.getByTestId('monthly');
  }

  async selectTheftProtectionCoverageType(): Promise<void> {
    await this.theftProtectionCoverageTypeSelector.click();
  }

  async selectMonthlyPaymentType(): Promise<void> {
    await this.monthlyPaymentTypeSelector.click();
  }
}
