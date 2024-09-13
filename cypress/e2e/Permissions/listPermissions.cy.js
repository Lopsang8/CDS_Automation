
describe("Permissions", () => {

  beforeEach(() => {
    cy.login('')
    cy.wait(2000)
    cy.UpdateRefreshButton()
    cy.wait(2000)
    cy.visit("/permissions/groups");
    cy.get("#headlessui-tabs-tab-\\:r3\\:")
      .invoke("removeAttr", "target")
      .click();
  });


  it("Verifies permissions list view", () => {
    cy.get("#headlessui-tabs-tab-\\:r3\\:")
      .invoke("removeAttr", "target")
      .click();
  });


  it("Verifies search button is present in permissions tab", () => {
    cy.get('input[name="Search"]').click().type("CDS Ticket Functions");
  });


  it("Verifies searched function/permission name is present", () => {
    const permissionsList = [
      'Override Duplicate ABN check',
      'Bypass All FOB Permissions',
      'Cancel Completed Payments',
      'Cancel Pending Payments',
      'Cancel Payment In-Batch',
      'Cancel Payment Batch',
      'Save Customers To File',
      'Accounts Payment',
      'View Activity Log',
      'CDS Ticket Functions',
      'Mark As Paid Payment',
      'View Ticket Log',
      'View Payment Log',
      'View Invoice Log',
      'View Customer Log',
      'Save Payments to File',
      'Save Invoices to File',
      'Save CDS Tickets To File',
      'Reports',
      'Payments',
      'Part Payments',
      'Metals',
      'Generate Bank File',
      'EFTPOS Payments',
      'EFT Request',
      'ECD Payments',
      'Customers',
      'Customer Update',
      'Customer RCTI View',
      'Customer RCTI Verify',
      'Customer Merge',
      'Customer EFT Verify',
      'Customer Archive',
      'Customer ABN Verify',
      'Cash Payments',
      'Cancel Tickets',
      'Cancel Invoices',
      'CDS Ticket Create',
      'CDS Qty Override',
      'CDS Customer Price',
      'Batch Payments',
      'Administrators'
    ];


    let allPermissionsPresent = true; 
    cy.get('input[name="Search"]').click().type("{selectall}{backspace}");
    permissionsList.forEach(permission => {
      cy.get('input[name="Search"]').click().type(permission)
      cy.wait(2000);
      cy.get('tr').then($table => {
        if ($table.find(`td:contains(${permission})`).length === 0) {
          allPermissionsPresent = false; // Mark as false if permission is missing
        }
      });
      
      cy.get('input[name="Search"]').clear();
    })
    cy.then(() => {
      if (allPermissionsPresent) {
        cy.log('All permissions are present');
      } else {
        cy.log('Some permissions are missing');
        throw new Error('Some permissions are missing'); // Fails the test if not all permissions are found
      }
    });
   
  });


});

