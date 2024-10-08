import { fa, faker } from "@faker-js/faker";
import 'cypress-wait-until';

describe("Customers", () => {

    beforeEach(() => {
        cy.login()
        cy.wait(2000)
        cy.UpdateRefreshButton()
        cy.wait(2000) 
        cy.visit('/customers')
    })
 

    it("Verifies customers list", () => {
        cy.get('.table-wrap > table').should("be.visible")
        // cy.get('.gap-6 > :nth-child(2)').should("be.visible")
        // cy.get('.table-wrap table').should("be.visible")

    })


    it("Verifies add a customer button and a form to add a customer ", () => {
        cy.get('div.other-accessories button').contains("Add A Customer").click();
    })


    it("Verifies that validation is present for individual and business customer", () => {
        cy.get('div.other-accessories button').contains("Add A Customer").click({});
        cy.contains('button', 'Next Step').click();
        cy.get('#individual_customer_name')
        cy.errorMessage(
            " Name is required *"
        );
        cy.get('#headlessui-tabs-tab-\\:rd\\:').click()
        cy.contains('button', 'Next Step').click();
        cy.errorMessage
            (' ABN number must be 11 digits long * Business name is required * Business email is required *  Business number is required * Contact person name is required * Contact person email is required *  Contact person number is required *')
        cy.log('All required validations for business customer is in place.')
    })


    it("Verifies that individual customer can be added.", () => {
        // cy.get('.cds-nav > :nth-child(2) > .w-full').click()
        cy.get('div.other-accessories button').contains("Add A Customer").click();
        cy.get('.py-6').should('be.visible')
        var rawindividualCustomerName = faker.internet.userName(2);
        var individualCustomerName = rawindividualCustomerName.replace(/[^a-zA-Z0-9'_-]/g, "");
        cy.get('#individual_customer_name').type(individualCustomerName)
        const emailRandomNumber = Math.floor(Math.random() * 10000)
        const individualEmail = 'lopsang.gole+' + emailRandomNumber + '@intuji.com'
        cy.get('#individual_email').type(individualEmail)
        cy.contains('span', 'Print Only').click()
        cy.contains('button', 'Next Step').click()
        cy.contains('button', 'Next Step').click()
        // cy.get('.bottom-updates-field > :nth-child(2)').click()
        cy.get('span.checkmark').eq(1).click()
        cy.contains('button', 'Finish').click()
        cy.waitUntil(() =>
            cy.assertToastMessage("Successfully created a new customer"),
            cy.log("Individual customer created successfully.")
        )
    })


    it("Verifies that business customer can be added", () => {
        cy.get('div.other-accessories button').contains("Add A Customer").click();
        cy.contains('span', 'Business/ABN Holder').click()
        // cy.get('#headlessui-tabs-tab-\\:rd\\:').click()    //goes to the business tab
        cy.get('.py-6').should('be.visible')      //checks the visibility of business form
        cy.get('.gap-10 > div > .relative').click()        //check the ABN later checkbox
        var rawBusinessName = faker.company.name();
        var businessName = rawBusinessName.replace(/[^a-zA-Z0-9'_-]/g, "");
        cy.get('#business_name').type(businessName)
        const busiEmailRandomNumber = Math.floor(Math.random() * 10000)
        const businessEmail = 'lopsang.gole+busi' + busiEmailRandomNumber + '@intuji.com'
        cy.get('#business_email').type(businessEmail)
        const randomBusinessPhoneNumber = Math.floor(
            10000000 + Math.random() * 90000000
        ).toString();
        const businessValidPhoneNumber = `07${randomBusinessPhoneNumber}`;
        cy.get(':nth-child(5) > .react-tel-input > .form-control').type(businessValidPhoneNumber)
        var rawBusinessContactPersonName = faker.person.fullName();
        var businessContactPersonName = rawBusinessContactPersonName.replace(/[^a-zA-Z0-9'_-]/g, "");
        cy.get('#business_contact_person_name').type(businessContactPersonName)
        var contactPersonEmail = faker.internet.email();
        cy.get('#business_contact_person_email').type(contactPersonEmail)
        cy.get(':nth-child(8) > .react-tel-input > .form-control').type(businessValidPhoneNumber)
        cy.contains('span', 'Print and Email').click()
        cy.contains('button', 'Next Step').click()
        cy.get('span.checkmark').eq(1).click()
        cy.contains('button', 'Next Step').click()
        // cy.contains('span', 'Pay Now').click()
        cy.contains('button', 'Finish').click()
        cy.waitUntil(() =>
            cy.assertToastMessage("Successfully created a new customer")
        )
    })
    

})

