import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/shopHomePage.page';
import { EbikePage } from '../pages/ebikePage.page';
import { ApplicationFormPage } from '../pages/applicationFormPage.page';
import { PricingPage } from '../pages/pricingPage.page';
import { PaymentPage } from '../pages/paymentPage.page';
import { ConfirmationPage } from '../pages/confirmationPage.page';
import { enterSellingFlowFromEbike, fillQuoteStart, fillBikeDetails, fillUserDetails } from '../utils/flow';
import { Data } from '../utils/test-data';

test.describe('E-Bike Insurance Journey', () => {
  test('TC-001: Successful E-Bike Product Selection', async ({ page }) => {
    const homePage = new HomePage(page);
    const ebikePage = new EbikePage(page);
    
    // Navigate to homepage
    await homePage.navigate('/');
    
    // Handle cookie consent banner
    await homePage.closeCookiesBanner();
    
    // Verify E-Bike product cards are visible
    await homePage.verifyPageLoaded(homePage.ebikeProductCards);
    await expect(homePage.ebikeProductCards.first()).toBeVisible();
    
    // Click on E-Bike product card
    await homePage.clickEbikeProductCard();
    
    // Verify navigation to E-Bike product page
    await expect(page).not.toHaveURL('https://shop.sandbox.alteos.com/');
    
    // Verify "Complete Now" button is visible on product page
    await ebikePage.verifyPageLoaded(ebikePage.completeNowButton);
    await expect(ebikePage.completeNowButton).toBeVisible();
  });

  test('TC-002: Complete E-Bike Insurance Purchase Journey to Success Page', async ({ page }) => {
    const homePage = new HomePage(page);
    const pricingPage = new PricingPage(page);
    const paymentPage = new PaymentPage(page);
    const confirmationPage = new ConfirmationPage(page);
    
    await homePage.navigate('/');
    await homePage.closeCookiesBanner();
    await homePage.verifyPageLoaded(homePage.ebikeProductCards);
    await homePage.clickEbikeProductCard();
    
    await enterSellingFlowFromEbike(page);
    await fillQuoteStart(page, Data.priceTier, Data.dates.kaufdatum, Data.dates.versicherungsbeginn);
      await fillBikeDetails(page, Data.bike.brand, Data.bike.frame, Data.bike.type);
    await fillUserDetails(page, Data.user.first, Data.user.last, Data.user.dob, Data.user.addressQuery, Data.user.email);
    
    await pricingPage.verifyPricingPageLoaded();
    await pricingPage.continueToPaymentButton.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    await pricingPage.clickContinueToPayment();
    
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(1000);
    
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
    
    await homePage.navigate('/');
    await homePage.closeCookiesBanner();
    await homePage.verifyPageLoaded(homePage.ebikeProductCards);
    await homePage.clickEbikeProductCard();
  
    await ebikePage.verifyPageLoaded(ebikePage.completeNowButton);
    await ebikePage.clickCompleteNowButton();
    
    await applicationFormPage.verifyApplicationFormLoaded();
    const formUrl = page.url();
  
    await applicationFormPage.clickContinue();
    await page.waitForTimeout(1000);
    const hasError = await applicationFormPage.errorMessage.isVisible().catch(() => false);
    const stillOnFormPage = page.url() === formUrl;
    expect(hasError || stillOnFormPage).toBeTruthy();
  });
});
