describe("Refunds", () => {
    beforeEach(() => {
        cy.login('')
        cy.wait(2000)
        cy.UpdateRefreshButton()
        cy.wait(2000)
        cy.visit('/refunds')
    });



    it('Verifies that refunds listing page is present', () => {
        cy.get('.p-6').should('exist')
        cy.log("Refunds table is present.")
    })


    it('Verifies that the search functionality is working', () => {
        cy.search('Lopsang Gole')
    })


    it('Verifies that the datepicker is set to today always', () => {
        cy.datepicker()
    })


})