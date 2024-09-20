import 'cypress-wait-until';


// Custom command to log in
Cypress.Commands.add("login", () => {
  const email = 'lopsang@supportwebo.onmicrosoft.com';
  const password = '>H^|u:~IwBF7L1{_e15';
  cy.session([email, password], () => {
    cy.visit('/login');
    cy.wait(5000);

    cy.origin('https://login.microsoftonline.com/', { args: [email, password] }, ([emailArg, passwordArg]) => {
      cy.get('#i0116').type(emailArg);
      cy.get('#idSIButton9').click();
      cy.get('#i0118').type(passwordArg);
      cy.get('#idSIButton9').click();
      cy.get('#idSIButton9').click();
    });

    cy.url().should('contain', '/home');
    cy.log("Logged into the home page");
  },
    {
      cacheAcrossSpecs: true
    }
  )
  cy.visit('/')
})


Cypress.Commands.add('UpdateRefreshButton', () => {
  cy.get('body').then(($body) => {
    if ($body.find('#headlessui-dialog-panel-\\:r3\\:').length > 0) {
      cy.get('#headlessui-dialog-panel-\\:r3\\:').within(() => {
        cy.get('button').contains('Refresh Now').click();
        cy.wait(3000)
      })
    } else {
      cy.log("Versions are already upto date.")

    }
  })

})



Cypress.Commands.add('scanBarcodePopUp', () => {
  cy.get('body').then(($body) => {
    if ($body.find('#headlessui-dialog-panel-\\:rh\\: > .p-6').length > 0) {
      cy.get('#headlessui-dialog-panel-\\:rh\\: > .p-6').within(() => {
        cy.get('button').contains('Finish').click();
        cy.wait(3000)
      })
    } else {
      cy.log('Scan Barcode pop up did not show up.')

    }
  })

})




Cypress.Commands.add('search', (searchedData) => {
  cy.get('input[name="Search"]').should('be.visible').clear().type(searchedData);
  cy.wait(8000);

  cy.get('table tbody').then($tbody => {
    const noResult = $tbody.find('div.no-result').length > 0; // Check if a 'no-result' div exists
    const rows = $tbody.find('tr'); // Get all rows in the table

    // If there are no rows or the 'no-result' element is present, log that data was not found
    if (noResult && rows.length === 0) {
      cy.log(`Searched Data "${searchedData}" not found.`);
    } else {
      // Otherwise, check if the searched data is contained within the table rows
      cy.get('table tbody tr').then(($rows) => {
        const dataFound = $rows.toArray().some(row => row.innerText.includes(searchedData));

        if (dataFound) {
          cy.log(`Searched Data "${searchedData}" found.`);
        } else {
          cy.log(`Searched Data "${searchedData}" not found.`);
        }
      });
    }
  });
});




Cypress.Commands.add("viewports", (viewportWidth, viewportHeight) => {
  cy.viewport(viewportWidth, viewportHeight);
});




Cypress.Commands.add("assertToastMessage", (expectedText) => {
  cy.get(".Toastify")
    .should("exist")
    .and("have.text", expectedText);
})




Cypress.Commands.add("errorMessage", (expectedErrorMessage) => {
  cy.get(".error-message")
    .should("have.text", expectedErrorMessage);
})


const phoneCodes = ['02', '03', '04', '07', '08']
Cypress.Commands.add("australianPhoneNumber", () => {
  phoneCodes.forEach(code => {
    const randomPhoneNumber = Math.floor(
      10000000 + Math.random() * 90000000
    ).toString();
    const userValidPhoneNumber = code + randomPhoneNumber;
    cy.get('[placeholder="Phone Number"]').type(
      userValidPhoneNumber
    );

  })

})


Cypress.Commands.add('paymentMethod', (selectPaymentMethod) => {
  cy.contains('h2', 'Select the Payment Method').should('be.visible')
  if (selectPaymentMethod === 'Pay Now') {
    cy.get('#headlessui-tabs-tab-\\:rr\\: > .block > .flex > .pl-6').click();
  } else if (selectPaymentMethod === 'Pay Later') {
    cy.get('#headlessui-tabs-tab-\\:rs\\: > .block > .flex > .pl-6').click();
    cy.contains('button', 'Finish').should('be.visible').click()
    cy.assertToastMessage("Successfully created a new ticket")
  } else {
    throw new Error('Invalid payment method specified. Choose "Pay Now" or "Pay Later".')
  }

})



