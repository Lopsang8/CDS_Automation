// import './commands'

describe("Login", () => {
    beforeEach(() => {
        cy.viewport(1920,1080)
        cy.visit('/login')
        cy.wait(5000)
        

        
    })


    it("verifies the login process in the CDS system with microsoft account", () => {
        cy.login('lopsang@supportwebo.onmicrosoft.com','>H^|u:~IwBF7L1{_e15')
        cy.log('Test')
    })


})
