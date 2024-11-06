import { fa, faker } from "@faker-js/faker";

describe("Add Group", () => {
  beforeEach(() => {
    cy.login('')
    cy.wait(2000)
    cy.UpdateRefreshButton()
    cy.wait(2000)
    cy.visit("/permissions/groups");
  });



  it("Verifies list of groups and Add A Group button", () => {
    cy.get('div.permissionsgroups').should('be.visible')
    cy.get('div.other-accessories button').contains("Add A Group").click();
  });



  it("Verifies validation for Group Name field", () => {
    cy.visit("/permissions/groups/add-a-group");
    cy.get('.add-a-group').should("be.visible");
    cy.get('[aria-label="Group Name"]').type("Testing.RandomGroup!");
    cy.errorMessage(
      " Group Name cannot contain any special characters except (', -, _)"
    );
    cy.get('label.switch span').should('be.visible')   //toggle button should be visible
  });




  it("Verifies atleast one user to be assigned to the group", () => {
    cy.visit("/permissions/groups/add-a-group");
    cy.get('.add-a-group').should("be.visible");
    var rawGroupName = faker.internet.userName(2);
    var groupName = rawGroupName.replace(/[^a-zA-Z0-9'_-]/g, "");
    cy.get('[aria-label="Group Name"]').type(groupName);
    cy.get(".add-group-section").should("exist");
    //getting not assigned user
    // cy.get(".text-success-600")
    //   .should("be.visible")
    //   .get('span.slider[aria-selected="false"]');
    cy.get(".bg-success-500").should("exist").click();
    cy.wait(3000);
    cy.assertToastMessage(
      "The permissions field is required.The users field is required."
    );
  });



  
  it("Verifies permissions are required validation and redirecting to Permissions tab", () => {
    cy.visit("/permissions/groups/add-a-group");
    cy.get('.add-a-group').should("be.visible");
    const rawGroupName = faker.internet.userName(2);
    const groupName = rawGroupName.replace(/[^a-zA-Z0-9'_-]/g, "");

    cy.get('[aria-label="Group Name"]').type(groupName);
    cy.get(".add-group-section").should("exist"); // Ensure add group section exists

    const MAX_RECURSION_DEPTH = 6; // Maximum recursion depth for pagination
    let selectedUsers = 0; // Counter for selected users
    let currentRecursionDepth = 0; // Current recursion depth

    const findNotAssignedUsers = () => {
      cy.get('thead th')
        .contains('Status')
        .then(($statusHeader) => {
          const statusColumnIndex = $statusHeader.index() + 1;

          cy.get("tbody tr").each(($row) => {
            // Stop checking when at least two "Not Assigned" users are selected
            if (selectedUsers >= 2) {
              return false;
            }

            const $statusCell = $row.find(`td:nth-child(${statusColumnIndex})`);
            cy.wrap($statusCell)
              .invoke('text')
              .then((statusText) => {
                const isNotAssigned = statusText.trim() === 'Not Assigned';
                if (isNotAssigned) {
                  const $checkbox = $row.find('td:nth-child(5) input[type="checkbox"]');
                  cy.wrap($checkbox)
                    .check({ force: true })
                    .then(() => {
                      selectedUsers++;
                    });
                }
              });
          });
        });
    };

    const goToNextPage = () => {
      cy.get('.pagination').then(($pagination) => {
        if ($pagination.find('.next').length > 0) {
          cy.get('.next').click(); // Click to go to next page
          cy.wait(2000); // Wait for the next page to load
        } else {
          cy.log('No next page available.');
        }
      });
    };

    const checkNotAssignedUsers = () => {
      findNotAssignedUsers();

      // Continue checking if fewer than 2 users are selected and recursion depth is below limit
      if (selectedUsers < 2 && currentRecursionDepth < MAX_RECURSION_DEPTH) {
        currentRecursionDepth++;
        goToNextPage();
        cy.wait(1000); // Wait for pagination action to complete
        checkNotAssignedUsers(); // Recursively check on the next page
      } else {
        cy.log('Maximum recursion depth reached or 2 users selected.');
      }
    };

    // Start checking for 'Not Assigned' users
    checkNotAssignedUsers();

    
    cy.get(".bg-success-500").should("exist").click(); // Proceed after selecting users

    // Assert if the permissions field is required
    cy.assertToastMessage("The permissions field is required.");
    cy.wait(3000);
    cy.get('div.add-group-permission button').click(); 

    cy.wait(2000);
    cy.get("div.table-wrap").should("be.visible"); // Ensure permissions table is visible

    // Select permissions 
    cy.get("tbody tr").each(($row, index) => {
      if (index <= 5) {
        cy.get('td:nth-child(3) input[type="checkbox"]').check({ force: true });
      }
    });

    cy.get('td:nth-child(3) input[type="checkbox"]').should(
      "have.length.at.least",
      4
    ); // Assert that at least 4 permissions are selected

    // Proceed with group creation
    cy.get(".bg-success-500").should("exist").click();
    cy.wait(1000);
    cy.get(".bg-success-500").should("exist").click();

    // Assert the group is successfully created
    cy.assertToastMessage("Group Created Successfully");
  });
})

