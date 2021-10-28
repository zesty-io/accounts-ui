describe('User Creation Flow', function() {
  it('Creates a user', function() {
    cy.visit(`${Cypress.env('ACCOUNTS_UI')}/signup`)

    // Fill out signup form
    cy.get('[name=email]').type(`newUser${Date.now()}@email.com`)
    cy.get('[name=firstName]').type('newUserName')
    cy.get('[name=lastName]').type('lastName')
    cy.get('input[type=password]').type('asdASD123')
    cy.get('[name=eula]').check({ force: true })

    // Submit signup form
    cy.get('button[name=submit]').click()
    cy.url().should('contain', 'instances', { timeout: 5000 })
  })
})
