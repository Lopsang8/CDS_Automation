
describe("Add a User", () => {


  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("/users");
  });



  it("Verifies users list view and Add A User button", () => {
    cy.get(".gap-6 > :nth-child(1)").should("be.visible");
    cy.get(".gap-6 > :nth-child(2)").should("be.visible");
    cy.get('input[name="Search"]').should("be.visible");
    cy.get(".other-accessories > .gap-x-2").should("be.visible").click();
    cy.log("Users lists and Add A User button is present");
  });



  it("verifies add user page validations", () => {
    cy.get(".other-accessories > .gap-x-2").should("be.visible").click();
    cy.get(".bg-success-500").should("exist").click();
    cy.get(".error-message").should(
        "have.text",
        ' First Name is required * Last name is required * Email is required * Username is required * FOB ID is required * Designation is required *'
      );
    cy.log("All required fields validation is working");
  });



  it("verifies add user page has Locations and Permissions tab", () => {
    cy.get(".other-accessories > .gap-x-2").should("be.visible").click();
    cy.get('#headlessui-tabs-tab-\\:r1\\:').should('be.visible').click();
    cy.get('#headlessui-tabs-tab-\\:r2\\:').should('be.visible').click();
    cy.log("Locations and Permissions tab is present");
    cy.get('.filter-wrap > .bg-danger-0').should('be.visible')
    cy.get('.bg-primary-700').should('be.visible')
    


  });





});
