describe("Archive Customers", () => {

    beforeEach(() => {
        cy.login('lopsang@supportwebo.onmicrosoft.com', '>H^|u:~IwBF7L1{_e15')
        cy.wait(3000)
        cy.visit("/customers");
    })

    it("Verifies that customers can be archived", () => {
        cy.wait(3000)
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
        cy.assertToastMessage("Customer archived successfully")
    })
})

