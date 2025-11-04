# Test Plan: E-Bike Insurance Product

## Overview

E2E test plan for the E-Bike insurance product on Alteos sandbox environment. This plan focuses on critical business scenarios that ensure the purchase journey works correctly and meets business requirements.

**Application URL:** https://shop.sandbox.alteos.com  
**Test Framework:** Playwright + TypeScript  
**Approach:** Page Object Model  
**Implemented Tests:** 3

---

## Test Strategy

### Test Coverage Focus
The test suite prioritizes:
1. **Critical Business Path** - Complete purchase journey (revenue impact)
2. **User Experience** - Product discovery and navigation
3. **Data Integrity** - Form validation and error handling
4. **Payment Processing** - Transaction success and failure scenarios

### Risk-Based Approach
Tests are prioritized based on:
- **Business Impact:** Revenue-generating flows get highest priority
- **User Impact:** High-traffic user journeys
- **Data Risk:** Critical data validation and payment processing
- **Regulatory:** Compliance requirements (validation, error handling)

---

## Test Scenarios

| ID | Test Scenario | Business Value | Priority | Status |
|----|---------------|----------------|----------|--------|
| **TC-001** | Product Discovery & Selection | Ensures users can find and select E-Bike product | High | Implemented |
| **TC-002** | Complete Purchase Journey | Validates end-to-end revenue path | Critical | Implemented |
| **TC-003** | Form Validation & Error Handling | Prevents invalid data submission | High | Implemented |
| TC-004 | Payment Validation | Ensures payment security and data integrity | Critical | Planned |
| TC-005 | Payment Failure Handling | Validates error recovery and user experience | High | Planned |
| TC-006 | Quote Accuracy & Pricing | Verifies correct pricing calculation | Critical | Planned |
| TC-007 | Policy Generation & Confirmation | Ensures policy creation and delivery | Critical | Planned |
| TC-008 | Date Validation & Business Rules | Validates insurance dates are logical and valid | High | Planned |
| TC-009 | Email Confirmation Matching | Ensures email repeat validation works | High | Planned |
| TC-010 | Data Persistence Across Steps | Validates data is preserved when navigating back/forward | High | Planned |
| TC-011 | Multiple Price Tier Selection | Validates pricing logic across different price brackets | High | Planned |
| TC-012 | Address Autocomplete Edge Cases | Validates address handling when autocomplete fails | Medium | Planned |
| TC-013 | Payment Method Selection | Validates multiple payment options work correctly | Medium | Planned |
| TC-014 | Payment Form Field Validation | Validates payment form inputs (CVV, expiry, etc.) | High | Planned |

**Total:** 14 scenarios | **Implemented:** 3 (TC-007 covered by TC-002) | **Planned:** 10

---

## Test Case Details

### TC-001: Product Discovery & Selection

**Name:** Successful E-Bike Product Selection

**Description:**  
Validates the product discovery flow from homepage to product detail page. This is the entry point for all E-Bike insurance purchases and must work flawlessly to capture user interest.

**Business Rationale:**  
If users cannot find or select the E-Bike product, the entire sales funnel is broken. This test ensures the first touchpoint with potential customers functions correctly.

**Expected Outcome:**
- Homepage loads successfully
- Cookie consent is handled appropriately
- E-Bike product cards are visible and accessible
- Product selection navigates correctly to product page
- Product page loads with all key elements (CTA buttons visible)
- No errors or broken functionality

**Test Steps:**
1. Navigate to homepage
2. Handle cookie banner
3. Verify E-Bike product cards visible
4. Click product card
5. Verify navigation to product page
6. Verify "Complete Now" button visible

---

### TC-002: Complete Purchase Journey

**Name:** Complete E-Bike Insurance Purchase Journey

**Description:**  
End-to-end validation of the complete purchase flow from product selection through to purchase confirmation. This is the critical revenue path and validates the entire user journey, data flow, and business logic.

