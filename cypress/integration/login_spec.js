describe('User Login Failure', function() {
  it('Log in fails with bad credentials', function() {
    cy.visit(Cypress.env('ACCOUNTS_UI'))

    cy.get('form[name="login"] input[name="email"]')
      .type(Cypress.env('invalidEmail'))
      .should('have.value', Cypress.env('invalidEmail'))
    cy.get('form[name="login"] input[type="password"]')
      .type(Cypress.env('invalidPassword'))
      .should('have.value', Cypress.env('invalidPassword'))

    cy.get('form[name="login"] button').click()

    cy.contains('Invalid username or password').should('exist')
  })
})

describe('User Login Flow', function() {
  it('Logs in with good credentials', function() {
    cy.visit(Cypress.env('ACCOUNTS_UI'))

    cy.get('form[name="login"] input[name="email"]')
      .type(Cypress.env('validEmail'))
      .should('have.value', Cypress.env('validEmail'))
    cy.get('form[name="login"] input[type="password"]')
      .type(Cypress.env('validPassword'))
      .should('have.value', Cypress.env('validPassword'))

    cy.get('form[name="login"] button').click()
    cy.url().should('contain', 'instances')
  })
})

// TODO: find a way to test 2FA users
