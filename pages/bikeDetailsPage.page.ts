import { BasePage } from './BasePage.page';
import { Page } from '@playwright/test';

export class BikeDetailsPage extends BasePage {
  async selectBikeType(bikeType: RegExp): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
    
    // Try XPath first (most specific)
    let typeFieldClicked = false;
    try {
      const xpathInput = this.page.locator('xpath=//html/body/div[1]/div[1]/div/section[1]/div[3]/form/div[1]/div[3]/span/div/div/div[1]/div[1]/div[2]/input');
      if (await xpathInput.count() > 0) {
        await xpathInput.waitFor({ state: 'visible', timeout: 5000 });
        await xpathInput.click();
        typeFieldClicked = true;
      }
    } catch (e) {
      // Try next approach
    }
    
    // If XPath didn't work, try data-test attribute
    if (!typeFieldClicked) {
      try {
        const typeContainer = this.page.locator('[data-test*="type"], [data-test*="Typ"]').first();
        if (await typeContainer.count() > 0) {
          await typeContainer.waitFor({ state: 'visible', timeout: 5000 });
          // Try SVG first (dropdown arrow)
          const svg = typeContainer.locator('svg').first();
          if (await svg.count() > 0) {
            await svg.click();
            typeFieldClicked = true;
          } else {
            // Try input directly
            const input = typeContainer.locator('input').first();
            if (await input.count() > 0) {
              await input.click();
              typeFieldClicked = true;
            }
          }
        }
      } catch (e) {
        // Try next approach
      }
    }
    
    // If still not clicked, try by role
    if (!typeFieldClicked) {
      try {
        const combobox = this.page.getByRole('combobox', { name: /Typ/i });
        if (await combobox.count() > 0) {
          await combobox.waitFor({ state: 'visible', timeout: 5000 });
          await combobox.click();
          typeFieldClicked = true;
        }
      } catch (e) {
        // Continue anyway
      }
    }
    
    // Wait for dropdown options to appear
    await this.page.waitForTimeout(1500);
    
    // Select the option
    const option = this.page.getByRole('option', { name: bikeType });
    await option.waitFor({ state: 'visible', timeout: 10000 });
    await option.click();
    await this.page.waitForTimeout(800);
    
    // Close dropdown
    await this.page.locator('body').click({ position: { x: 0, y: 0 } });
    await this.page.waitForTimeout(500);
  }

  async markFirstCheckbox(): Promise<void> {
    await this.page.waitForTimeout(500);
    const firstCheckbox = this.page.locator('input[type="checkbox"]').first();
    if (await firstCheckbox.count() > 0) {
      await firstCheckbox.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
      await firstCheckbox.check({ force: true });
      await this.page.waitForTimeout(500);
    }
  }

  async selectBikeBrand(brand: RegExp): Promise<void> {
    await this.page.waitForTimeout(500);
    const brandContainer = this.page.locator('[data-test="select-container-values_brand"]').first();
    await brandContainer.waitFor({ state: 'visible', timeout: 15000 });
    const svg = brandContainer.locator('svg').first();
    if (await svg.count() > 0) {
      await svg.click();
    } else {
      const input = brandContainer.locator('input').first();
      await input.click();
    }
    await this.page.waitForTimeout(800);
    const brandOption = this.page.getByRole('option', { name: brand });
    await brandOption.waitFor({ state: 'visible', timeout: 10000 });
    await brandOption.click();
    await this.page.waitForTimeout(500);
    await this.page.locator('body').click({ position: { x: 0, y: 0 } });
    await this.page.waitForTimeout(500);
  }

  async fillFrameNumber(frame: string): Promise<void> {
    await this.page.waitForTimeout(500);
    const frameInput = this.page.getByRole('textbox', { name: /Rahmennummer/i });
    await frameInput.waitFor({ state: 'visible', timeout: 15000 });
    await frameInput.fill(frame);
    await this.page.waitForTimeout(300);
  }

  async checkLockConfirmation(): Promise<void> {
    await this.page.waitForTimeout(500);
    const lockCheckbox = this.page.getByLabel(/Schloss.*45.*€/i);
    await lockCheckbox.waitFor({ state: 'visible', timeout: 15000 });
    await lockCheckbox.check({ force: true });
    await this.page.waitForTimeout(300);
  }

  async submit(): Promise<void> {
    await this.page.waitForTimeout(500);
    const submitButton = this.page.locator('[data-test="selling-flow-submit-button"]');
    await submitButton.waitFor({ state: 'visible', timeout: 15000 });
    await submitButton.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(300);
    await submitButton.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);
  }

  async fillBikeDetails(bikeType: RegExp, brand: RegExp, frame: string): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    await this.selectBikeType(bikeType);
    await this.markFirstCheckbox();
    await this.selectBikeBrand(brand);
    await this.fillFrameNumber(frame);
    await this.checkLockConfirmation();
    await this.submit();
  }
}

