import { BasePage } from './BasePage.page';
import { expect } from '@playwright/test';

export class AddonConfirmationPage extends BasePage {
  get addonConfirmationCheckbox() {
    return this.page.getByTestId('addons_gpsTracking');
  }

  get gpsPermissionCheckbox() {
    return this.page
      .getByTestId('input-wrapper-values_gpsPermissionCheck')
      .locator('label');
  }

  async clickAddonConfirmationCheckbox(): Promise<void> {
    await this.addonConfirmationCheckbox.click();
  }

  async clickGpsPermissionCheckbox(): Promise<void> {
    await this.gpsPermissionCheckbox.click();
  }
}
