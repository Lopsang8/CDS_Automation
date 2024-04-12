describe("User Delete", () => {


    beforeEach(() => {
        cy.login('lopsang@supportwebo.onmicrosoft.com', '>H^|u:~IwBF7L1{_e15')
        cy.wait(3000)
        cy.visit("/users");
    })

    it("Verifies that users can be deleted", () => {
        cy.get(":nth-child(1) > :nth-child(6) > .actions")
            .contains("Archive")
            .click({ force: true });
        cy.get('#headlessui-dialog-panel-\\:r3\\:').should('exist').should('be.visible')
        cy.get('.bg-success-500').click()
        cy.assertToastMessage("User archived successfully")
    })


})