**Business Rationale:**  
This is the money-making path. Any failure here directly impacts revenue. The test validates quote calculation, data persistence, payment processing, and policy generation - all critical business functions.

**Expected Outcome:**
- Complete journey from homepage to confirmation executes successfully
- Quote form accepts and validates user inputs (price tier, dates)
- Bike information is captured correctly (brand, frame number)
- User personal data is collected and validated (name, DOB, address, email)
- Pricing page displays correct quote with "Ihr Angebot" title
- Payment page processes transaction correctly with "Zahlungsweise" title
- Confirmation page displays success with policy information
- All data flows correctly through the system
- No data loss or corruption during the journey

**Test Data:**
- Price tier: `bis 3.500,00 €`
- Purchase date: `02.11.2025`
- Insurance start: `01.12.2025`
- Bike brand: `Achiever`
- Frame number: `1000000`
- User: Shorooq Hasan, DOB 12.01.1994, Berlin address

**Coverage Areas:**
- Quote form validation
- Data persistence across steps
- Pricing calculation
- Payment processing
- Policy generation
- Confirmation delivery

---

### TC-003: Form Validation & Error Handling

**Name:** Form Validation - Empty Required Fields

**Description:**  
Validates that the application form properly enforces required field validation and provides appropriate user feedback when validation fails. This prevents invalid data from entering the system and ensures good user experience.

**Business Rationale:**  
Invalid data can cause downstream issues (billing errors, policy problems, customer service issues). This test ensures data quality at the point of entry and validates that users receive clear feedback when corrections are needed.

**Expected Outcome:**
- Form cannot be submitted with empty required fields
- Validation error is displayed OR form prevents navigation
- User receives clear feedback about missing information
- Form remains accessible for correction
- Error handling is user-friendly and actionable

**Test Steps:**
1. Navigate to application form
2. Attempt to submit without filling required fields
3. Verify validation prevents submission
4. Verify error messaging is clear and helpful

---

### TC-004: Payment Validation (Planned)

**Name:** Payment Validation - Invalid Card Number

**Description:**  
Validates payment form security and validation logic. Ensures invalid payment data is rejected before processing, protecting both the business and customer.

**Business Rationale:**  
Payment validation is critical for security, fraud prevention, and customer protection. Invalid payment attempts should be caught early with clear error messaging.

**Expected Outcome:**
- Invalid card numbers are rejected
- Clear error messages guide user correction
- No payment processing occurs with invalid data
- User can correct and retry

---

### TC-005: Payment Failure Handling (Planned)

**Name:** Payment Error Handling - Declined Transaction

**Description:**  
Validates system behavior when payment processing fails. Ensures users receive appropriate feedback and can retry or use alternative payment methods.

**Business Rationale:**  
Payment failures are common (declined cards, network issues, insufficient funds). The system must handle these gracefully without losing user data or creating frustration.

**Expected Outcome:**
- Payment failure is detected and communicated clearly
- User data is preserved during error
- User can retry payment or select alternative method
- Error does not corrupt the application state

---

### TC-013: Payment Method Selection (Planned)

**Name:** Payment Method Options - Card vs SEPA

**Description:**  
Validates that users can select between different payment methods (credit card, SEPA, bank transfer) and that each method works correctly with appropriate form fields.

**Business Rationale:**  
Different customers prefer different payment methods. Supporting multiple options increases conversion rates. Each payment method must work correctly to avoid lost sales.

**Expected Outcome:**
- All available payment methods are selectable
- Form fields update correctly based on selected payment method
- Card payment form displays when card is selected
- SEPA/bank transfer form displays when bank transfer is selected
- Payment processing works for each method

---

### TC-014: Payment Form Field Validation (Planned)

**Name:** Payment Form Validation - Card Details

**Description:**  
Validates that payment form fields (card number, CVV, expiry date, cardholder name) are properly validated. Ensures security and prevents invalid payment attempts.

