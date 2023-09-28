import { fa, faker } from "@faker-js/faker";

describe("Copy Functionality", () => {


  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("/users");
    cy.get(".other-accessories > .gap-x-2").should("be.visible").click();
  });



  it("Verifies user can be created with copy permissions functionality", () => {
    var rawFirstName = faker.person.firstName();
    var userFirstName = rawFirstName.replace(/[^a-zA-Z0-9'_-]/g, "");
    cy.get('#first_name').type(userFirstName);
    var rawLastName = faker.person.lastName();
    var userLastName = rawLastName.replace(/[^a-zA-Z0-9'_-]/g, "");
    cy.get('#last_name').type(userLastName);
    var userEmail = faker.internet.email();
    cy.get('#email').type(userEmail);
    const randomPhoneNumber = Math.floor(
      10000000 + Math.random() * 90000000
    ).toString();
    const userValidPhoneNumber = `05${randomPhoneNumber}`;
    cy.get('[placeholder="04XX XXX XXX or 05XX XXX XXX"]').type(
      userValidPhoneNumber
    );
    var rawUsersName = faker.person.fullName();
    var usersName = rawUsersName.replace(/[^a-zA-Z0-9'_-]/g, "");
    cy.get('#userName').type(usersName);
    var fobId = faker.lorem.word();
    cy.get('#fob_id').type(fobId);
    const designationsArray = ['Accountant', 'Operator', 'Admin', 'Super Admin', 'In-Charge'];
    const randomDesignationIndex = Cypress._.random(0, designationsArray.length - 1);
    const designation = designationsArray[randomDesignationIndex];
    cy.get('#designation').type(designation);
    cy.log("User's detail filled successfully")
    cy.get('#headlessui-tabs-tab-\\:r2\\:').should('be.visible').click();
    cy.get('.filter-wrap > .bg-danger-0').should('have.text', "Copy Permission ").click();
    cy.get('.filter-wrap > .undefined > .rounded').should("exist").click(); 
    cy.wait(3000);
    const copyUserDropdown = cy.get('.userCopyPremissionSearch')
    copyUserDropdown.find('> :nth-child(n)').then((options) => {
        const randomIndex = Cypress._.random(1, options.length - 1);
        const selectedOption = options[randomIndex];
        cy.wrap(selectedOption).click();
        // cy.get(':nth-child(n) > div > .relative > .slider').should('be.checked');
        // cy.wrap(selectedOption).should('be.checked');
    })
    cy.wait(4000);
    cy.get(':nth-child(2) > .filter-wrap > .gap-x-2').should("exist").click();
    cy.get(".bg-success-500").should("exist").click();
    cy.get('.pemission-details').should("be.visible");
    cy.get(".Toastify")
      .should("exist")
      .should("have.text", "User Added Successfully");
    cy.log("User Added Successfully");
  });



  // it("Verifies copy functionality UI and API response is working", () => {
  //   cy.request('GET', 'https://be-cds.webo.dev/api/v1/permissions/', {
  //     userId: this.userIdUI,
  //   }).as('apiResponse');


  // });


});
