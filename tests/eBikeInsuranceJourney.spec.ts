import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/shopHomePage.page';
import { EbikePage } from '../pages/ebikePage.page';
import { ApplicationFormPage } from '../pages/applicationFormPage.page';
import { PricingPage } from '../pages/pricingPage.page';
import { PaymentPage } from '../pages/paymentPage.page';
import { ConfirmationPage } from '../pages/confirmationPage.page';
import { QuoteContinuePage } from '../pages/quoteContinuePage.page';
import { BikeDetailsPage } from '../pages/bikeDetailsPage.page';
import { AddonConfirmationPage } from '../pages/addonConfirmationPage.page';
import { Data } from '../utils/test-data';

test.describe('E-Bike Insurance Journey', () => {
  test('TC-001: Successful E-Bike Product Selection', async ({ page }) => {
    const homePage = new HomePage(page);
    const ebikePage = new EbikePage(page);
        await homePage.navigate('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    await homePage.closeCookiesBanner();
    
    await homePage.ebikeProductCards.first().waitFor({ state: 'visible', timeout: 15000 });
    await expect(homePage.ebikeProductCards.first()).toBeVisible();
    
    await homePage.clickEbikeProductCard();
    await page.waitForLoadState('networkidle');
        await expect(page).not.toHaveURL('https://shop.sandbox.alteos.com/');
    await ebikePage.completeNowButton.waitFor({ state: 'visible', timeout: 15000 });
    await expect(ebikePage.completeNowButton).toBeVisible();
  });

  test('TC-002: Complete E-Bike Insurance Purchase Journey to Success Page', async ({ page }) => {
    test.setTimeout(180000); // 3 minutes for this test
    const homePage = new HomePage(page);
    const quoteContinuePage = new QuoteContinuePage(page);
    const bikeDetailsPage = new BikeDetailsPage(page);
    const addonConfirmationPage = new AddonConfirmationPage(page);
    const pricingPage = new PricingPage(page);
    const paymentPage = new PaymentPage(page);
    const confirmationPage = new ConfirmationPage(page);
    
    await homePage.navigate('/');
    await homePage.closeCookiesBanner();
    await homePage.verifyPageLoaded(homePage.ebikeProductCards);
    await homePage.clickEbikeProductCard();
    
    await page.locator('[data-test="section-hero-button-0"]').first().click();
    const consent = page.getByRole('link', { name: /Einverstanden/i });
    if (await consent.count()) await consent.click();
    await page.waitForLoadState('networkidle');
    
    await page.waitForTimeout(500);
    if ((/\/ebike\/quote-continue\b/).test(page.url())) {
      await quoteContinuePage.selectQuoteAndContinue();
    } else {
    }
    
    // Fill quote start form
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    const priceSelector = page.locator('[data-test="select-container-values_price"] svg');
    await priceSelector.waitFor({ state: 'visible', timeout: 15000 });
    await priceSelector.click();
    await page.waitForTimeout(500);
    const priceOption = page.getByRole('option', { name: Data.priceTier });
    await priceOption.waitFor({ state: 'visible', timeout: 10000 });
    await priceOption.click();
    await page.locator('body').click({ position: { x: 0, y: 0 } });
    await page.waitForTimeout(500);
    
    const kaufdatumInput = page.getByRole('textbox', { name: /Kaufdatum/i });
    await kaufdatumInput.waitFor({ state: 'visible', timeout: 10000 });
    await kaufdatumInput.fill(Data.dates.kaufdatum);
    await page.locator('body').click({ position: { x: 0, y: 0 } });
    await page.waitForTimeout(500);
    
    const versicherungsbeginnInput = page.getByRole('textbox', { name: /Versicherungsbeginn/i });
    await versicherungsbeginnInput.waitFor({ state: 'visible', timeout: 10000 });
    await versicherungsbeginnInput.fill(Data.dates.versicherungsbeginn);
    await page.locator('body').click({ position: { x: 0, y: 0 } });
    await page.waitForTimeout(500);
    
    // Bulletproof submit button selector
    const submitSelectors = [
      '[data-test="selling-flow-submit-button"]',
      'button[data-test="selling-flow-submit-button"]',
      '[data-test*="submit-button"]',
      'button[data-test*="submit"]',
      'button[id*="submit"]',
      'button[type="submit"]'
    ];
    let submitClicked = false;
    for (const selector of submitSelectors) {
      try {
        const btn = page.locator(selector).first();
        if (await btn.count() > 0) {
          await btn.waitFor({ state: 'visible', timeout: 10000 });
          await btn.scrollIntoViewIfNeeded();
          await btn.click();
          submitClicked = true;
          break;
        }
      } catch (e) {
        continue;
      }
    }
    if (!submitClicked) {
      throw new Error('Could not find submit button');
    }
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Fill bike details
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    try {
      await bikeDetailsPage.fillBikeDetails(Data.bike.type, Data.bike.brand, Data.bike.frame);
    } catch (error) {
      console.error('Error filling bike details:', error);
      // Try again with more waits
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);
      await bikeDetailsPage.fillBikeDetails(Data.bike.type, Data.bike.brand, Data.bike.frame);
    }
    
    // Fill user details
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    const vornameInput = page.getByRole('textbox', { name: /Vorname/i });
    await vornameInput.waitFor({ state: 'visible', timeout: 10000 });
    await vornameInput.fill(Data.user.first);
    
    const nachnameInput = page.getByRole('textbox', { name: /Nachname/i });
    await nachnameInput.waitFor({ state: 'visible', timeout: 10000 });
    await nachnameInput.fill(Data.user.last);
    
    const dobInput = page.getByRole('textbox', { name: /Geburtsdatum/i });
    await dobInput.waitFor({ state: 'visible', timeout: 10000 });
    await dobInput.fill(Data.user.dob);
    await page.locator('body').click({ position: { x: 0, y: 0 } });
    await page.waitForTimeout(500);
    
    const addressInput = page.getByRole('textbox', { name: /Adresse/i });
    await addressInput.waitFor({ state: 'visible', timeout: 10000 });
    await addressInput.fill(Data.user.addressQuery);
    await page.waitForTimeout(1000);
    const suggestion = page.locator('[data-test="address-suggestion-0"]');
    if (await suggestion.count()) {
      await suggestion.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
      await suggestion.click();
    }
    await page.waitForTimeout(500);
    
    const emailInput = page.getByRole('textbox', { name: /^E-Mail$/i });
    await emailInput.waitFor({ state: 'visible', timeout: 10000 });
    await emailInput.fill(Data.user.email);
    
    const emailRepeatInput = page.getByRole('textbox', { name: /E-Mail wiederholen/i });
    await emailRepeatInput.waitFor({ state: 'visible', timeout: 10000 });
    await emailRepeatInput.fill(Data.user.email);
    
    // Bulletproof submit button selector
    const userSubmitSelectors = [
      '[data-test="selling-flow-submit-button"]',
      'button[data-test="selling-flow-submit-button"]',
      '[data-test*="submit-button"]',
      'button[data-test*="submit"]',
      'button[id*="submit"]',
      'button[type="submit"]'
    ];
    let userSubmitClicked = false;
    for (const selector of userSubmitSelectors) {
      try {
        const btn = page.locator(selector).first();
        if (await btn.count() > 0) {
          await btn.waitFor({ state: 'visible', timeout: 10000 });
          await btn.scrollIntoViewIfNeeded();
          await btn.click();
          userSubmitClicked = true;
          break;
        }
      } catch (e) {
        continue;
      }
    }
    if (!userSubmitClicked) {
      throw new Error('Could not find user form submit button');
    }
    await page.waitForLoadState('networkidle');
    
    await pricingPage.verifyPricingPageLoaded();
    await pricingPage.continueToPaymentButton.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    await pricingPage.clickContinueToPayment();
    
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(1000);
    
    if (/\/ebike\/addon-confirmation\b/.test(page.url())) {
      await addonConfirmationPage.verifyAddonConfirmationPageLoaded();
      await addonConfirmationPage.clickContinue();
      await page.waitForLoadState('networkidle').catch(() => {});
    }
    
    await paymentPage.verifyPaymentPageLoaded();
    await paymentPage.submitPaymentButton.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    await paymentPage.submitPayment();
    
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(2000);
    
    await confirmationPage.verifyConfirmationPageLoaded();
    const currentUrl = page.url();
    const isSuccessPage = currentUrl.match(/confirmation|success|complete|erfolg|bestätigung/i);
    const hasSuccessMessage = await confirmationPage.successMessage.isVisible().catch(() => false);
    expect(isSuccessPage || hasSuccessMessage).toBeTruthy();
  });


  test('TC-003: Form Validation - Empty Required Fields', async ({ page }) => {
    const homePage = new HomePage(page);
    const ebikePage = new EbikePage(page);
    const applicationFormPage = new ApplicationFormPage(page);
    
    await page.setViewportSize({ width: 1280, height: 720 });
    
    // Navigate to homepage
    await homePage.navigate('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    await homePage.closeCookiesBanner();
    
    // Wait for product cards to be visible
    await homePage.ebikeProductCards.first().waitFor({ state: 'visible', timeout: 15000 });
    await homePage.clickEbikeProductCard();
    await page.waitForLoadState('networkidle');
  
    // Wait for Complete Now button and click
    await ebikePage.completeNowButton.waitFor({ state: 'visible', timeout: 15000 });
    await ebikePage.clickCompleteNowButton();
    await page.waitForLoadState('networkidle');
    
    await applicationFormPage.verifyApplicationFormLoaded();
    const formUrl = page.url();
  
    await applicationFormPage.clickContinue();
    await page.waitForTimeout(2000);
    const hasError = await applicationFormPage.errorMessage.isVisible().catch(() => false);
    const stillOnFormPage = page.url() === formUrl;
    expect(hasError || stillOnFormPage).toBeTruthy();
  });
});
