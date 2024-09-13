describe("User Delete", () => {


    beforeEach(() => {
        cy.login('')
        cy.wait(2000)
        cy.UpdateRefreshButton()
        cy.wait(2000)
        cy.visit("/users");
    })

    it("Verifies that users can be deleted", () => {
        cy.get('span.action-icon').first().click()
            cy.contains("Archive")
            .click({ force: true });
        cy.get('#headlessui-dialog-panel-\\:r3\\:')
            .then(($modal) => {
                if ($modal.length > 0) {
                    cy.log('Initial attempt succeeded')
                } else {
                    cy.get('#headlessui-dialog-panel-\\\\:').invoke('attr', 'id')
                        .then((id) => {
                            const dynamicId = id.split(':')[2]; // Assuming the dynamic part is the third part of the ID
                            cy.get(`#headlessui-dialog-panel-\\:${dynamicId}\\:`); // Use the dynamic ID in the locator
                        });
                }

            })

        cy.get('.bg-success-500').click()
        cy.assertToastMessage("User archived successfully")
    })


})