**Business Rationale:**  
Invalid payment data can cause processing failures, security issues, and customer frustration. Proper validation prevents these issues at the point of entry.

**Expected Outcome:**
- Invalid card numbers are rejected
- Invalid CVV codes are rejected
- Expired or invalid expiry dates are rejected
- Cardholder name validation works correctly
- Clear error messages guide correction
- Form prevents submission with invalid data

---

### TC-006: Quote Accuracy & Pricing (Planned)

**Name:** Quote Calculation Accuracy

**Description:**  
Validates that insurance quotes are calculated correctly based on user inputs (bike value, dates, coverage options). Ensures pricing accuracy for business compliance and customer trust.

**Business Rationale:**  
Incorrect pricing can lead to revenue loss, customer disputes, and regulatory issues. Quote accuracy is fundamental to the insurance business model.

**Expected Outcome:**
- Quote reflects correct price based on inputs
- Price calculation logic is accurate
- Pricing is displayed clearly and correctly formatted
- Quote matches expected business rules

---

### TC-007: Policy Generation & Confirmation (Planned)

**Name:** Policy Number Verification on Confirmation

**Description:**  
Validates that a policy is successfully generated and the policy number is displayed correctly on the confirmation page. This ensures the purchase is complete and the customer has proof of purchase.

**Business Rationale:**  
Policy generation is the final step in the purchase journey. Without a valid policy number, the customer has no proof of insurance, which is a critical business failure.

**Expected Outcome:**
- Policy is generated successfully
- Policy number is displayed on confirmation page
- Policy number format is correct
- Customer can reference policy number for support

---

### TC-008: Date Validation & Business Rules (Planned)

**Name:** Date Validation - Insurance Start Date Logic

**Description:**  
Validates that insurance business rules are enforced for dates. Insurance start date should be after purchase date, and dates should be in valid format and range.

**Business Rationale:**  
Invalid date logic can create policy issues (e.g., insurance starting before purchase, or impossible dates). This ensures compliance with insurance business rules and prevents policy errors.

**Expected Outcome:**
- Insurance start date must be after purchase date
- Invalid date formats are rejected
- Past dates are handled appropriately
- Date validation errors are clear and actionable

---

### TC-009: Email Confirmation Matching (Planned)

**Name:** Email Validation - Email Repeat Matching

**Description:**  
Validates that the email confirmation field matches the primary email field. This prevents typo errors that could prevent policy delivery or communication.

**Business Rationale:**  
Email typos can prevent policy delivery, customer communication, and lead to customer service issues. Email matching ensures data quality and customer communication.

**Expected Outcome:**
- Mismatched emails are rejected
- Clear error message when emails don't match
- User can correct and resubmit
- Form validation prevents progression with mismatched emails

---

### TC-010: Data Persistence Across Steps (Planned)

**Name:** Data Persistence - Form Data Retention

**Description:**  
Validates that user-entered data is preserved when navigating between form steps or if the session is interrupted. This ensures users don't lose their progress.

**Business Rationale:**  
Losing user data during form filling leads to frustration and abandoned purchases. Data persistence improves user experience and conversion rates.

**Expected Outcome:**
- Form data is preserved when navigating between steps
- Data persists if page is refreshed (if implemented)
- User can navigate back and forward without data loss
- Form state is maintained correctly

---

### TC-011: Multiple Price Tier Selection (Planned)

**Name:** Price Tier Variations - Different Price Brackets

**Description:**  
Validates that pricing logic works correctly across different price tiers (e.g., bis 3.500€, bis 5.000€, etc.). Ensures quote calculation is accurate for all price ranges.

**Business Rationale:**  
Different customers have bikes in different price ranges. Pricing logic must work correctly for all tiers to ensure accurate quotes and prevent revenue loss.

