

describe('Create Ticket', () => {
    beforeEach(() => {
        cy.login('')
        cy.wait(2000)
        cy.UpdateRefreshButton()
        cy.wait(2000)
    });



    it("Verifies that Tickets listing page is present", () => {
        cy.get('.p-6').should('exist')
        cy.log("Tickets table is present.")

    })


    it("Verifies that the ticket create button is present and directs to Select Customer page", () => {
        cy.get('div.other-accessories button').should('be.visible').click()         //clicking on the Create Ticket button
        cy.contains('h1', 'Select Customer').should('exist')
        cy.log('User is in the Select Customer page')
        cy.get('div.other-accessories button').should('be.visible')
        cy.log('Create Customer button is present to create a new customer while creating a new ticket.')
        cy.search('test')
        cy.get('div.filter-wrap button').should('exist')
        cy.log('Filter button is present in the Select Customer page.')
        cy.get('.pagination').should('be.visible')
        cy.log('Pagination is present')
    })


    it.only("Verifies that the user can select a customer and create a ticket", () => {
        for (let t = 0; t < 5; t++) {
            cy.get('div.other-accessories button').should('be.visible').click()
            const customerList = ['Test_Individual_Customer', 'Test_Business_Customer']
            const randomCustomer = customerList[Math.floor(Math.random() * customerList.length)];
            cy.search(randomCustomer)
            cy.contains('button', 'Select Customer').eq(0).click()
            cy.wait(2000 )
            cy.scanBarcodePopUp()
            cy.contains('h1', 'Scan Dockets').should('be.visible')
            cy.log('User is in the Docket entry page.')
            // cy.get('#headlessui-tabs-panel-\\:rc\\:').should('exist')    //Looking for docket entry table
            cy.log('Barcode & Docket entry table is present.')
            for (let i = 0; i < 3; i++) {
                cy.contains('button', 'Add A Manual Entry').click()
                cy.get(':nth-child(1) > .text-primary-700').click()   //Clicking on Manual Entry dropdown
                cy.wait(1000)
                cy.get('tbody tr').eq(i).find('#docket_item_note').click().type('This is automation test')
                const randomNumber = Math.floor(Math.random() * 9999) + 1;
                cy.get('tbody tr').eq(i).find('#docket_item_count').click().type(`${randomNumber}{enter}`);
            }
            cy.get('#ticket_reference').type('This is automation test ticket reference.')
            cy.wait(2000)
            cy.contains('button', 'Next Step').click()
            cy.contains('h1', 'Payment Process').should('exist')
            cy.log('User is in the Payment Process page')
            cy.paymentMethod().then(() => {
                if (!Cypress.env('isPayLater')) {
                    cy.paymentTypeAndOption(); // Calls this only if Pay Later was not selected
                } else {
                    cy.log('Skipping paymentTypeAndOption as the payment method is Pay Later.');
                }
            });
            cy.wait(3000)

        }

    })

})

