describe('Pagination and show items', () => {
    it('should interact with pagination and show items dropdown', () => {
        cy.get('.next').click()
        cy.get('.prev').click()
        cy.get('input[type="number"]').clear().type('2')
        cy.get('select[name="show-items"]').select('50')
    });
});