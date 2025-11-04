import { BasePage } from './BasePage.page';

export class HomePage extends BasePage {
  get ebikeProductCards() {
    return this.page.locator('[data-test="ebike"]');
  }

  async clickEbikeProductCard(): Promise<void> {
    await this.ebikeProductCards.first().click();
  }

  async closeCookiesBanner(): Promise<void> {
    const cookieButton = this.page.locator('a.cookiebot-btn').getByText('Einverstanden').first();
    if (await cookieButton.isVisible().catch(() => false)) {
      await cookieButton.click();
    }
  }
}
