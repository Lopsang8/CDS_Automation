import '../../support/commands';


describe("Login", () => {

    beforeEach(() => {
       cy.login()   
       cy.wait(2000)   
       cy.UpdateRefreshButton()
       cy.wait(2000)  
    })

    it("verifies the login process in the CDS system with microsoft account", () => {
        cy.get('#side_nav').should('be.visible') 
        cy.log('Nav bar is present')        
    })


    it("Verifies that the home page can be seen after successful login", () => {
        cy.get('.flex-row > .font-bold')
        cy.log('Logo is present')
        
    })


    it("Verifies that that the logged in user is the correct user", () => {
        cy.get(':nth-child(3) > .flex > .text-neutral-500').first().click({force: true})
        cy.waitUntil(() => {
            return cy.get('#email').should('be.visible').
            invoke('val')
              .then((actualText) => { 
            expect(actualText).to.equal('lopsang@supportwebo.onmicrosoft.com')        
        });
        })
        
    })



})

