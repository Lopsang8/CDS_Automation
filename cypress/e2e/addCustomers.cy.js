describe("Customers", () => {

    before(() => {
        cy.viewports(1920, 1080);
        cy.visit("/customers");
    })

    it("Verifies customers list", () => {
        cy.get('.gap-6 > :nth-child(1)').should("be.visible")
        cy.get('.gap-6 > :nth-child(2)').should("be.visible")
        cy.get('.table-wrap table').should("be.visible")

    })


    it("Verifies add a customer button and a form to add a customer ", () => {
        cy.get('.other-accessories > .gap-x-2').contains("Add A Customer").click();
    })
        
})