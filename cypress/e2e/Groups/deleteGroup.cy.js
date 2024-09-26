describe("Delete Group", () => {
    beforeEach(() => {
        cy.login('')
        cy.wait(2000)
        cy.UpdateRefreshButton()
        cy.wait(2000)
        cy.visit("/permissions/groups");
    })

    it("Verifies that user can be deleted", () => {
        for (let i = 0; i < 5; i++) {
            cy.get('span.relative').eq(i).click()
            cy.contains("Delete")
                .click({ force: true });
            cy.get('[data-headlessui-state="open"]')
                .then(($modal) => {
                    if ($modal.length > 0) {
                        cy.log('Delete Group prompts confirmation.')
                    } else {
                        cy.log('No confirmation prompted.')
                    }

                })

            cy.get('.bg-success-500').click()
            cy.assertToastMessage("Group Deleted Successfully")
            cy.wait(3000)


        }

    })
})

