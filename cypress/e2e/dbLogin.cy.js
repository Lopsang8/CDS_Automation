
describe('Login to phpMyAdmin', () => {
    it('should login successfully', () => {
      
      cy.visit('https://cdsdev-phpmyadmin.intuji.dev/phpmyadmin/');
  
      // Enter username and password
      cy.get('#input_username').type('cds-dev');
      cy.get('#input_password').type('Cdsd3v@123');
  
      // Click the login button
      cy.get('#input_go').click();
  
      // cy.get('#dashboard-element').should('exist');
    });
  });
  