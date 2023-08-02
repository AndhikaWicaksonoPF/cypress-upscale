/// <reference types="cypress" />

describe('End-to-End Testing - Validate Login', { testIsolation: false }, () => {
    beforeEach('Open application', () => {
        cy.visit('https://upscale.edudev.xyz/')
    })

    it('Should register as Talents', () => {
        cy.contains('Join as Talent').click()

        cy.contains('Register as Talent').should('be.visible')
        cy.get('#register_main > :nth-child(1) > .row > .col-md-8 > .form-control').type('John Doe')
        cy.get(':nth-child(2) > .row > .col-md-8 > #Email').type('johndoe@newmail.com')
        cy.get('#register_main > :nth-child(3) > .row > .col-md-8 > .form-control').type('pass123')
        cy.get(':nth-child(4) > .row > .col-md-8 > #Password2').type('pass123')
        cy.get('#country_code').select('Indonesia (+62)').should('have.value', '62')
        cy.get('#refrensi').type('Telegram')
        cy.get('.next-first').click()
    })

    it('Trying to Login With Unregistered Account', () => {
        cy.get('[class="btn btn-border btn-login btn-xs light"]').click()
        cy.get('[class="modal-content"]').should('be.visible')
        cy.get('#email').type('andhikawicak@gmail.com')
        cy.get('#Password').type('Keiros20')
        cy.get('#login').click()
        cy.contains('Invalid username or password!').should('be.visible')
        cy.get('#email').clear()
        cy.get('#Password').clear()
    })

    it('Trying to Login With registered Account', () => {
        cy.get('[class="btn btn-border btn-login btn-xs light"]').click()
        cy.get('[class="modal-content"]').should('be.visible')
        cy.get('#email').type('johndoe@newmail.com')
        cy.get('#Password').type('pass123')
        cy.get('#login').click()
    })

    it('Should display For Business content', () => {
        cy.contains('For Business').click()
        cy.url().should('include', 'help-business')
        cy.get('h1').should('be.visible')
        cy.get('[class="slide-title3"]').should('include.text', ' Service kami cocok untuk membantu berbagai skala perusahaan')
    })

    it('Should display For Talent content', () => {
        cy.contains('For Talent').click()
        cy.url().should('include', 'help-talent')
        cy.get('h1').should('be.visible')
        cy.get('#desc-talent').should('include.text', 'Upgrade kemampuan dan networkmu')
    })

    it('Should display Home content', () => {
        cy.contains('Home').click()
        cy.get('h2').should('be.visible')
        cy.get('[class="slide-title2"]').should('include.text', 'Kami membantu meng-handle semua urusan "talent", agar anda dapat fokus pada pengembangan bisnis')
    })

})