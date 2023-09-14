import { fa, faker } from "@faker-js/faker";

describe("Locations", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("/locations");
  });



  it("Verifies locations list view and Add A Location button", () => {
    // cy.get('[aria-label="Add A Location"]').click();
    cy.get("button.bg-primary-700").contains("Add A Location").click();
    cy.log("Location lists and Add A Location button is present");
  });



  it("Verifies validation for Locations required fields", () => {
    cy.get("button.bg-primary-700").contains("Add A Location").click();
    cy.get("#locationName").should("be.visible");
    // cy.get('h2.text-neutral-500.font-semibold.text-lg.mb-6')
    cy.get(".border-b > .text-neutral-500").should(
      "have.text",
      "Location Details"
    );
    cy.get("#locationName").click().type("Testing.RandomLocation!");
    cy.get("#email").click();
    cy.wait(2000);
    cy.get(".error-message").should(
      "have.text",
      " Location Name can't contain any special characters"
    );
    cy.log("Location Name can't contain any special characters validation is working");
    cy.get("#locationName").click().clear();
    cy.get("#email").click();
    cy.wait(3000);
    cy.get(".error-message").should(
      "have.text",
      " Location name is required * Email is required *"
    );
    cy.log("Location name is required and Email is required validation is working");
    cy.get(".add-locations > :nth-child(1) > :nth-child(2) > .text-lg").should(
      "be.visible"
    );
    cy.get(".bg-success-500").should("exist").click();
  });



  it("Verifies creating a Location", () => {
    cy.get("button.bg-primary-700").contains("Add A Location").click();
    cy.get("#locationName").should("be.visible");
    var rawLocationName = faker.location.city();
    var locationName = rawLocationName.replace(/[^a-zA-Z0-9'_-]/g, "");
    const randomDigits = Math.floor(
      10000000 + Math.random() * 90000000
    ).toString();
    const validPhoneNumber = `05${randomDigits}`;
    cy.get("#locationName").type(locationName);
    cy.get("#email").type(faker.internet.email());
    cy.get('[placeholder="04XX XXX XXX or 05XX XXX XXX"]').type(
      validPhoneNumber
    );
    cy.get(".add-locations > :nth-child(1) > :nth-child(2)").should("be.visible");
    cy.get('.add-location-groups').should('be.visible')
    cy.get('tbody tr').each(($row) => {
      cy.wrap($row).within(() => {
            cy.get('td:nth-child(2) input[type="checkbox"]').check({ force: true });
      });
    });
  });




});
