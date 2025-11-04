import { BasePage } from './BasePage.page';

export class EbikePage extends BasePage {
  get completeNowButton() {
    return this.page.locator('[data-test="section-hero-button-0"]');
  }

  async clickCompleteNowButton(): Promise<void> {
    await this.completeNowButton.click();
  }
}
