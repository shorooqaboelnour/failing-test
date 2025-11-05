import { BasePage } from './BasePage.page';

export class UserDetailsPage extends BasePage {
  get firstNameField() {
    return this.page
      .getByTestId('input-wrapper-customer_firstName')
      .locator('input');
  }

  get lastNameField() {
    return this.page
      .getByTestId('input-wrapper-customer_lastName')
      .locator('input');
  }

  get dateOfBirthField() {
    return this.page
      .getByTestId('input-wrapper-customer_values_dateOfBirth')
      .locator('input');
  }

  get manualAddressCheckbox() {
    return this.page
      .getByTestId('input-wrapper-helpers_manualAddressOn')
      .locator('label');
  }

  get zipCodeField() {
    return this.page
      .getByTestId('input-wrapper-customer_values_addressPlz')
      .locator('input');
  }

  get cityField() {
    return this.page
      .getByTestId('input-wrapper-customer_values_addressCity')
      .locator('input');
  }

  get streetField() {
    return this.page
      .getByTestId('input-wrapper-customer_values_addressStreet')
      .locator('input');
  }

  get houseNumberField() {
    return this.page
      .getByTestId('input-wrapper-customer_values_addressHouseNumber')
      .locator('input');
  }

  get emailField() {
    return this.page
      .getByTestId('input-wrapper-customer_email')
      .locator('input');
  }

  get emailConfirmationField() {
    return this.page
      .getByTestId('input-wrapper-helpers_emailConfirmation')
      .locator('input');
  }

  get phoneNumberField() {
    return this.page
      .getByTestId('input-wrapper-customer_phoneNumber')
      .locator('input');
  }

  async fillFirstName(firstName: string): Promise<void> {
    await this.firstNameField.fill(firstName);
  }
  async fillLastName(lastName: string): Promise<void> {
    await this.lastNameField.fill(lastName);
  }
  async fillEmail(email: string): Promise<void> {
    await this.emailField.fill(email);
  }
  async fillPhoneNumber(phoneNumber: string): Promise<void> {
    await this.phoneNumberField.fill(phoneNumber);
  }

  async fillDateOfBirth(dateOfBirth: string): Promise<void> {
    await this.dateOfBirthField.fill(dateOfBirth);
  }
  async clickManualAddressCheckbox(): Promise<void> {
    await this.manualAddressCheckbox.click();
  }
  async fillHouseNumber(houseNumber: string): Promise<void> {
    await this.houseNumberField.fill(houseNumber);
  }
  async fillStreet(street: string): Promise<void> {
    await this.streetField.fill(street);
  }
  async fillCity(city: string): Promise<void> {
    await this.cityField.fill(city);
  }
  async fillZipCode(zipCode: string): Promise<void> {
    await this.zipCodeField.fill(zipCode);
  }

  async fillEmailConfirmation(emailConfirmation: string): Promise<void> {
    await this.emailConfirmationField.fill(emailConfirmation);
  }

  async clickSubmitButton(): Promise<void> {
    await this.submitButton.click();
  }
}
