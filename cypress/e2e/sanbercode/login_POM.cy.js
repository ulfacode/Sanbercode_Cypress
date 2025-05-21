// cypress/e2e/login.cy.js

import LoginPage from '../../support/pages/LoginPage';
import LoginData from '../../fixtures/loginData.json';

describe('Login Test - OrangeHRM', () => {
  const loginPage = new LoginPage();

  it('should show error message for invalid credentials', () => {
    loginPage.visit();
    loginPage.loginAs(LoginData.invalid.username, LoginData.invalid.password);
    cy.get('.oxd-alert-content > .oxd-text').should('be.visible').contains('Invalid credentials');
  });

  it('should show error message for empty username', () => {
    loginPage.visit();
    loginPage.enterPassword(LoginData.valid.password);
    loginPage.clickLogin();
    cy.get(':nth-child(2) > .oxd-input-group > .oxd-text').should('be.visible').contains('Required');
  });

  it('should show error message for empty password', () => {
    loginPage.visit();
    loginPage.enterUsername(LoginData.valid.username);
    loginPage.clickLogin();
    cy.get(':nth-child(3) > .oxd-input-group > .oxd-text').should('be.visible').contains('Required');
  });

  it('should show error message for empty username and password', () => {
    loginPage.visit();
    loginPage.clickLogin();
    cy.get(':nth-child(2) > .oxd-input-group > .oxd-text').should('be.visible').contains('Required');
    cy.get(':nth-child(3) > .oxd-input-group > .oxd-text').should('be.visible').contains('Required');
  });

  it('should login successfully with valid credentials', () => {
    loginPage.visit();
    loginPage.loginAs(LoginData.valid.username, LoginData.valid.password);
    loginPage.verifyDashboardVisible();
  });

});
