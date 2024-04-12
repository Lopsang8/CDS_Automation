

describe('Create Ticket', () => {
    beforeEach(() => {
        cy.login('lopsang@supportwebo.onmicrosoft.com','>H^|u:~IwBF7L1{_e15')
        cy.wait(3000)
    });



    it("Verifies that Invoice, Paid and Cancelled ticket tabs listing pages are present", () => {
        cy.get('#headlessui-tabs-tab-\\:r2\\: > .block').should('have.text', 'Invoiced')          //checking the name of the present tab to be Invoiced
        cy.get('#headlessui-tabs-panel-\\:r5\\:').should('exist')   //checking the invoiced table to exist
        cy.get('#headlessui-tabs-tab-\\:r3\\: > .block').click()       //clicking on the paid tab
        .should('have.text', 'Paid')              //checking the name of the tab to be paid
        cy.get('#headlessui-tabs-panel-\\:ra\\:').should('exist')      //checking the paid table to exist
        cy.get('#headlessui-tabs-tab-\\:r4\\: > .block').click()         //clicking on the cancelled tab
        .should('have.text', 'Cancelled')                                //checking the name of the tab to be Cancelled
        cy.get('#headlessui-tabs-panel-\\:rb\\:').should('exist')                //checking the cancelled table to exist


    })


    it.only("Verifies that the ticket create button is present", () => {
        cy.get('.other-accessories > .gap-x-2').should('be.visible').click()         //clicking on the Create Ticket button
        

    })

})