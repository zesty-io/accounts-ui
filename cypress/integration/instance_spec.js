describe('User is able to login', () => {
  it('Logs in with good credentials', () => {
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

  const timeStamp = Date.now()
  it('Cannot create an instance with no name', () => {
    cy.get('#siteListWrapper > main > article > footer > a > button').click()
    cy.get(
      '#root > section > section > section > section > div > div > button'
    ).click()
    cy.get('#root > section > section > article > span > p').should(
      'contain',
      'You must enter a name'
    )
  })

  it('Can create an instance', () => {
    cy.get('#root > section > section > section > section > div > input').type(
      `TEST INSTANCE ${timeStamp}`
    )
    cy.get(
      '#root > section > section > section > section > div > div > button'
    ).click()
  })
  // use the timeStamp to delete the same instance
})
