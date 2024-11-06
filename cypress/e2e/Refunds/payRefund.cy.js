describe('Pay Refund', () => {
    beforeEach(() => {
        cy.login('')
        cy.wait(2000)
        cy.UpdateRefreshButton()
        cy.wait(2000)
        cy.visit('/refunds/pay')
        cy.wait(2000)
    });


    it('Verifies that pay refund page has all the refund payments options', () => {

        cy.get('div.pay-refunds div').eq(1).should('exist')
        cy.contains('span', 'Show today’s unpaid invoices').should('exist')
        cy.contains('span', 'Show all unpaid invoices').should('exist')
        cy.contains('span', 'Group by customer').should('exist')
        cy.get('div.justify-end').should('exist')

    })



    it('Verifies that payment can be done by selecting todays unpaid invocies', () => {
        cy.contains('span', 'Show today’s unpaid invoices').click()
        cy.contains('button', 'Next').click()
        cy.wait(5000)
        cy.checkData()
        cy.paymentType()
        cy.paymentOption()
        cy.wait(2000)
        cy.assertToastMessage("Successfully updated an invoice");
    })



    it('Verifies that payment can be done by selecting Show all unpaid invoices', () => {
        cy.contains('span', 'Show all unpaid invoices').click()
        cy.contains('button', 'Next').click()
        cy.wait(8000)
        cy.checkData()
        cy.wait(4000)
        cy.paymentType()
        cy.paymentOption()
        cy.wait(2000)
        cy.assertToastMessage("Successfully updated an invoice");
    })



    it('Verifies that payment can be done by selecting Group by customer', () => {
        cy.contains('span', 'Group by customer').click()
        cy.contains('button', 'Next').click()
        cy.wait(8000)
        cy.checkData()
        cy.wait(4000)
        cy.contains('button', 'Next Step').click()
        cy.paymentOption()
        cy.wait(5000)
        cy.assertToastMessage("Successfully updated a group invoice");
    })




})