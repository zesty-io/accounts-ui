describe('User gets failed login message', function() {
  it('Log in fails with bad credentials', function() {
    cy.visit(Cypress.env('ACCOUNTS_UI'))
    cy.get('#root > section > div > main > form > label:nth-child(1) > input')
      .type(Cypress.env('invalidEmail'))
      .should('have.value', Cypress.env('invalidEmail'))
    cy.get('#root > section > div > main > form > label:nth-child(2) > input')
      .type(Cypress.env('invalidPassword'))
      .should('have.value', Cypress.env('invalidPassword'))
    cy.get('button').click()
    cy.get('#root > section > div > main > form > p').should(
      'contain',
      'There was a problem logging you in'
    )
  })
})

describe('User is able to login', function() {
  it('Logs in with good credentials', function() {
    cy.visit(Cypress.env('ACCOUNTS_UI'))
    cy.get('#root > section > div > main > form > label:nth-child(1) > input')
      .type(Cypress.env('validEmail'))
      .should('have.value', Cypress.env('validEmail'))
    cy.get('#root > section > div > main > form > label:nth-child(2) > input')
      .type(Cypress.env('validPassword'))
      .should('have.value', Cypress.env('validPassword'))
    cy.get('#root > section > div > main > form > button').click()
    // assert that the app loads
    cy.get('#root > section > header > nav.UserNav').should('contain', 'test')
  })
})

// TODO: find a way to test 2FA users
