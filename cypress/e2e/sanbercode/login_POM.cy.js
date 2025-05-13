// cypress/e2e/login.cy.js

import LoginPage from '../../support/pages/LoginPage';

describe('Login Test - OrangeHRM', () => {
  const loginPage = new LoginPage();

  it.only('should login successfully with valid credentials', () => {
    loginPage.visit();
    loginPage.loginAs('Admin', 'admin123');
    loginPage.verifyDashboardVisible();
  });
});
