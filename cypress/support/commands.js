// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Admin Login API

Cypress.Commands.add('adminLogin', () => {
    cy.api({
        method: 'POST',
        url: Cypress.env('baseUrl') + '/admin/login',
        body: {
            username: Cypress.env('adminUserName'),
            password: Cypress.env('adminPassword')
        }
    }).then((response) => {
        const adminToken = response.headers['set-cookie'];
        localStorage.setItem('adminToken', adminToken);
        return adminToken;
    })
})

Cypress.Commands.add('userLogin', () => {
    cy.api({
        method: 'POST',
        url: Cypress.env('baseUrl') + '/auth/login',
        body: {
            email: Cypress.env('userEmail'),
            contact: Cypress.env('userContact'),
            password: Cypress.env('userPassword')
        }
    }).then((response) => {
        const userToken = response.headers['set-cookie'];
        localStorage.setItem('userToken', userToken);
        return userToken;
    })
})