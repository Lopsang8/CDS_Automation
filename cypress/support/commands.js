// -- This is a parent command --
Cypress.Commands.add("login", (email, password) => {

});



Cypress.Commands.add("viewports", (viewportWidth, viewportHeight) => {
    cy.viewport(viewportWidth, viewportHeight);
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// Cypress.Commands.add('generateFixture', () => {
//     const faker = require('@faker-js/faker')

//     cy.writeFile('cypress/fixtures/stories.json', {
//       'hits':Cypress._.times(20, () => {
//         return {
//           'title':`${faker.lorem.words(3)}`,
//           'url':`${faker.internet.url()}`,
//           'author':`${faker.name.firstName()} ${faker.name.lastName()}`,
//           'num_comments':`${faker.datatype.number()}`,
//           'points':`${faker.datatype.number()}`,
//           'objectID':`${faker.datatype.uuid()}`,
//         }
//       })
//     })
//   })