**Expected Outcome:**
- All available price tiers are selectable
- Quote calculation is accurate for each price tier
- Pricing reflects correct tier selection
- No calculation errors across different tiers

---

### TC-012: Address Autocomplete Edge Cases (Planned)

**Name:** Address Handling - Autocomplete Failure Scenarios

**Description:**  
Validates address input handling when autocomplete doesn't provide suggestions or when user enters address manually. Ensures the form works in all address input scenarios.

**Business Rationale:**  
Not all addresses will autocomplete (invalid addresses, new addresses, international addresses). The form must handle these cases gracefully to prevent user frustration.

**Expected Outcome:**
- Form accepts manual address entry when autocomplete fails
- User can proceed without autocomplete suggestions
- Address validation works for manual entries
- No errors when autocomplete is unavailable

---

## Implementation Details

### Test Architecture
- **Page Object Model:** Maintainable, reusable page objects
- **Flow Utilities:** Reusable functions for common journeys
- **Test Data:** Centralized data management
- **Error Handling:** Robust waits and error recovery

### Test Structure
**File:** `tests/eBikeInsuranceJourney.spec.ts`

**Page Objects:**
- `HomePage` - Homepage navigation and product selection
- `EbikePage` - Product page interactions
- `QuoteContinuePage` - Quote continuation handling
- `ApplicationFormPage` - Form validation and submission
- `PricingPage` - Pricing verification
- `PaymentPage` - Payment processing
- `ConfirmationPage` - Purchase confirmation

**Flow Utilities (`utils/flow.ts`):**
- `enterSellingFlowFromEbike()` - Entry point handling
- `fillQuoteStart()` - Quote form completion
- `fillBikeDetails()` - Bike information capture
- `fillUserDetails()` - Personal data collection

### Test Data Management
Centralized in `utils/test-data.ts` for maintainability and consistency.

---

## Running Tests

```bash
npm test             # Run all tests (headed mode)
npm run test:headed  # Explicit headed mode
npm run test:ui      # Playwright UI mode (debugging)
```

View reports:
```bash
npx playwright show-report
```

---

## Configuration

- **Base URL:** https://shop.sandbox.alteos.com
- **Browser:** Chromium (Desktop Chrome)
- **Mode:** Headed (visible browser for debugging)
- **Reports:** HTML, screenshots/videos on failure
- **Retries:** 0 locally, 2 in CI

---

## Design Decisions

### Selector Strategy
Using `data-test` attributes where available for stability. Role-based selectors for accessibility and semantic meaning.

### Test Approach
- **Focused Coverage:** Tests cover critical business paths, not every edge case
- **Risk-Based:** Higher priority on revenue-impacting scenarios
- **Maintainable:** Clean code structure with reusable components
- **Observable:** Proper waits and error handling for reliability

### Quality Standards
- Tests are independent and can run in any order
- Proper error handling and recovery
- Clear test data and assertions
- Comprehensive coverage of critical paths

---

## Coverage Summary

**Implemented Coverage:**
- Product discovery and selection (user acquisition)
- Complete purchase journey (revenue path)
- Form validation (data quality)
- Quote form filling
- Bike details capture
- User information collection
- Pricing verification
- Payment processing
- Confirmation verification

**Coverage Gaps (Planned):**
- Payment validation scenarios
- Payment error recovery
- Quote calculation verification
- Policy generation validation
- Date business rules validation
- Email matching validation
- Data persistence validation

**Additional Considerations (Future):**
- Cross-browser compatibility (Firefox, Safari)
- Mobile viewport testing
- Performance testing (page load times, form responsiveness)
- Accessibility testing (WCAG compliance)
- API integration testing (backend validation)
- Security testing (data encryption, payment security)
- Load testing (concurrent users)

The current test suite provides solid coverage of the critical purchase journey. Remaining scenarios will be added based on business priorities and risk assessment. The focus is on ensuring the core revenue path works flawlessly while maintaining data quality and user experience.
