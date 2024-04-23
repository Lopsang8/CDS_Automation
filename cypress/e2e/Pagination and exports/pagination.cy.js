

const allRoutes = [
    '/Tickets',
    '/Customers',
    '/permissions/groups',
    '/users',
];

describe('Pagination and show items', () => {
    allRoutes.forEach(pageUrl => {

        it(`page:${pageUrl}`, () => {
            cy.login('lopsang@supportwebo.onmicrosoft.com', '>H^|u:~IwBF7L1{_e15')
            cy.wait(3000)
            cy.visit(allRoutes[0]);
            cy.get('.datepicker-input-custom-class').click({ force: true })
            cy.get('.border-r-neutral-400 > :nth-child(5)').click({ force: true })
            cy.get('.pagination').scrollIntoView()
            // cy.get('button.next').click()
            cy.wait(3000)
            cy.get('button.next').then($nextButton => {
                if ($nextButton.length > 0) {
                    // Next button is present, click it
                    cy.get('button.next').click()
                } else {
                    // Next button is not present
                    cy.log('Next button is not present')
                }
            })
            cy.get('button.prev').click()
            cy.get('input[type="number"]').clear().type('2')
            cy.get('select[name="show-items"]').select('50')
        });
    })
})