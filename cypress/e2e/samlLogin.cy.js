// import './commands'

describe("Login", () => {
    beforeEach(() => {
        cy.viewport(1920,1080)
        cy.visit('/')
        cy.login('lopsang@supportwebo.onmicrosoft.com','>H^|u:~IwBF7L1{_e15')
        
    })


    it("verifies the login process in the CDS system with microsoft account", () => {
        // cy.login('lopsang@supportwebo.onmicrosoft.com','>H^|u:~IwBF7L1{_e15')
        cy.log("Logged in successfully")   
       
    })

    it("Verifies that the home page can be seen after successful login", () => {
        cy.get('img[alt="Scrap Assist Logo"]');
    })

    it("Verifies that that the logged in user is the correct user", () => {
        cy.get(':nth-child(3) > .flex > .text-neutral-500').click()
        cy.get('#email').invoke('val')
        .then((actualText) => {
            expect(actualText).to.equal('lopsang@supportwebo.onmicrosoft.com')        
        });
    })



})
