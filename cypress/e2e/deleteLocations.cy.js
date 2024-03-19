describe(" Delete Location", () => {
    beforeEach(() => {
        cy.login('lopsang@supportwebo.onmicrosoft.com', '>H^|u:~IwBF7L1{_e15')
        cy.wait(3000)
        cy.visit("/locations");
    });

    it("Verifies that Locations can be deleted", () => {
        cy.get(":nth-child(1) > :nth-child(5) > .actions")
            .contains("Delete")
            .click({ force: true });
        cy.get('.bg-success-500').click()
        cy.assertToastMessage("Location Deleted Successfully")
    })


})
