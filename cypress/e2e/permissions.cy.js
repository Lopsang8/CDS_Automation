describe('Permissions', () => {
    before(() => {
        cy.visit('/permissions/groups')
    })

    beforeEach(() => {
        cy.get('#headlessui-tabs-tab-\\:r1\\:')
            .invoke('removeAttr', 'target')
            .click()
    })    

    it('Verifies permissions list view', () => {
        cy.get('#headlessui-tabs-tab-\\:r1\\:')
            .invoke('removeAttr', 'target')
            .click()
    })

    it('Verifies search button is present in permissions tab', () => {
        cy.get('input[name="Search"]')
            .click()
            .type('Create Location')

    })

})
