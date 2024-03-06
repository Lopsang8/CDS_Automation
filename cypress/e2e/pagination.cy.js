describe('Pagination and show items', () => {

    const allRoutes = [
        '/Tickets',
        '/Customers',
        '/permissions/groups',
        // '/locations',
        '/users',
    ];



    it('should interact with pagination and show items dropdown', () => {
        cy.viewport(1920, 1080);
        cy.visit(allRoutes[0]);
        cy.get('button.next').click()
        cy.get('button.prev').click()
        cy.get('input[type="number"]').clear().type('2')
        cy.get('select[name="show-items"]').select('50')
    });
});