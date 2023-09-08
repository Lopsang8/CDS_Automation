import { fa, faker } from "@faker-js/faker";

const viewportWidth = 1920;
const viewportHeight = 1080;

describe("Groups", () => {
  beforeEach(() => {
    cy.viewport(viewportWidth, viewportHeight);
    cy.visit("/permissions/groups");
  });

  it("Verifies list of groups and Add A Group button", () => {
    cy.get(".other-accessories > .gap-x-2").contains("Add A Group").click();
  });

  it("Verifies validation for Group Name field", () => {
    cy.visit("/permissions/groups/add-a-group");
    cy.get(".group-input-status > :nth-child(1) > .block").should("be.visible");
    cy.get('[aria-label="Group Name"]').type("Testing.RandomGroup!");
    cy.get(".error-message")
      // .wait(5000)
      .should(
        "have.text",
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
    cy.wait(2000);
    cy.get(".Toastify")
      .should("exist")
      .should(
        "have.text",
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
    let selectedUsers = 0;
    function checkNotAssignedUsersOnFirstPage() {
      cy.get("tbody tr").each(($row) => {
        cy.wrap($row).within(() => {
          cy.get("td:nth-child(4)").then(($statusCell) => {
            const statusText = $statusCell.text().trim();
            if (statusText === "Not Assigned") {
              cy.get('td:nth-child(5) input[type="checkbox"]').check({
                force: true,
              });
              selectedUsers++;
              if (selectedUsers <= 2) {
                return false;
              }
            }
          });
        });
      });
    }
    function goToNextPage() {
      cy.get(".next").should("exist").click();
      cy.wait(2000);
    }
    function checkNotAssignedUsersOnAllPages() {
      checkNotAssignedUsersOnFirstPage();
      cy.get(".next")
        .should("exist")
        .then(($nextButton) => {
          if ($nextButton.is(":enabled")) {
            goToNextPage();
          }
        });
    }
    checkNotAssignedUsersOnAllPages();
    cy.get(".bg-success-500").should("exist").click();
    cy.get(".Toastify")
      .should("exist")
      .should("contain.text", "The permissions field is required.");
  });

  it("Verifies permissions can be added and creating a group", () => {
    cy.visit("/permissions/groups/add-a-group");
    cy.get(".group-input-status > :nth-child(1) > .block").should("be.visible");
    var rawGroupName = faker.internet.userName(2);
    var groupName = rawGroupName.replace(/[^a-zA-Z0-9'_-]/g, "");
    cy.get('[aria-label="Group Name"]').type(groupName);
    cy.get(".add-group-section").should("exist");
    
    let selectedUsers1 = 0;
    let stopChecking = false;

    function checkNotAssignedUsersOnCurrentPage1() {
      return cy.get("tbody tr").then(($rows) => {
        // Collect data on the current page and select up to two "Not Assigned" users
        $rows.each((index, $row) => {
          if (selectedUsers1 <= 2 || stopChecking) {
            return false; // Stop checking when at least two "Not Assigned" users are selected or stopChecking is true
          }

          const $statusCell = $row.querySelector("td:nth-child(4)");
          const statusText = $statusCell.textContent.trim();

          if (statusText === "Not Assigned") {
            const $checkbox = $row.querySelector(
              'td:nth-child(5) input[type="checkbox"]'
            );
            cy.wrap($checkbox).check({ force: true });
            selectedUsers1++;
          }
        });
      });
    }

    function goToNextPage1() {
      return cy.get(".next").should("exist").click();
    }

    function checkNotAssignedUsersOnAllPages1() {
      return checkNotAssignedUsersOnCurrentPage1().then(() => {
        if (selectedUsers1 < 2 && !stopChecking) {
          cy.get(".next")
            .should("exist")
            .then(($nextButton) => {
              if ($nextButton.is(":enabled")) {
                return goToNextPage1().then(() => {
                  return checkNotAssignedUsersOnAllPages1(); // Recursively check on the next page
                });
              } else {
                stopChecking = true; // Stop checking when the "Next" button is disabled
              }
            });
        }
      });
    }

    checkNotAssignedUsersOnAllPages1();

    cy.get(".bg-success-500").should("exist").click();
    cy.get(".Toastify")
      .should("exist")
      .should("contain.text", "The permissions field is required.");
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
      5
    );
    cy.get(".bg-success-500").should("exist").click();
    cy.wait(1000);
    cy.get(".bg-success-500").should("exist").click();
    cy.get(".Toastify")
      .should("exist")
      .should("have.text", "Group Created Successfully");
    console.log("Group Created Successfully");
  });
});
