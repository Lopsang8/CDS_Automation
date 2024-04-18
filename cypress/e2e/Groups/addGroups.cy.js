import { fa, faker } from "@faker-js/faker";

describe("Groups", () => {
  beforeEach(() => {
    cy.login('lopsang@supportwebo.onmicrosoft.com', '>H^|u:~IwBF7L1{_e15')
    cy.wait(3000)
    cy.visit("/permissions/groups");
  });

  it("Verifies list of groups and Add A Group button", () => {
    cy.get(".other-accessories > .gap-x-2").contains("Add A Group").click();
  });

  it("Verifies validation for Group Name field", () => {
    cy.visit("/permissions/groups/add-a-group");
    cy.get(".group-input-status > :nth-child(1) > .block").should("be.visible");
    cy.get('[aria-label="Group Name"]').type("Testing.RandomGroup!");
    cy.errorMessage(
      " Group Name cannot contain any special characters except (', -, _)"
    );
  });

  it("Verifies atleast one user to be assigned to the group", () => {
    cy.visit("/permissions/groups/add-a-group");
    cy.get(".group-input-status > :nth-child(1) > .block").should("be.visible");
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
    cy.get(".group-input-status > :nth-child(1) > .block").should("be.visible");
    const rawGroupName = faker.internet.userName(2);
    const groupName = rawGroupName.replace(/[^a-zA-Z0-9'_-]/g, "");
    cy.get('[aria-label="Group Name"]').type(groupName);
    cy.get(".add-group-section").should("exist");

    function checkNotAssignedUsersOnFirstPage() {
      cy.get("tbody tr").each(($row) => {
        cy.wrap($row).within(() => {
          cy.get("td:nth-child(4)").then(($statusCell) => {
            const statusText = $statusCell.text().trim();
            if (statusText == "Not Assigned") {
              cy.get('td:nth-child(5) input[type="checkbox"]').check({
                force: true,
              });
              selectedUsers++;
              if (selectedUsers > 2) {
                return false;
              }
            }
          });
        });
      });
    }


    function goToNextPage() {
      cy.get('.pagination').then(($pagination) => {
        if ($pagination.find('.next').length > 0) {
          cy.get('.next').click();
          cy.wait(2000);
        } else {
          cy.log('No next page available.');
        }
      });
    }

    function checkNotAssignedUsersOnAllPages() {
      checkNotAssignedUsersOnFirstPage();
      cy.then(() => {
        goToNextPage();
      });
    }
    checkNotAssignedUsersOnAllPages();
    cy.get(".bg-success-500").should("exist").click();
    cy.assertToastMessage('The permissions field is required.The users field is required.');

  });


  it.only("Verifies permissions can be added and creating a group", () => {
    cy.visit("/permissions/groups/add-a-group");
    cy.get(".group-input-status > :nth-child(1) > .block").should("be.visible");
    const rawGroupName = faker.internet.userName(2);
    const groupName = rawGroupName.replace(/[^a-zA-Z0-9'_-]/g, "");

    cy.get('[aria-label="Group Name"]').type(groupName);
    cy.get(".add-group-section").should("exist"); //add group section

    const MAX_RECURSION_DEPTH = 6; // Maximum recursion depth
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
          cy.get('.next').click();
          cy.wait(2000);
        } else {
          cy.log('No next page available.');
        }
      });
    };

    const checkNotAssignedUsers = () => {
      findNotAssignedUsers();

      if (selectedUsers < 2 && currentRecursionDepth < MAX_RECURSION_DEPTH) {
        currentRecursionDepth++;
        goToNextPage();
        checkNotAssignedUsers(); // Recursively check on the next page
      } else {
        cy.log('Maximum recursion depth reached or 2 users selected.');
      }
    };

    checkNotAssignedUsers();

    cy.get(".bg-success-500").should("exist").click();
    cy.assertToastMessage("The permissions field is required.");
    cy.wait(3000);
    cy.get(".filter-wrap > .gap-x-2").click();
    // cy.get('[data-testid="add-permission-button"]').click();
    cy.wait(2000);
    cy.get("div.table-wrap").should("be.visible"); //permissions table
    cy.get("tbody tr").each(($row, index) => {
      if (index <= 5) {
        cy.get('td:nth-child(3) input[type="checkbox"]').check({ force: true });
      }
    });
    cy.get('td:nth-child(3) input[type="checkbox"]').should(
      "have.length.at.least",
      4
    );
    cy.get(".bg-success-500").should("exist").click();
    cy.wait(1000);
    cy.get(".bg-success-500").should("exist").click();
    cy.assertToastMessage("Group Created Successfully");
  })
})



