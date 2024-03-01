describe("Customers", () => {

    beforeEach(() => {
        cy.viewports(1920, 1080);
        cy.login('lopsang@supportwebo.onmicrosoft.com','>H^|u:~IwBF7L1{_e15')
        cy.wait(3000)
        cy.visit("/customers");
    })

    it("Verifies customers list", () => {
        cy.get('.table-wrap > table').should("be.visible")
        // cy.get('.gap-6 > :nth-child(2)').should("be.visible")
        // cy.get('.table-wrap table').should("be.visible")

    })


    it("Verifies add a customer button and a form to add a customer ", () => {
        cy.get('.other-accessories > .gap-x-2').contains("Add A Customer").click();
    })


    it("Verifies that validation is present for individual customer", () => {
        cy.get('.other-accessories > .gap-x-2').contains("Add A Customer").click();
        cy.get('.bottom-updates-field > .bg-primary-700').click();
        cy.get('#individual_customer_name')
        cy.errorMessage(
            " Name is required *"
          );

    })
        
})