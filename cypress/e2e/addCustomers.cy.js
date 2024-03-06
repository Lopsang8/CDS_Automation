import { fa, faker } from "@faker-js/faker";
describe("Customers", () => {

    beforeEach(() => {
        cy.viewports(1920, 1080);
        cy.login('lopsang@supportwebo.onmicrosoft.com','>H^|u:~IwBF7L1{_e15')
        cy.wait(3000)
        cy.visit("/customers");
    })

    it("Verifies customers list", () => {
        cy.get('.table-wrap > table').should("be.visible")
        // cy.get('.gap-6 > :nth-child(2)').should("be.visible")
        // cy.get('.table-wrap table').should("be.visible")

    })


    it("Verifies add a customer button and a form to add a customer ", () => {
        cy.get('.other-accessories > .gap-x-2').contains("Add A Customer").click();
    })


    it("Verifies that validation is present for individual and business customer", () => {
        cy.get('.other-accessories > .gap-x-2').contains("Add A Customer").click();
        cy.get('.bottom-updates-field > .bg-primary-700').click();
        cy.get('#individual_customer_name')
        cy.errorMessage(
            " Name is required *"
          );
        cy.get('#headlessui-tabs-tab-\\:rd\\:').click()
        cy.get('.bottom-updates-field > .bg-primary-700').click();
        cy.errorMessage(' ABN number must be 11 digits long * Business name is required * Business email is required *  Business number is required * Contact person name is required * Contact person email is required *  Contact person number is required *')
        cy.log('All required validations for business customer is in place.')
    })


    it.only("Verifies that individual customer can be added.", () => {
        cy.get('.other-accessories > .gap-x-2').contains("Add A Customer").click();
        var individualCustomerName = faker.person.fullName;
        cy.get('#individual_customer_name').type(individualCustomerName)
    })
     
        
})