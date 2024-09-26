describe("Archive Customers", () => {

    beforeEach(() => {
        cy.login()
        cy.wait(2000)
        cy.UpdateRefreshButton()
        cy.wait(2000)
        cy.visit("/customers");
    })

    it("Verifies that customers can be archived", () => {

        for (let i = 0; i < 5; i++) {
            cy.get('span.action-icon').eq(i).click()
            cy.contains("Archive")
                .click({ force: true });

            cy.get('[data-headlessui-state="open"]')
                .then(($modal) => {
                    if ($modal.length > 0) {
                        cy.log('Archive Customer prompts confirmation')
                    }
                    else {
                        cy.log('No pop up found.')
                    }
                });

            cy.get('.bg-success-500').click();
            cy.get(".Toastify").contains('archived successfully');
            cy.log('Customer has been archived successfully!');
            cy.wait(3000)
        }

    })
})

