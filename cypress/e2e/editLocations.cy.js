import { expect } from "chai";

describe("Edit Location", () => {


    before(() => {
      cy.viewport(1920, 1080);
      cy.visit("/locations");
      cy.get(":nth-child(1) > :nth-child(5) > .actions")
        .should("be.visible")
        .click();
        cy.get('.actions > .absolute > :nth-child(1)').should("be.visible").click();
    });  



    it("Verifies edit location form validation", () => {
        cy.get('.text-2xl').should("have.text", "Edit A Location");
        cy.get("#locationName").should("be.visible");
        cy.get('@actualLocationName').then((actualLocationName) => {
            expect(actualLocationName).to.not.equal(null);
            expect(actualLocationName).to.not.equal();

        });

    });




});  