describe('Payments', () => {
    beforeEach(() => {
        cy.login('')
        cy.wait(2000)
        cy.UpdateRefreshButton()
        cy.wait(2000)
        cy.visit('/payments')
        cy.wait(2000)
    });



    it('Verifies that Payment table is present', () => {
        cy.get('.p-6').should('exist')
        cy.log("Payments table is present.")
    })


    it('Verifies that the datepicker is set to today always', () => {
        cy.datepicker()

    })



    it('Verifies that search functionality is working in the payments table', () => {
        cy.search('Test_Business_Customer')
    })


})