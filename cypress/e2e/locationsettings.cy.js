describe("Location settings", () => {


  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("/locations");
  });



  it("Verifies location setting option and its form validation", () => {
    cy.get(":nth-child(1) > :nth-child(5) > .actions")
      .should("be.visible")
      .click();
    cy.log("Location options are present");
    cy.get(".absolute > :nth-child(2)").should("be.visible").click();
    cy.log("Location settings option is present and clicked");
    cy.get(".location-setting-price > .bg-danger-0").should("be.visible");
    cy.log("Location settings form is present");
    cy.get(".text-neutral-600").should("have.text", "Local Settings");
    cy.log("Location settings form title is present");
    cy.get("#eftpos_transaction_limit").click().clear();
    cy.get(".error-message").should(
      "have.text",
      " EFTPOS transcation limit must be a number"
    );
    cy.get("#eftpos_daily_machine_limit").click().clear();
    cy.get(".error-message").should(
      "have.text",
      " EFTPOS transcation limit must be a number EFTPOS daily machine limit must be a number"
    );
    cy.get("#cds_daily_cash_payment_limit").click().clear();
    cy.get(".error-message").should(
      "have.text",
      " EFTPOS transcation limit must be a number EFTPOS daily machine limit must be a number CDS daily cash payment limit must be a number"
    );
    cy.get("#cds_tag_transaction_limit").click().clear();
    cy.get(".error-message").should(
      "have.text",
      " EFTPOS transcation limit must be a number EFTPOS daily machine limit must be a number CDS daily cash payment limit must be a number CDS tag transaction limit  must be a number"
    );
  });

  
});
