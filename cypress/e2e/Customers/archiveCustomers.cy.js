describe("Archive Customers", () => {

    beforeEach(() => {
        cy.login()
        cy.wait(2000)
        cy.UpdateRefreshButton()
        cy.wait(2000)
        cy.visit("/customers");
    })

    it("Verifies that customers can be archived", () => {

        cy.get(":nth-child(1) > .text-center > .actions")
            .contains("Archive")
            .click({ force: true });
        cy.get('#headlessui-dialog-panel-\\:r9\\:')
            .then(($modal) => {
                if ($modal.length > 0) {
                    cy.log('Initial attempt succeeded')
                } else {
                    cy.get('#headlessui-dialog-panel-\\\\:').invoke('attr', 'id')
                        .then((id) => {
                            const dynamicId = id.split(':')[2]; // Assuming the dynamic part is the third part of the ID
                            cy.get(`#headlessui-dialog-panel-\\:${dynamicId}\\:`); // Using the dynamic ID in the locator
                        });
                }

            })


        cy.get('.bg-success-500').click()
        cy.get(".Toastify").contains('archived successfully')
        cy.log('Customer has been archived successfully!')

    })
})

