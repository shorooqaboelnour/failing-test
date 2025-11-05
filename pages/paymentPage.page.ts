import { BasePage } from './BasePage.page';

export class PaymentPage extends BasePage {
  get paymentMethodSelector() {
    return this.page.getByTestId('sepa');
  }

  get IBANField() {
    return this.page.getByTestId('input-wrapper-iban').locator('input');
  }

  get firstNameField() {
    return this.page
      .getByTestId('input-wrapper-customer.firstName')
      .locator('input');
  }

  get lastNameField() {
    return this.page
      .getByTestId('input-wrapper-customer.lastName')
      .locator('input');
  }

  get paymentPermissionCheckbox() {
    return this.page
      .getByTestId('input-wrapper-permissionGuaranteed')
      .locator('label');
  }

  get termsAcceptanceCheckbox() {
    return this.page.getByTestId('input-wrapper-termsRead').locator('label');
  }

  get residencyConfirmationCheckbox() {
    return this.page.getByTestId('input-wrapper-isResident').locator('label');
  }

  get submitPaymentButton() {
    return this.page.getByTestId('submit-payment-button');
  }

  async selectPaymentMethod(): Promise<void> {
    await this.paymentMethodSelector.click();
  }

  async fillIBAN(IBAN: string): Promise<void> {
    await this.IBANField.fill(IBAN);
  }

  async fillFirstName(firstName: string): Promise<void> {
    await this.firstNameField.fill(firstName);
  }

  async fillLastName(lastName: string): Promise<void> {
    await this.lastNameField.fill(lastName);
  }

  async clickPaymentPermissionCheckbox(): Promise<void> {
    await this.paymentPermissionCheckbox.click();
  }

  async clickTermsAcceptanceCheckbox(): Promise<void> {
    await this.termsAcceptanceCheckbox.click();
  }

  async clickResidenceConfirmationCheckbox(): Promise<void> {
    await this.residencyConfirmationCheckbox.click();
  }

  async clickSubmitPaymentButton(): Promise<void> {
    await this.submitPaymentButton.click();
  }
}
