describe("User Delete", () => {


    beforeEach(() => {
        cy.login('')
        cy.wait(2000)
        cy.UpdateRefreshButton()
        cy.wait(2000)
        cy.visit("/users");
    })

    it("Verifies that users can be deleted", () => {
        for (let i = 0; i < 5; i++) {
            cy.get('span.action-icon').first().click()
            cy.contains("Archive")
                .click({ force: true });
            cy.get('[data-headlessui-state="open"]')
                .then(($modal) => {
                    if ($modal.length > 0) {
                        cy.log('Delete user prompts confirmation')
                    } else {
                        cy.log('No confirmation prompt found.')
                    }

                })

            cy.get('.bg-success-500').click()
            cy.assertToastMessage("User archived successfully")
            cy.wait(3000)
        }
    })


})


