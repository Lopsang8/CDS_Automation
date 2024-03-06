describe("Permissions", () => {
  beforeEach(() => {
    cy.viewports(1920, 1080);
    cy.login('lopsang@supportwebo.onmicrosoft.com', '>H^|u:~IwBF7L1{_e15')
    cy.wait(3000)
    cy.visit("/permissions/groups");
    cy.get("#headlessui-tabs-tab-\\:r3\\:")
      .invoke("removeAttr", "target")
      .click();
    cy.wait(3000);
    cy.get('.pemission-details').should("be.visible")
  });

  it("Verifies permissions edit page", () => {
    cy.get(':nth-child(1) > :nth-child(4) > .actions')
      .contains("Edit")
      .click({ force: true });
    cy.log("Edit button clicked");
    cy.get('.text-2xl').should("have.text", "Edit A Permission");
    cy.get('.border-b')
    .should("be.visible")
    cy.get('.edit-a-permission > :nth-child(1) > :nth-child(2)').should('be.visible')
  });


  it("Verifies permissions edit page view and function name to be present", () => {
    cy.get(':nth-child(1) > :nth-child(4) > .actions')
      .contains("Edit")
      .click({ force: true });
    cy.get(".function").should("contain", "Function");
    cy.get('.function > div > .text-lg').should("be.visible");
    cy.log("Function name is present");
    cy.get('.col-span-3 > div > .w-full')
      .should("be.visible")
      .click()
      .clear()
      .type(
        "This is an automation test to edit permissions and test the descriptions."
      );
    cy.get(".edit-a-permission > :nth-child(1) > :nth-child(2)").should(
      "be.visible"
    );
    cy.log("Assigned to this permission section is present");
    cy.get("#headlessui-tabs-tab-\\:r7\\:")
      .invoke("removeAttr", "target")
      .click();
    cy.log("Users tab is present and clicked");
    cy.get(".table-wrap thead > tr > :nth-child(n)").should("have.length", 6);
    cy.log(`Total number of columns: 6`);
    cy.get(".bg-success-500").should("exist").click();
    cy.wait(2000);
    cy.assertToastMessage("Successfully updated the permissions");
  });
});
