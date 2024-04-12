describe("Archive Customers", () => {

    beforeEach(() => {
        cy.login('lopsang@supportwebo.onmicrosoft.com', '>H^|u:~IwBF7L1{_e15')
        cy.wait(3000)
        cy.visit("/customers");
    })

    it("Verifies that customers can be archived", () => {
        cy.get(":nth-child(1) > .text-center > .actions")
            .contains("Archive")
            .click({ force: true });
        cy.get('#headlessui-dialog-panel-\\:r3\\:').should('exist').should('be.visible')
        cy.get('.bg-success-500').click()
        cy.assertToastMessage("Customer archived successfully")
    })

})