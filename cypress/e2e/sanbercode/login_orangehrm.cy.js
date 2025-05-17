/// <reference types="cypress" />
//intercept
context('Login', () => {
    beforeEach(() => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    })
    
    it('UI login page', () => {
      cy.url().should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
      cy.get('.orangehrm-login-branding > img').should('be.visible')  
      cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title').should('be.visible').contains('Login')
      cy.get('.oxd-sheet').should('contain.text', 'Username : Admin').and('contain.text', 'Password : admin123'); //mengandung dua contains
      cy.get(':nth-child(2) > .oxd-input-group > .oxd-input-group__label-wrapper > .oxd-label').should('be.visible').contains('Username')
      cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').should('be.visible').and('have.attr', 'placeholder', 'Username') //username
      cy.get(':nth-child(3) > .oxd-input-group > .oxd-input-group__label-wrapper > .oxd-label').should('be.visible').contains('Password')
      cy.get('input[placeholder="Password"]').should('be.visible').and('have.attr', 'placeholder', 'Password') //password
      cy.get('button[type="submit"]').should('be.visible').contains('Login')
      cy.get('.oxd-text.oxd-text--p.orangehrm-login-forgot-header').should('be.visible').contains('Forgot your password?')
    })

    it('empty field username and password', () => {
      cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').clear()
      cy.get('input[placeholder="Password"]').clear()
      cy.get('button[type="submit"]').click()        
      cy.get(':nth-child(2) > .oxd-input-group > .oxd-text').should("be.visible").contains("Required")
      cy.get(':nth-child(3) > .oxd-input-group > .oxd-text').should("be.visible").contains("Required")
    })

    it('empty field username', () => {
      cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').clear()
      cy.get('input[placeholder="Password"]').clear().type('admin123')
      cy.get('button[type="submit"]').click()        
      cy.get(':nth-child(2) > .oxd-input-group > .oxd-text').should("be.visible").contains("Required")
      cy.get(':nth-child(3) > .oxd-input-group > .oxd-text').should("not.exist")
    })

    it('empty field password', () => {

      cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').clear().type('Admin')
      cy.get('input[placeholder="Password"]').clear()
      cy.get('button[type="submit"]').click()        
      cy.get(':nth-child(2) > .oxd-input-group > .oxd-text').should("not.exist")
      cy.get(':nth-child(3) > .oxd-input-group > .oxd-text').should("be.visible").contains("Required")
    })

    it.only('wrong username and password', () => {
      cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').clear().type('Admin123')
      cy.get('input[placeholder="Password"]').clear().type('Admin')
      cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('login')
      cy.get('button[type="submit"]').click()
      cy.wait('@login')
      cy.get('.oxd-alert-content > .oxd-text').should('be.visible').contains('Invalid credentials')
    })

    it.only('wrong username and right password', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

      cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').clear().type('Admin123')
      cy.get('input[placeholder="Password"]').clear().type('admin123')
      cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('login')
      cy.get('button[type="submit"]').click()
      cy.wait('@login')        
      cy.get('.oxd-alert-content > .oxd-text').should('be.visible').contains('Invalid credentials')
    })

    it.only('right username and wrong password', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

      cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').clear().type('Admin')
      cy.get('input[placeholder="Password"]').clear().type('Admin123')
      cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('login')
      cy.get('button[type="submit"]').click()
      cy.wait('@login')        
      cy.get('.oxd-alert-content > .oxd-text').should('be.visible').contains('Invalid credentials')
    })

    it.only('valid login', () => {
      cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').clear().type('Admin')
      cy.get('input[placeholder="Password"]').clear().type('admin123')
      cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('login')
      cy.get('button[type="submit"]').click()
      cy.wait('@login')        
      cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').should('be.visible')
      cy.url().should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')
    })
  })
  