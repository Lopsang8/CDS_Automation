describe('Payments', () => {
    beforeEach(() => {
        cy.login('')
        cy.wait(2000)
        cy.UpdateRefreshButton()
        cy.wait(2000)
        cy.visit('/payment-batches/create')
        cy.wait(2000)
    });



    it('Verifies that Create a Payment Batch is present', () => {
        cy.contains('h1', 'Create a Payment Batch').should('be.visible')
        cy.get('div.create-a-payment-batch').should('exist')
        cy.get('.pay-refund-payment-options').should('be.visible')
        cy.contains('span', 'EFT Request').should('be.visible')
        cy.contains('span', 'EFT ( Select Customer )').should('be.visible')
        cy.log("User is in the Create a payment batch page and has both EFT options.")
    })




    it.only('Verfies that Payment batch can be created from EFT Request Select Customer', () => {
        cy.contains('span', 'EFT ( Select Customer )').should('be.visible').click()
        cy.contains('button', 'Next Step').click()
        cy.contains('h1', 'Payment by EFT Request').should('be.visible')
        cy.get('.p-6').should('exist')
        cy.wait(3000)
        cy.numOfInvoices()
        cy.generateBankFile()
    })




    it('Verfies that Payment batch can be created from EFT Request only', () => {
        cy.contains('span', 'EFT Request').should('be.visible').click()
        cy.contains('button', 'Next Step').click()
        cy.contains('h1', 'Payment by EFT Request').should('be.visible')
        cy.get('.p-6').should('exist')
        cy.wait(3000)
        cy.contains('button', 'Create Batch').click()
        cy.generateBankFile()


    })


})