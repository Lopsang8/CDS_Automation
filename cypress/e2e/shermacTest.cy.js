// import 'cypress-file-upload';

describe('Shermac Test', () => {

    // it('Authentication token check', () => {
    //     cy.visit("https://dev-shermac.webo.dev/login")
    //     cy.get('[placeholder="Enter your email address"]').type('kiran.kumal+5000@webo.digital')
    //     cy.get('[placeholder="Enter your password"]').type('Kiran123@')
    //     cy.get('.btn').click()
    //     cy.wait(4000)
    //     cy.window().its('localStorage').invoke('getItem', 'user').then((userJson) => {
    //         expect(userJson, 'User data exists').to.exist;
    //         const user = JSON.parse(userJson);
    //         const accessToken = user.accessToken;
    //         expect(accessToken, 'Access token exists').to.exist;
    //         cy.log(`Access Token: ${accessToken}`);
    //     })
    // })



    it('Verifies the toggle button in ams', () => {
        cy.visit('https://asset-management-system-one.vercel.app/login')
        cy.get('input[name="username"]').type('admin');
        cy.get('input[name="password"]').type('Adminadmin1!');
        cy.get('button[type="submit"]').click();
        cy.get('[href="/assets/"] > .navbar__list--toggle').click()
        cy.get('.button__blue').click()
        cy.get('input[name="status"]').should('exist')
        cy.get('label.switch').click()
        cy.get('.status').should('have.text', 'Active')
        cy.get('.upload__image--file > .button__blue').contains('Browse File').click({ force: true })
        const fileName = 'example.txt'; // Change this to the path of your file
        cy.fixture(fileName).then(fileContent => {
            cy.get('#file-upload').upload({ fileContent, fileName, mimeType: 'text/plain' });
        });

    })
})