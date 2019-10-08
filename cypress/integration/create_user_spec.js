describe('User Creation Flow', function() {
  it('Creates a user', function() {
    cy.visit(`${Cypress.env('ACCOUNTS_UI')}/signup`)

    // Fill out signup form
    cy.get('[name=email]').type(`newUser${Date.now()}@email.com`)
    cy.get('[name=firstName]').type('newUserName')
    cy.get('[name=lastName]').type('lastName')
    cy.get('[name=pass]').type('asdASD123')
    cy.get('[name=eula]').check({ force: true })

    // Submit signup form
    cy.get('button[name=submit]').click()

    cy.get('#root > section > main > p', { timeout: 15000 }).should(
      'contain',
      'We have sent a verification email from donotreply@system.zesty.email to the email address you signed up with. This is done for account security to ensure you are the owner of the email address. If you do not see a verification email in your inbox, make sure to check your spam folder.'
    )
  })
})
