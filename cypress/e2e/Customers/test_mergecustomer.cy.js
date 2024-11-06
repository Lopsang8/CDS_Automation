describe("Customers", () => {
    beforeEach(() => {
        cy.login(); // Assuming a custom login command
        cy.wait(2000); // Wait for any necessary loading
        cy.UpdateRefreshButton(); // Assuming a custom refresh command
        cy.wait(2000); // Wait for the page to refresh
        cy.visit('/customers'); // Navigate to the customers page
    });

    it("Opens dropdown and selects 'Not Applicable'", () => {
        // Click on the 'Filter' button to open the filter options
        cy.contains('Filter').click(); 

        // Open the dropdown
        cy.get('.select-box button#headlessui-listbox-button-\\:rf\\:').click();

        // Select "Not Applicable" from the dropdown options
        cy.contains('Not Applicable').click();

        // Click the "Apply" button
        cy.contains('Apply').click();


        // Wait for the rows to load
        cy.wait(2000);

        // Select a specific customer name from the second row
        cy.get('tbody tr').find("td").eq(1).find("h3").invoke('text').then((text) => {
            const cellText = text.trim();  
            cy.log(cellText);  

            // Click on "Merge Customers" action, using force option to ensure the click goes through
            cy.get(":nth-child(1) > .text-center > .actions")
              .contains("Merge Customers")
              .click({ force: true });

            cy.wait(2000);

            // Open the dropdown container
            cy.get('[class="dropdown-heading-dropdown-arrow gray"]').click({ force: true });

            // Wait for the options to load, then select the option by its text
            cy.get('.options li').contains(cellText).dblclick({ force: true });

            // Assert that the selection was made correctly
            cy.get('.dropdown-heading-value').should('contain.text', cellText);

            // Optionally type and click on the dropdown value
           // cy.get('.dropdown-heading-value').type(cellText, { force: true }).click();

            // Click on the appropriate button to complete the merge
            cy.get('div[class="inline-block text-left"]').eq(4).click();
            cy.contains('button', 'Merge').click();

            // Assert the success toast message
            cy.assertToastMessage("Customer Merged Successfully");
        });
    });
});
