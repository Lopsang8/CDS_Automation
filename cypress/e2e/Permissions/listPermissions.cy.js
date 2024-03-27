
describe("Permissions", () => {

  beforeEach(() => {
    cy.login('lopsang@supportwebo.onmicrosoft.com','>H^|u:~IwBF7L1{_e15')
    cy.wait(3000)
    cy.visit("/permissions/groups");
    cy.get("#headlessui-tabs-tab-\\:r3\\:")
      .invoke("removeAttr", "target")
      .click();
  });


  it("Verifies permissions list view", () => {
    cy.get("#headlessui-tabs-tab-\\:r3\\:")
      .invoke("removeAttr", "target")
      .click();
  });


  it("Verifies search button is present in permissions tab", () => {
    cy.get('input[name="Search"]').click().type("CDS Ticket Functions");
  });


  it.only("Verifies searched function/permission name is present", () => {
    cy.get('input[name="Search"]').click().type("CDS Ticket Functions");
    cy.wait(4000);
    cy.get("tr")
      .contains("CDS Ticket Functions")
      .parent("tr")
      .within(() => {
        cy.get("td").eq(0).should("contain", "CDS Ticket Functions");
      });
  });


});
