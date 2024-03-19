import 'cypress-wait-until';


Cypress.Commands.add("login", (email, password) => {
  const args = {email, password}
  cy.session(
    args ,
    () => {
    cy.visit('https://dev-sellandparker.webo.dev/')
    // cy.visit('https://stg-cds.webo.dev/')
    cy.wait(5000)
    
    // let enteredUsername;
    cy.origin('https://login.microsoftonline.com/', 
    { args: [email, password] }, 
    ([email, password]) => {

    cy.get('#i0116').type(email)
    // .invoke('val').then((username) => {
    //   enteredUsername = username;
    // });
    cy.get('#idSIButton9').click()
    cy.get('#i0118').type(password)
    cy.get('#idSIButton9').click();
    cy.get('#idSIButton9').click();
    
    });
  
    cy.url().should('contain','/home')
    cy.log("Contains the home page")
  })
  cy.visit('/')
  

});




Cypress.Commands.add("viewports", (viewportWidth, viewportHeight) => {
  cy.viewport(viewportWidth, viewportHeight);
});



// Custom command to visit the edit location page
Cypress.Commands.add("visitEditLocationPage", (id) => {
    cy.visit(`https://dev-sellandparker.webo.dev/locations/${id}/edit`);
  });



  // Custom command to fetch location data from the database
  Cypress.Commands.add("requestLocation", (uuid) => {
    return cy.request({
      method: "GET",
      url: `https://be-cds.webo.dev/api/v1/locations/${uuid}`,
    }).then((response) => response.body);
  });



  Cypress.Commands.add("assertToastMessage", (expectedText) => {
    cy.get(".Toastify")
      .should("exist")
      .and("have.text", expectedText);
  })




  Cypress.Commands.add("errorMessage", (expectedErrorMessage) => {
    cy.get(".error-message")
      .should("have.text", expectedErrorMessage);
  })


  const phoneCodes = ['02', '03', '04', '07', '08']
  Cypress.Commands.add("australianPhoneNumber", () => {
    phoneCodes.forEach(code => {
      const randomPhoneNumber = Math.floor(
        10000000 + Math.random() * 90000000
      ).toString();
      const userValidPhoneNumber = code + randomPhoneNumber;
      cy.get('[placeholder="Phone Number"]').type(
        userValidPhoneNumber
      );

    })
    
  })



import { generateValues, locationName, locationEmail, validPhoneNumber, siteCode } from './shared';

Cypress.Commands.add('generateAndStoreValues', () => {
  generateValues();
  cy.state('locationName', locationName);
  cy.state('locationEmail', locationEmail);
  cy.state('validPhoneNumber', validPhoneNumber);
  cy.state('siteCode', siteCode);
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