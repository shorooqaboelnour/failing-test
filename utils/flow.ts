import { Page } from '@playwright/test';

export async function enterSellingFlowFromEbike(page: Page): Promise<void> {
  await page.locator('[data-test="section-hero-button-0"]').first().click();
  const consent = page.getByRole('link', { name: /Einverstanden/i });
  if (await consent.count()) await consent.click();
  await page.waitForLoadState('networkidle');
  
  if (/\/ebike\/quote-continue\b/.test(page.url())) {
    const continueButton = page.locator('button:has-text("Weiter"), [data-test="selling-flow-submit-button"]').first();
    await continueButton.waitFor({ state: 'visible' });
    await continueButton.click();
    await page.waitForLoadState('networkidle');
  }
}

export async function fillQuoteStart(page: Page, priceOption: RegExp, kaufdatum: string, versicherungsbeginn: string): Promise<void> {
  await page.waitForLoadState('networkidle');
  
  await page.locator('[data-test="select-container-values_price"] svg').click();
  await page.getByRole('option', { name: priceOption }).click();
  await page.locator('body').click({ position: { x: 0, y: 0 } });
  
  await page.getByRole('textbox', { name: /Kaufdatum/i }).fill(kaufdatum);
  await page.locator('body').click({ position: { x: 0, y: 0 } });

  await page.getByRole('textbox', { name: /Versicherungsbeginn/i }).fill(versicherungsbeginn);
  await page.locator('body').click({ position: { x: 0, y: 0 } });

  await page.locator('[data-test="selling-flow-submit-button"]').click();
  await page.waitForLoadState('networkidle');
}

export async function fillBikeDetails(page: Page, brand: RegExp, frame: string, bikeType?: RegExp): Promise<void> {
  await page.waitForLoadState('networkidle');
  
  if (bikeType) {
    const typeContainer = page.locator('[data-test*="select-container-values_type"], [data-test*="select-container-values_typ"]').first();
    if (await typeContainer.count() > 0) {
      await typeContainer.locator('svg').click();
      await page.getByRole('option', { name: bikeType }).click();
      await page.locator('body').click({ position: { x: 0, y: 0 } });
    }
  }
  
  await page.locator('[data-test="select-container-values_brand"] svg').click();
  await page.getByRole('option', { name: brand }).click();
  await page.locator('body').click({ position: { x: 0, y: 0 } });
  await page.getByRole('textbox', { name: /Rahmennummer/i }).fill(frame);
  await page.getByLabel(/Schloss.*45.*€/i).check();
  await page.locator('[data-test="selling-flow-submit-button"]').click();
}

export async function fillUserDetails(page: Page, first: string, last: string, dob: string, address: string, email: string): Promise<void> {
  await page.waitForLoadState('networkidle');
  await page.getByRole('textbox', { name: /Vorname/i }).fill(first);
  await page.getByRole('textbox', { name: /Nachname/i }).fill(last);
  await page.getByRole('textbox', { name: /Geburtsdatum/i }).fill(dob);
  await page.locator('body').click({ position: { x: 0, y: 0 } });
  
  await page.getByRole('textbox', { name: /Adresse/i }).fill(address);
  const suggestion = page.locator('[data-test="address-suggestion-0"]');
  if (await suggestion.count()) await suggestion.click();
  
  await page.getByRole('textbox', { name: /^E-Mail$/i }).fill(email);
  await page.getByRole('textbox', { name: /E-Mail wiederholen/i }).fill(email);
  await page.locator('[data-test="selling-flow-submit-button"]').click();
}
