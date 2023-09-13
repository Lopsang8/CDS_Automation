describe('Pagination and show items', () => {
    it('should interact with pagination and show items dropdown', () => {
        cy.visit('/permissions/groups');
        cy.get('button.next').click()
        cy.get('button.prev').click()
        cy.get('input[type="number"]').clear().type('2')
        cy.get('select[name="show-items"]').select('50')
    });
});