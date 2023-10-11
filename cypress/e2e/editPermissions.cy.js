describe("Permissions", () => {
  beforeEach(() => {
    cy.visit("/permissions/groups");
    cy.viewport(1920, 1080);
    cy.get("#headlessui-tabs-tab-\\:r1\\:")
      .invoke("removeAttr", "target")
      .click();
    cy.wait(3000);
    cy.get(":nth-child(1) > :nth-child(4) > .actions")
      .should("be.visible")
      .click();
  });

  it("Verifies permissions edit page", () => {
    cy.get(".absolute > .flex").should("be.visible").click();
    cy.log("Edit button clicked");
  });

  it("Verifies permissions edit page view and function name to be present", () => {
    cy.get(".absolute > .flex").should("be.visible").click();
    cy.wait(4000);
    cy.get(".function").should("contain", "Function");
    cy.get(
      "#root > div > div.flex.main-content > div > div.p-6.edit-a-permission > div > div.p-6.border-b.border-neutral-100.grid.grid-cols-7 > div.col-span-3 > textarea"
    ).should("be.visible");
    cy.log("Function name is present");
    cy.get(".col-span-3 > .w-full")
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
