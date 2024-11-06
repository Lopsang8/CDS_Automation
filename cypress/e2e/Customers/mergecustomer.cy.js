describe("Customers", () => {
    beforeEach(() => {
        cy.login(); // Assuming a custom login command
        cy.wait(2000); // Wait for any necessary loading
        cy.UpdateRefreshButton(); // Assuming a custom refresh command
        cy.wait(2000); // Wait for the page to refresh
        cy.visit('/customers'); // Navigate to the customers page
    });



    it("Opens dropdown and selects 'Not Applicable' customer and merge them", () => {
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
        cy.get('tbody tr').eq(1).find("td").eq(1).find("h3").invoke('text').then((text) => {
            const cellText = text.trim();  
            cy.log(cellText);  

            // Click on "Merge Customers" action, using force option to ensure the click goes through
            cy.get(":nth-child(1) > .text-center > .actions")
              .contains("Merge Customers")
              .click({ force: true });

            cy.wait(2000);

            // Open the dropdown container
            cy.get('[class="dropdown-heading-dropdown-arrow gray"]').dblclick({ force: true });
           cy.mergeSearch(cellText)
        });
    });


    

    it("Opens dropdown and selects Verified customer and merge them", () => {
        // Click on the 'Filter' button to open the filter options
        cy.contains('Filter').click(); 
        cy.wait(200)
    
        // Open the dropdown
        cy.get('.select-box button#headlessui-listbox-button-\\:rf\\:').click();

        // Select "Verified" from the dropdown options
        cy.contains('Verified').click();
    
        // Click the "Apply" button
        cy.contains('Apply').click();
    
        // Wait for the rows to load
        cy.wait(2000);
    
        // Select a specific customer name from the second row
        cy.get('tbody tr').eq(1).find("td").eq(1).find("h3").invoke('text').then((text) => {
            const cellText = text.trim();  
            cy.log(cellText);  
    
            // Click on "Merge Customers" action, using force option to ensure the click goes through
            cy.get(":nth-child(1) > .text-center > .actions")
              .contains("Merge Customers")
              .click({ force: true });
    
            cy.wait(2000);
    
            // Open the dropdown container
            cy.get('[class="dropdown-heading-dropdown-arrow gray"]').dblclick({ force: true });
    
            // Use cell text in merge search
            cy.mergeSearch(cellText);
        });
    });

    
});
