// import { addData } from "./addLocations.cy";


describe("Edit Location", () => {


    before(() => {
      cy.visit("/locations");
      cy.get(":nth-child(1) > :nth-child(5) > .actions")
        .should("be.visible")
        .click();
        cy.get('.actions > .absolute > :nth-child(1)').should("be.visible").click();
    });  



    it("Verifies edit location form validation", () => {
        cy.get('.text-2xl').should("have.text", "Edit A Location");
        cy.get("#locationName").should("be.visible");
        cy.get('@addedLocationName').invoke('').should('eq', this.locationName);
        cy.get("@addedEmail").invoke('').should('eq', this.email);
        cy.get("@addedPhone").invoke('').should('eq', this.phone);
        // cy.get('#location-name-input').invoke('val').should('eq', this.locationName);



    });




});  