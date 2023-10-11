import 'cypress-wait-until';


const pages = [
    '/permissions/groups',
    '/locations',
    '/users',
    '/customers'
]


describe.only("Export Functionality", () => {
    
    pages.forEach(pageUrl => {
        it(`page:${pageUrl}`, () => {
            cy.viewport(1920, 1080)
            cy.visit(pageUrl)
            cy.get('.filter-wrap > .gap-x-2').click()
            cy.get('.filter-wrap > .absolute > :nth-child(1)').click()
            cy.wait(5000);
            cy.exec('ls ~/Downloads').then((result) => {
                const downloads = result.stdout;
                expect(downloads).to.contain('.csv');
              });
            cy.get('.filter-wrap > .gap-x-2').click()
            cy.get('.absolute > :nth-child(2)')
            cy.wait(5000);
            cy.exec('ls ~/Downloads').then((result) => {
                const downloads = result.stdout;
                expect(downloads).to.contain('.xlsx');
              });
        })

    })
})