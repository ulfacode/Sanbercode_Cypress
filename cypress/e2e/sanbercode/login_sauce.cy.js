/// <reference types="cypress" />

context('Login', () => {
  
    it('tc1-valid login', () => {
      cy.visit('https://www.saucedemo.com/v1/')

      cy.get('#user-name').clear().type('standard_user')
      cy.get('input[placeholder="Password"]').clear().type('secret_sauce')
      cy.get('button[type="login"]').click()
        
      cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').should('be.visible')
    })
  })
  