
describe("Permissions", () => {

  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("/permissions/groups");
    cy.get("#headlessui-tabs-tab-\\:r1\\:")
      .invoke("removeAttr", "target")
      .click();
  });


  it("Verifies permissions list view", () => {
    cy.get("#headlessui-tabs-tab-\\:r1\\:")
      .invoke("removeAttr", "target")
      .click();
  });


  it("Verifies search button is present in permissions tab", () => {
    cy.get('input[name="Search"]').click().type("Create Location");
  });


  it("Verifies searched function/permission name is present", () => {
    cy.get('input[name="Search"]').click().type("Create Location");
    cy.wait(4000);
    cy.get("tr")
      .contains("Create Location")
      .parent("tr")
      .within(() => {
        cy.get("td").eq(0).should("contain", "Create Location");
      });
  });


});
