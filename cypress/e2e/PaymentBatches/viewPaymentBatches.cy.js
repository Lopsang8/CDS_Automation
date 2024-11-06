describe('Payments', () => {
    beforeEach(() => {
        cy.login('')
        cy.wait(2000)
        cy.UpdateRefreshButton()
        cy.wait(2000)
        cy.visit('/payment-batches')
        cy.wait(2000)
    });



    it('Verifies that Payment table is present', () => {
        cy.get('.p-6').should('exist')
        cy.log("Payment batches table is present.")
    })


    it('Verifies that the datepicker is set to today always', () => {
        cy.datepicker()

    })



    it('Verifies that search functionality is working in the payments table', () => {
        cy.search('Prestons')
    })



    it('Verifies that Create Payment Batch button is present in the page', () => {
        cy.contains('button', 'Create Payment Batch').should('be.visible').click()
        cy.log('Create Payment Batch button is present in the Payment batch page.')
    })



})