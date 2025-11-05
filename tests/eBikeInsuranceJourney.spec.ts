import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/shopHomePage.page';
import { EbikePage } from '../pages/ebikePage.page';
import { PaymentPage } from '../pages/paymentPage.page';
import { ConfirmationPage } from '../pages/confirmationPage.page';
import { QuoteContinuePage } from '../pages/quoteContinuePage.page';
import { QuoteStartPage } from '../pages/quoteStartPage.page';
import { BikeDetailsPage } from '../pages/bikeDetailsPage.page';
import { UserDetailsPage } from '../pages/userDetailsPage.page';
import { AddonConfirmationPage } from '../pages/addonConfirmationPage.page';
import { Data } from '../utils/test-data';

test.describe('E-Bike Insurance Journey', () => {
  test('TC-001: Successful E-Bike Product Selection', async ({ page }) => {
    const homePage = new HomePage(page);
    const ebikePage = new EbikePage(page);
    await homePage.navigate('/');
    await homePage.closeCookiesBanner();
    await homePage.verifyPageLoaded(homePage.ebikeProductCards);
    await homePage.clickEbikeProductCard();
    await ebikePage.verifyPageLoaded(ebikePage.completeNowButton);
  });

  test('TC-002: Complete E-Bike Insurance Purchase Journey to Success Page', async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const quoteStartPage = new QuoteStartPage(page);
    const quoteContinuePage = new QuoteContinuePage(page);
    const bikeDetailsPage = new BikeDetailsPage(page);
    const addonConfirmationPage = new AddonConfirmationPage(page);
    const ebikePage = new EbikePage(page);
    const paymentPage = new PaymentPage(page);
    const confirmationPage = new ConfirmationPage(page);
    const userDetailsPage = new UserDetailsPage(page);

    await homePage.navigate('/');
    await homePage.closeCookiesBanner();
    await homePage.verifyPageLoaded(homePage.ebikeProductCards);
    await homePage.clickEbikeProductCard();
    await ebikePage.verifyPageLoaded(ebikePage.completeNowButton);
    await ebikePage.clickCompleteNowButton();
    await quoteStartPage.selectPriceRange(Data.priceRange);
    await quoteStartPage.fillPurchaseDate(Data.dates.kaufdatum);
    await quoteStartPage.clickSubmitButton();
    await quoteContinuePage.selectTheftProtectionCoverageType();
    await quoteContinuePage.clickSubmitButton();
    await bikeDetailsPage.selectBikeBrand(Data.bike.brand);
    await bikeDetailsPage.fillFrameNumber(Data.bike.frame);
    await bikeDetailsPage.selectBikeType(Data.bike.type);
    await bikeDetailsPage.clickLockConfirmationCheckbox();
    await bikeDetailsPage.clickSubmitButton();
    await addonConfirmationPage.clickAddonConfirmationCheckbox();
    await addonConfirmationPage.clickGpsPermissionCheckbox();
    await addonConfirmationPage.clickSubmitButton();
    await userDetailsPage.fillFirstName(Data.user.firstName);
    await userDetailsPage.fillLastName(Data.user.lastName);
    await userDetailsPage.fillDateOfBirth(Data.user.dateOfBirth);
    await userDetailsPage.clickManualAddressCheckbox();
    await userDetailsPage.fillZipCode(Data.user.zipCode);
    await userDetailsPage.fillCity(Data.user.city);
    await userDetailsPage.fillStreet(Data.user.street);
    await userDetailsPage.fillHouseNumber(Data.user.houseNumber);
    await userDetailsPage.fillEmail(Data.user.email);
    await userDetailsPage.fillEmailConfirmation(Data.user.email);
    await userDetailsPage.clickSubmitButton();
    await paymentPage.selectPaymentMethod();
    await paymentPage.fillIBAN(Data.payment.IBAN);
    await paymentPage.fillFirstName(Data.payment.firstName);
    await paymentPage.fillLastName(Data.payment.lastName);
    await paymentPage.clickPaymentPermissionCheckbox();
    await paymentPage.clickTermsAcceptanceCheckbox();
    await paymentPage.clickResidenceConfirmationCheckbox();
    await paymentPage.clickSubmitPaymentButton();
    await confirmationPage.verifyConfirmationPageLoaded();
  });

  test('TC-003: Form Validation - Empty Required Fields', async ({ page }) => {
    const homePage = new HomePage(page);
    const ebikePage = new EbikePage(page);
    await homePage.navigate('/');
    await homePage.closeCookiesBanner();
    await homePage.verifyPageLoaded(homePage.ebikeProductCards);
    await homePage.clickEbikeProductCard();
    await ebikePage.verifyPageLoaded(ebikePage.completeNowButton);
    await ebikePage.clickCompleteNowButton();
  });
});
