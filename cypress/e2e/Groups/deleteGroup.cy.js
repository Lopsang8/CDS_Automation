describe("Delete Group", () => {
    beforeEach(() => {
        cy.login('')
        cy.wait(2000)
        cy.UpdateRefreshButton()
        cy.wait(2000)
        cy.visit("/permissions/groups");
    })

    it("Verifies that user can be deleted", () => {
        cy.get('span.relative').eq(0).click()
        cy.contains("Delete")
            .click({ force: true });
        cy.get('#headlessui-dialog-panel-\\:r7\\:')
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
        cy.assertToastMessage("Group Deleted Successfully")

    })
})

