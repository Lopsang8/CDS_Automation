import { fa, faker } from "@faker-js/faker";

describe("Add a User", () => {


  beforeEach(() => {
    cy.viewports(1920, 1080);
    cy.login('lopsang@supportwebo.onmicrosoft.com','>H^|u:~IwBF7L1{_e15')
    cy.wait(3000)
    cy.visit("/users");
  });



  it("Verifies users list view and Add A User button", () => {
    cy.get(".gap-6 > :nth-child(1)").should("be.visible");
    cy.get(".gap-6 > :nth-child(2)").should("be.visible");
    cy.get('input[name="Search"]').should("be.visible");
    cy.get(".other-accessories > .gap-x-2").should("be.visible").click();
    cy.log("Users lists and Add A User button is present");
  });



  it("verifies add user page validations", () => {
    cy.get(".other-accessories > .gap-x-2").should("be.visible").click();
    cy.get(".bg-success-500").should("exist").click();
    cy.errorMessage(' First Name is required * Last name is required * Email is required * Username is required * FOB ID is required * Designation is required *'    );
    cy.log("All required fields validation is working");
  });



  it("verifies add user page has Locations and Permissions tab", () => {
    cy.get(".other-accessories > .gap-x-2").should("be.visible").click();
    cy.get('#headlessui-tabs-tab-\\:r1\\:').should('be.visible').click();
    cy.get('#headlessui-tabs-tab-\\:r2\\:').should('be.visible').click();
    cy.log("Locations and Permissions tab is present");
    cy.get('.filter-wrap > .bg-danger-0').should('be.visible')
    cy.get('.bg-primary-700').should('be.visible')

  });



  it("Verifies users can be created without filling the Locations and Permissions tab", () => {
    cy.get(".other-accessories > .gap-x-2").should("be.visible").click();
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
    var designation = faker.person.jobTitle();
    cy.get('#designation').type(designation);
    cy.log("User's detail filled successfully")
    cy.get(".bg-success-500").should("exist").click();
    cy.assertToastMessage("User Added Successfully");
    cy.log("User Added Successfully");
  });


});
