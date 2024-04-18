// describe("Location", () => {
//   let locationId;

//     beforeEach(() => {
//       // Creates a new location and store its ID
//       createTestLocation().then((uuid) => {
//         locationId = uuid;
//       });
//     });
  
//     it("should validate data from the database when editing a location", () => {
//       cy.visitEditLocationPage(id);
  
//       // Retrieves the data displayed on the edit location page
//       cy.get("#locationName").invoke("val").as("locationName");
//       cy.get("#email").invoke("val").as("email");
//       cy.get('[placeholder="04XX XXX XXX or 05XX XXX XXX"]').invoke("val").as("phone");
//       cy.get(':nth-child(4) > .relative > .slider').invoke("val").as("status");
  
//       // Fetches the data from the database for the same location
//       cy.requestLocation(locationId).then((dbLocation) => {
//         // Compares the data retrieved from the database with the entered data
//         cy.get("@locationName").should("eq", dbLocation.name);
//         cy.get("@email").should("eq", dbLocation.email);
//         cy.get("@phone").should("eq", dbLocation.phone);
//         cy.get("@status").should("eq", dbLocation.status);
//       });
//     });
  
//     // Custom command to create a test location and return its ID
//     function createTestLocation() {
//       return cy.request({
//         method: "POST",
//         url: "https://be-cds.webo.dev/api/v1/locations",
//         body: {
//           name: "Test Location8",
//           email: "testlocation8@gmail.com",
//           phone: "0556655162",
//           status: 0,
//           created_by: 1,
//           roles: [1, 6, 9],
//           users: [5, 8, 6],
//         },
//       }).then((response) => response.body.uuid);
//     }
  
    
//   });
  

  // beforeEach(() => {
  //   cy.request({
  //     method: "POST",
  //     url: "https://be-cds.webo.dev/api/v1/locations",
  //     body: {
  //       name: "Test Location5",
  //       email: "testlocation5@gmail.com",
  //       phone: "0556655152",
  //       status: 0,
  //       created_by: 1,
  //       roles: [1, 6, 9],
  //       users: [5, 8, 6],
  //     },
  //   }).then((response) => {
  //     locationId = response.body.uuid;
  //   });
  // });

  // it("should validate data from the database when editing a location", () => {
  //   cy.visit(`https://dev-sellandparker.webo.dev/locations/${locationId}/edit`);

  //   // Retrieves the data displayed on the edit location page
  //   cy.get("#locationName").invoke("val").as("locationName");
  //   cy.get("#email").invoke("val").as("email");
  //   cy.get('[placeholder="04XX XXX XXX or 05XX XXX XXX"]').invoke("val").as("phone");
  //   cy.get(':nth-child(4) > .relative > .slider').invoke("val").as("status");   

  //   // Fetches the data from the database for the same location
  //   cy.request({
  //     method: "GET",
  //     url: `https://be-cds.webo.dev/api/v1/locations/${locationId}`,
  //   }).then((response) => {
  //     const dbLocation = response.body;

  //     // Compares the data retrieved from the database with the entered data
  //     cy.get("@locationName").should("eq", dbLocation.name);
  //     cy.get("@email").should("eq", dbLocation.email);
  //     cy.get("@phone").should("eq", dbLocation.phone);
  //     cy.get("@status").should("eq", dbLocation.status);
      
  //   });
  // });

