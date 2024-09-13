// import '../../support/commands';
import { locationEmail, locationName, siteCode, validPhoneNumber } from '../../support/shared';

describe("Edit Location", () => {


  before(() => {
    cy.generateAndStoreValues();
    cy.login('lopsang@supportwebo.onmicrosoft.com', '>H^|u:~IwBF7L1{_e15')
    cy.wait(3000)
    cy.visit("/locations");
    cy.get(":nth-child(1) > :nth-child(5) > .actions")
      .contains("Edit")
      .click({ force: true });
  });



  it('Verifies edit location form validation', () => {
    cy.get('.text-2xl').should('have.text', 'Edit A Location');
    cy.get('#locationName').should('be.visible');

    // cy.log(cy.state('locationName'), cy.state('locationEmail'), cy.state('validPhoneNumber'), cy.state('siteCode'));

    // cy.get('#locationName').should('exist').invoke('val').should('eq', cy.state('locationName'));
    // cy.get('#email').should('exist').invoke('val').should('eq', cy.state('locationEmail'));
    // cy.get('[placeholder="Phone Number"]').should('exist').invoke('val').should('eq', cy.state('validPhoneNumber'));
    // cy.get('#siteCode').should('exist').invoke('val').should('eq', cy.state('siteCode'));

    cy.log(locationName, locationEmail, validPhoneNumber, siteCode);

    cy.get('#locationName').should('exist').invoke('val').should('eq', locationName);
    cy.get('#email').should('exist').invoke('val').should('eq', locationEmail);
    cy.get('[placeholder="Phone Number"]').should('exist').invoke('val').should('eq', validPhoneNumber);
    cy.get('#siteCode').should('exist').invoke('val').should('eq', siteCode);
  });


});  