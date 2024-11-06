import { fa, faker } from "@faker-js/faker";
describe("Location settings", () => {
  beforeEach(() => {
    cy.login("");
    cy.wait(2000);
    cy.UpdateRefreshButton();
    cy.wait(2000);
    cy.visit("/locations");
    cy.get(":nth-child(1) > :nth-child(5) > .actions")
      .contains("Settings")
      .click({ force: true });
    cy.log("Location options are present");
    // cy.get(':nth-child(1) > :nth-child(5) > .actions > .fixed > :nth-child(2)').should("be.visible").click();
  });

  it("Verifies location setting option and its Prices/Limits form validation", () => {
    cy.log("Location settings option is present and clicked");
    cy.get(".location-setting-price > .bg-danger-0").should("be.visible");
    cy.log("Location settings form is present");
    cy.get(".text-neutral-600").should("have.text", "Local Settings");
    cy.log("Location settings form title is present");
    cy.get("#eftpos_transaction_limit").click().type("0");
    cy.errorMessage(" EFTPOS transaction limit must be greater than 0 *");
    cy.get("#eftpos_daily_machine_limit").click().type("0");
    cy.errorMessage(
      " EFTPOS transaction limit must be greater than 0 * EFTPOS daily machine limit must be a number greater than 0 *"
    );
    cy.get("#cds_tag_transaction_limit").click().type("0");
    cy.errorMessage(
      " EFTPOS transaction limit must be greater than 0 * EFTPOS daily machine limit must be a number greater than 0 * CDS tag transaction limit  must be a number greater than 0 *"
    );
    cy.log("Prices/Limits form validation is verified");
  });



  it("Verifies that bank details can be filled without validation errors", () => {
    cy.get("#headlessui-tabs-tab-\\:r3\\:") // Click on the Bank Details tab
      .click();

    cy.log("Bank details tab is present and clicked");

    // Use Faker to generate random values for the bank details
    cy.get("#bank_code").clear().type(faker.random.alphaNumeric(20)); // Random bank code
    cy.get("#bank_user_name").clear().type(faker.company.name()); // Random company name
    cy.get("#bank_user_number").clear().type(faker.random.alphaNumeric(10)); // Random user number

    // Initialize the variable to determine whether to fill the bank file sequence
    const shouldFillBankFileSequence = faker.datatype.boolean();

    // Clear the bank file sequence field before typing
    cy.get("#bank_file_sequence").clear();

    // Conditional logic for bank file sequence
    if (shouldFillBankFileSequence) {
      // Generate a valid number between 0 and 100
      const bankFileSequenceValue = faker.datatype.number({ min: 0, max: 100 });
      cy.get("#bank_file_sequence").type(bankFileSequenceValue.toString());
      cy.log(
        `Bank file sequence must be a number between 0 and 100 *: ${bankFileSequenceValue}`
      );
    } else {
      // Optionally leave it blank or fill with an invalid value
      if (faker.datatype.boolean()) {
        cy.log("Leaving bank file sequence blank");
      } else {
        const invalidValue = faker.datatype.number({ min: 101 }); // Invalid value greater than 100
        cy.get("#bank_file_sequence").type(invalidValue.toString());
        cy.log(
          `Filling bank file sequence with an invalid value: ${invalidValue}`
        );
      }
    }
    cy.get("#bank_account_bsb")
      .clear()
      .type(faker.number.int({ min: 100000, max: 999999 }).toString()); // Random 6-digit BSB
    cy.get("#bank_account_number").clear().type(faker.finance.account(9)); // Random 9-digit account number

    // Confirm that there are no validation error messages displayed
    cy.get(".error-message-selector") // Replace with the actual selector for error messages
      .should("not.exist");

    cy.log("No validation errors are displayed after filling bank details");

    // Clear and fill bank file sequence again to validate the final test
    cy.get("#bank_file_sequence")
      .clear()
      .type(faker.datatype.number({ min: 0, max: 100 }).toString());

    // Verify that the "Save And Update" button is visible and click it
    cy.contains("button", "Save And Update")
      .should("be.visible")
      .then(() => {
        cy.log('The "Save And Update" button is visible');
      });

    cy.get("button.bg-success-500.text-danger-0").click(); // CLick on save and update button
  });




  it("Verifies Payment Bank Details form validation", () => {
    // Click on the Payment Bank Details tab
    cy.get("#headlessui-tabs-tab-\\:r4\\:").should("be.visible").click();

    cy.get(".font-bold > .inline-block > .gap-x-2")
      .should("be.visible")
      .then(($el) => {
        const text = $el.text().toLowerCase();

        if (text.includes("dev") || text.includes("test")) {
          cy.log("Environment: Dev/Test");

          // Clear and then enter static values for Dev/Test
          cy.get("#cash").clear().type("E02");
          cy.get("#ecd").clear().type("E02");
          cy.get("#eftpos").clear().type("B04");
          cy.get("#eft_request").clear().type("B01");
        } else {
          cy.log("Environment: Live");

          // Clear and then enter static values for Live
          cy.get("#cash").clear().type("E02- NEW");
          cy.get("#ecd").clear().type("E02- NEW");
          cy.get("#eft_request").clear().type("B01");

          // Ensure you target an input field if available instead of using ".bg-danger-0 > :nth-child(4)"
          cy.get("input.selector-for-input").clear().type("B04");
        }
      });

    // Click submit button
    cy.get(":nth-child(2) > .gap-x-2").click();

    // Check the toast message and assert its content
    cy.assertToastMessage("Location settings updated successfully");
  });

});

