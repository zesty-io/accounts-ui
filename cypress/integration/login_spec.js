describe('User gets failed login message', function() {
  it('Logs in with bad credentials', function() {
    cy.visit(Cypress.env('ACCOUNTS_UI'))
    cy.get('#root > section > div > main > form > label:nth-child(1) > input')
      .type(Cypress.env('badEmail'))
      .should('have.value', Cypress.env('badEmail'))
    cy.get('#root > section > div > main > form > label:nth-child(2) > input')
      .type(Cypress.env('badPassword'))
      .should('have.value', Cypress.env('badPassword'))
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
      .type(Cypress.env('goodEmail'))
      .should('have.value', Cypress.env('goodEmail'))
    cy.get('#root > section > div > main > form > label:nth-child(2) > input')
      .type(Cypress.env('goodPassword'))
      .should('have.value', Cypress.env('goodPassword'))
    cy.get('#root > section > div > main > form > button').click()
    // assert that the app loads
    cy.get('#root > section > header > nav.UserNav.UserNav--IMX-X').should(
      'contain',
      'Glidewell'
    )
  })
})

// TODO: find a way to test 2FA users
