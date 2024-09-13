describe("Location settings", () => {


  beforeEach(() => {
    cy.login('')
    cy.wait(2000)
    cy.UpdateRefreshButton()
    cy.wait(2000)
    cy.visit("/locations");
    cy.get(":nth-child(1) > :nth-child(5) > .actions")
      .contains("Settings")
      .click({ force: true });
      cy.log("Location options are present")
    // cy.get(':nth-child(1) > :nth-child(5) > .actions > .fixed > :nth-child(2)').should("be.visible").click();
  });



  it("Verifies that location settings can be added", () => {
    cy.get(".location-setting-price > .bg-danger-0").should("be.visible");
    cy.get(".text-neutral-600").should("have.text", "Local Settings");
    cy.get("#headlessui-tabs-tab-\\:r3\\:")
      .invoke("removeAttr", "target")
      .click();
    cy.log("Bank details tab is present and clicked");
    cy.get('#bank_code').clear().type('WBC')
    cy.get('#bank_user_name').clear().type('Sell and Parker Pty. Ltd.')
    cy.get('#bank_user_number').clear().type('89886')
    cy.get('#bank_file_sequence').clear().type('2')
    cy.get('#bank_account_bsb').clear().type('032010')
    cy.get('#bank_account_number').clear().type('820455')
    cy.get('.bg-success-500').click()
    cy.assertToastMessage("Location settings updated successfully")
  })



  it("Verifies location setting option and its Prices/Limits form validation", () => {
    cy.log("Location settings option is present and clicked");
    cy.get(".location-setting-price > .bg-danger-0").should("be.visible");
    cy.log("Location settings form is present");
    cy.get(".text-neutral-600").should("have.text", "Local Settings");
    cy.log("Location settings form title is present");
    cy.get("#eftpos_transaction_limit").click().type('adfsasd');
    cy.errorMessage(' EFTPOS transaction limit must be a number *'
    );
    cy.get("#eftpos_daily_machine_limit").click().type('adfsasd')
    cy.errorMessage(
      ' EFTPOS daily machine limit must be a number greater than 0 *'
    );
    cy.get("#cds_daily_cash_payment_limit").click().type('adfsasd')
    cy.errorMessage(
      ' CDS daily cash payment limit must be a number greater than 0 *'
    );
    cy.get("#cds_tag_transaction_limit").click().type('adfsasd')
    cy.errorMessage(
      ' CDS tag transaction limit  must be a number greater than 0 *'
    );
    cy.log("Prices/Limits form validation is verified");
  });


  it("Verifies Bank Details form validation", () => {
    cy.get("#headlessui-tabs-tab-\\:r3\\:")
      .invoke("removeAttr", "target")
      .click();
    cy.log("Bank details tab is present and clicked");
    cy.get('#bank_code').click().clear();
    cy.errorMessage(
      " Bank code is required"
    );
    cy.get('#bank_user_name').click().clear();
    cy.errorMessage(
      " Bank code is required Bank user number is required"
    );
    cy.get('#bank_user_number').click().clear();
    cy.errorMessage(
      " Bank code is required Bank user number is required Bank user number must be a number"
    );
    cy.get('#bank_file_sequence').click().clear();
    cy.errorMessage(
      " Bank code is required Bank user number is required Bank user number must be a number Bank file sequence must be a number between 0 to 99"
    );
    cy.get('#bank_account_bsb').click().clear();
    cy.errorMessage(
      " Bank code is required Bank user number is required Bank user number must be a number Bank file sequence must be a number between 0 to 99 Bank account BSB must be a number"
    );
    cy.get('#bank_account_number').click().clear();
    cy.errorMessage(
      " Bank code is required Bank user number is required Bank user number must be a number Bank file sequence must be a number between 0 to 99 Bank account BSB must be a number Bank accont number must be a number"
    );
    cy.log("Bank Details form validation is verified");

  });


});
