import { generateValues, locationEmail, locationName, siteCode, validPhoneNumber } from '../../support/shared';
// import '../../support/commands';
// import { generateValues } from '../../support/shared';


describe(" Add Location", () => {
  beforeEach(() => {
    cy.login('')
    cy.wait(2000)
    cy.UpdateRefreshButton()
    cy.wait(2000)
    cy.visit("/locations");
  });




  it("Verifies locations list view and Add A Location button", () => {
    // cy.get('[aria-label="Add A Location"]').click();
    cy.get("button.bg-primary-700").contains("Add A Location").click();
    cy.log("Location lists and Add A Location button is present");
  });




  it("Verifies validation for Locations required fields", () => {
    cy.get("button.bg-primary-700").contains("Add A Location").click();
    cy.get("#locationName").should("be.visible");
    // cy.get('h2.text-neutral-500.font-semibold.text-lg.mb-6')
    cy.get(".border-b > .text-neutral-500").should(
      "have.text",
      "Location Details"
    );
    cy.get("#locationName").click().type("Testing.RandomLocation!");
    cy.get("#email").click();
    cy.wait(2000);
    cy.errorMessage(
      " Location Name can't contain any special characters"
    );
    cy.log(
      "Location Name can't contain any special characters validation is working"
    );
    cy.get("#locationName").click().clear();
    cy.get("#email").click();
    cy.wait(3000);
    cy.errorMessage(
      " Location name is required * Email is required *"
    );
    cy.log(
      "Location name is required and Email is required validation is working"
    );
    cy.get(".add-locations > :nth-child(1) > :nth-child(2) > .text-lg").should(
      "be.visible"
    );
    cy.get(".bg-success-500").should("exist").click();
  });

  before(() => {
    generateValues();

  })

  it("Verifies creating a Location", () => {
    cy.get("button.bg-primary-700").contains("Add A Location").click();
    cy.get("#locationName").should("be.visible");
    cy.get("#locationName").type(locationName)
    cy.get("#email").type(locationEmail);
    cy.get('[placeholder="Phone Number"]').type(validPhoneNumber);
    cy.get('#siteCode').type(siteCode)


    cy.log(locationName, locationEmail, validPhoneNumber, siteCode)

    cy.get(".add-locations > :nth-child(1) > :nth-child(2)").should(
      "be.visible"
    );
    cy.get(".add-location-groups").should("be.visible");
    cy.get("tbody tr").then(($rows) => {
      // Generates two random indices within the range of available rows
      const randomIndices = [];
      while (randomIndices.length < 2) {
        const randomIndex = Math.floor(Math.random() * $rows.length);
        if (!randomIndices.includes(randomIndex)) {
          randomIndices.push(randomIndex);
        }
      }

      // Checks the checkboxes for the randomly selected rows
      randomIndices.forEach((randomIndex) => {
        const $row = $rows.eq(randomIndex);
        cy.wrap($row).within(() => {
          cy.get(':nth-child(2) input[type="checkbox"]').check({
            force: true,
          });
        });
      });
    });
    // cy.get("#headlessui-tabs-tab-\\:r1\\:")
    //   .invoke("removeAttr", "target")
    //   .click();
    // cy.wait(2000);
    // cy.get("tbody tr").then(($rows) => {
    //   const randomIndicesUsers = [];
    //   while (randomIndicesUsers.length < 2) {
    //     const randomIndexUsers = Math.floor(Math.random() * $rows.length);
    //     if (!randomIndicesUsers.includes(randomIndexUsers)) {
    //       randomIndicesUsers.push(randomIndexUsers);
    //     }
    //   }

    //   randomIndicesUsers.forEach((randomIndexUsers) => {
    //     const $row = $rows.eq(randomIndexUsers);
    //     cy.wrap($row).within(() => {
    //       cy.get('td:nth-child(4) input[type="checkbox"]').check({
    //         force: true,
    //       });
    //     });
    //   });
    // });
    cy.get(".bg-success-500").should("exist").click();
    cy.assertToastMessage("Location Created Successfully");
    cy.log("Location created successfully");
  });


  // after(() => {
  //   cy.exec('npm run test:edit',  { failOnNonZeroExit: false })
  // })


});
