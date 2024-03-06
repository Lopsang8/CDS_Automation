import { fa, faker } from "@faker-js/faker";

describe("Groups", () => {
  beforeEach(() => {
    cy.viewports(1920, 1080);
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
    var rawGroupName = faker.internet.userName(2);
    var groupName = rawGroupName.replace(/[^a-zA-Z0-9'_-]/g, "");
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
    var rawGroupName = faker.internet.userName(2);
    var groupName = rawGroupName.replace(/[^a-zA-Z0-9'_-]/g, "");
    cy.get('[aria-label="Group Name"]').type(groupName);
    cy.get(".add-group-section").should("exist"); //add group section

    let selectedUsers1 = 0; // Counter for selected users
    let stopChecking = false; // Flag to stop further checking

    function checkNotAssignedUsersOnCurrentPage1() {
      return cy.get("tbody tr").each(($row) => {
        // Collect data on the current page and select up to two "Not Assigned" users

        if (selectedUsers1 > 2 || stopChecking) {
          return false; // Stop checking when at least two "Not Assigned" users are selected or stopChecking is true
        }
        const $statusCell = $row.find("td:nth-child(4)");
        const statusText = $statusCell.text().trim();

        if (statusText == "Not Assigned") {
          const $checkbox = $row.find('td:nth-child(5) input[type="checkbox"]');
          cy.wrap($checkbox)
            .check({ force: true })
            .then(() => {
              selectedUsers1++;
            });
        }

        // cy.wrap($row).within(() => {
        //   return cy.get("td:nth-child(4)").then(($statusCell) => {
        //     const statusText = $statusCell.text().trim();

        //     if (statusText === "Not Assigned") {
        //       cy.get('td:nth-child(5) input[type="checkbox"]')
        //         .check({
        //           force: true,
        //         })
        //         .then(() => {
        //           // cy.wrap($checkbox).check({ force: true });
        //           selectedUsers1++;
        //         });
        //     }
        //   });
        // });
      });
    }

    function goToNextPage1() {
      cy.get('.pagination').then(($pagination) => {
        if ($pagination.find('.next').length > 0) {
          cy.get('.next').click();
          cy.wait(2000);
        } else {
          cy.log('No next page available.');
        }
      });
    }

    // function checkNotAssignedUsersOnAllPages1() {
    //   return checkNotAssignedUsersOnCurrentPage1().then(() => {
    //     if (selectedUsers1 < 2 && !stopChecking) {
    //       cy.then(() => {
    //         goToNextPage1().then(() => {
    //           return checkNotAssignedUsersOnAllPages1(); // Recursively check on the next page
    //         })
    //       })
    //     }
    //     else {
    //       stopChecking = true; // Stop checking when the "Next" button is disabled
    //     }
    //   });

    // }
    // checkNotAssignedUsersOnAllPages1();


    async function checkNotAssignedUsersOnAllPages1() {
      await checkNotAssignedUsersOnCurrentPage1();
    
      if (selectedUsers1 < 2 && !stopChecking) {
        await goToNextPage1();
        await checkNotAssignedUsersOnAllPages1(); // Recursively check on the next page
      } else {
        stopChecking = true; // Stop checking when the "Next" button is disabled
      }
    }
    
    cy.then(() => {
      checkNotAssignedUsersOnAllPages1();
    });

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
  });
});
