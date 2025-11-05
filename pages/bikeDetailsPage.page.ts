import { BasePage } from './BasePage.page';
import { Page } from '@playwright/test';

export class BikeDetailsPage extends BasePage {
  get bikeBrandSelector() {
    return this.page.getByTestId('select-container-values_brand');
  }

  get bikeTypeSelector() {
    return this.page.getByTestId('select-container-values_type');
  }

  get bikeFrameNumberField() {
    return this.page
      .getByTestId('input-wrapper-values_frameNumber')
      .locator('input');
  }

  get lockConfirmationCheckbox() {
    return this.page
      .getByTestId('input-wrapper-values_hasEligibleLock')
      .locator('label');
  }

  async fillFrameNumber(frameNumber: string): Promise<void> {
    await this.bikeFrameNumberField.fill(frameNumber);
    await this.bikeFrameNumberField.press('Enter');
  }

  async selectBikeBrand(brand: RegExp): Promise<void> {
    await this.bikeBrandSelector.click();
    const option = this.bikeBrandSelector.getByText(brand);
    await option.click();
  }

  async selectBikeType(type: RegExp): Promise<void> {
    await this.bikeTypeSelector.click();
    const option = this.bikeTypeSelector.getByText(type);
    await option.click();
  }
  async clickLockConfirmationCheckbox(): Promise<void> {
    await this.lockConfirmationCheckbox.click();
  }
}
