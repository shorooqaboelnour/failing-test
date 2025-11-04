# Alteos QA Automation Task

E2E test automation for E-Bike insurance product on Alteos sandbox environment.

## Prerequisites

- Node.js v18 or higher
- npm

## Installation

```bash
npm install
npx playwright install
```

## Running Tests

```bash
npm test              # Run all tests 
npm run test:headed  # Explicit headed mode
npm run test:ui      # Playwright UI mode
```

## Test Configuration

- **Base URL**: https://shop.sandbox.alteos.com
- **Browser**: Chromium (Desktop Chrome)
- **Mode**: Headed (visible browser)
- **Reports**: HTML reports, screenshots/videos on failure

## Project Structure

```
pages/              # Page Object Model
tests/              # Test files
utils/              # Flow utilities and test data
test-plan.md        # Test plan documentation
playwright.config.ts
package.json
```

## Test Cases

- **TC-001**: Product Discovery & Selection
- **TC-002**: Complete Purchase Journey (E2E)
- **TC-003**: Form Validation - Empty Required Fields

See `test-plan.md` for detailed test documentation.

## View Test Results

```bash
npx playwright show-report
```