Cypress.Commands.add('paymentType', (selectPaymentType, selectPaymentOption) => {
  cy.contains('h2', 'Choose Payment Type').should('exist')
  if (selectPaymentType === 'full') {
    cy.get('#ticket_payment_full').click({ force: true });
  } else if (selectPaymentType === 'part') {
    cy.get('#ticket_payment_part').click({ force: true });
    const randomNumber = Math.floor(Math.random() * 500) + 1; // Generates a number between 1 and 500
    cy.get('input[placeholder="Enter Amount"]').type(randomNumber.toString());
  } else {
    throw new Error('Invalid payment type specified. Choose "full" or "part".');
  }

  cy.get('#headlessui-tabs-panel-\\:rt\\: > .p-6').should('be.visible')
  cy.log('Payment Type table is present.')
  if (selectPaymentOption === 'COH') {
    cy.get('#34').click({ force: true });
  } else if (selectPaymentOption === 'ECD') {
    cy.get('#35').click({ force: true });
  } else if (selectPaymentOption === 'EFTPOS') {
    cy.get('#36').click({ force: true });
  } else if (selectPaymentOption === 'EFT Request') {
    cy.get('#37').click({ force: true });
  } else if (selectPaymentOption === 'Paid By Accounts') {
    cy.get('#38').click({ force: true });
  } else {
    throw new Error('Invalid payment options specified. Choose "COH" or "ECD" or "EFTPOS" or "EFT Request" or "Paid By Accounts".');
  }

})


// // Custom command to preserve session
// Cypress.Commands.add("preserveSession", () => {
//   // Use cy.session to cache the session
//   cy.session('loginSession', () => {
//     cy.login();
//     cy.url().should('include', '/');
//     cy.wait(3000);  // Ensure the session is established
//   }, {
//     validate: () => {
//       cy.url().should('include', '');  // Validate session by checking the URL
//     }
//   });
// });




// Cypress.Commands.add("login", (email, password) => {
//   cy.session([email, password], () => {
//     cy.visit('/login')
//     // cy.visit('https://stg-cds.webo.dev/')
//     cy.wait(5000)

//     // let email = 'lopsang@supportwebo.onmicrosoft.com';
//     // let password = '>H^|u:~IwBF7L1{_e15'
//     cy.origin('https://login.microsoftonline.com/', 
//     { args: [email, password] }, 
//     ([email, password]) => {

//     cy.get('#i0116').type(email)
//     cy.get('#idSIButton9').click()
//     cy.get('#i0118').type(password)
//     cy.get('#idSIButton9').click();
//     // cy.authenticateWithCode();
//     cy.get('#idSIButton9').click();

//     });

//     cy.url().should('contain','/home')
//     cy.log("Contains the home page")
//   },
//   {
//     cacheAcrossSpecs: true
//   }
// )  
//   cy.visit('/')
// })



// Cypress.Commands.add("preserveSession", (email, password) => {
//   // Set up the session by logging in
//   cy.session([email, password], () => {
//     cy.login(email, password);    // Call the login command with parameters
//     console.log(email, password)
//     cy.url().should('include', '/');
//     cy.wait(3000)
//   })
// })


// // Authenticator code custom command
// const authenticatorCode = '954698'; 

// Cypress.Commands.add('authenticateWithCode', () => {
//   cy.once('window:rendered', () => {
//     cy.window().then((win) => {
//       const body = win.document.body;
//       const inputField = win.document.querySelector('input[type="text"]');
//       if (inputField) {
//         inputField.value = authenticatorCode;
//         inputField.dispatchEvent(new Event('input', { bubbles: true }));
//         const submitButton = win.document.querySelector('button[type="submit"]');
//         if (submitButton) {
//           submitButton.click();
//         }
//       } else {
//         cy.log('Authenticator code input field not found');
//       }
//     });
//   });
// });








// Custom command to visit the edit location page
Cypress.Commands.add("visitEditLocationPage", (id) => {
  cy.visit(`https://dev-sellandparker.webo.dev/locations/${id}/edit`);
});



// Custom command to fetch location data from the database
Cypress.Commands.add("requestLocation", (uuid) => {
  return cy.request({
    method: "GET",
    url: `https://be-cds.webo.dev/api/v1/locations/${uuid}`,
  }).then((response) => response.body);
});




import { generateValues, locationName, locationEmail, validPhoneNumber, siteCode } from './shared';

Cypress.Commands.add('generateAndStoreValues', () => {
  generateValues();
  cy.state('locationName', locationName);
  cy.state('locationEmail', locationEmail);
  cy.state('validPhoneNumber', validPhoneNumber);
  cy.state('siteCode', siteCode);
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })




