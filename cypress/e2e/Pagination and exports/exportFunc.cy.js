import 'cypress-wait-until';


const pages = [
    '/tickets',
    '/refunds',
    '/permissions/groups',
    '/locations',
    '/users',
    '/customers' 
]


describe.only("Export Functionality", () => {

    pages.forEach(pageUrl => {
        it(`page:${pageUrl}`, () => {
            cy.login('lopsang@supportwebo.onmicrosoft.com', '>H^|u:~IwBF7L1{_e15')
            cy.wait(3000)
            cy.visit(pageUrl)
            cy.get('.filter-wrap > .gap-x-2').click();
            cy.get('.filter-wrap > .absolute > :nth-child(1)').click();
            cy.wait(4000);

            // Check if any CSV files exist in the 'Downloads' directory
            cy.exec('ls ~/Downloads/*.csv', { failOnNonZeroExit: false }).then((result) => {
                const filesExist = result.stdout.trim() !== '';

                // Log the stdout for debugging purposes
                cy.log('stdout:', result.stdout);

                // Check if CSV files exist before attempting to move
                if (filesExist) {
                    // Move the downloaded CSV file to the 'downloads' folder
                    cy.exec('mv ~/Downloads/*.csv cypress/downloads', { failOnNonZeroExit: false });
                }

                // Assert that CSV files exist
                // expect(filesExist).to.be.true;
            });


            cy.get('.filter-wrap > .gap-x-2').click()
            cy.get('.filter-wrap > .absolute > :nth-child(2)').click()
            cy.wait(4000);
            cy.exec('ls ~/Downloads/*.xlsx', { failOnNonZeroExit: false }).then((result) => {
                const filesExist = result.stdout.trim() !== '';
                cy.log('stdout:', result.stdout);
                if (filesExist) {
                    cy.exec('mv ~/Downloads/*.xlsx cypress/downloads', { failOnNonZeroExit: false });
                }
            });
        })

    })
});