describe('User can perform instance actions', () => {
  const timeStamp = Date.now()
  it('Cannot create an instance with no name', () => {
    cy.visit(Cypress.env('ACCOUNTS_UI'))
    cy.get('#root > section > div > main > form > label:nth-child(1) > input')
      .type(Cypress.env('validEmail'))
      .should('have.value', Cypress.env('validEmail'))
    cy.get('#root > section > div > main > form > label:nth-child(2) > input')
      .type(Cypress.env('validPassword'))
      .should('have.value', Cypress.env('validPassword'))
    cy.get('#root > section > div > main > form > button').click()
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
    cy.visit(Cypress.env('ACCOUNTS_UI'))
    cy.get('#root > section > div > main > form > label:nth-child(1) > input')
      .type(Cypress.env('validEmail'))
      .should('have.value', Cypress.env('validEmail'))
    cy.get('#root > section > div > main > form > label:nth-child(2) > input')
      .type(Cypress.env('validPassword'))
      .should('have.value', Cypress.env('validPassword'))
    cy.get('#root > section > div > main > form > button').click()
    cy.get('#siteListWrapper > main > article > footer > a > button').click()
    cy.get('#root > section > section > section > section > div > input').type(
      `TEST INSTANCE ${timeStamp}`
    )
    cy.get(
      '#root > section > section > section > section > div > div > button'
    ).click()
    cy.wait(10000)
    cy.get(
      '#root > section > section.AppMain.AppMain > section > div > section > main > article:nth-child(1) > footer > button'
    ).click()
    cy.pause()
    cy.get('.Name').should('contain', timeStamp)
  })

  // use the timeStamp to delete the same instance
})
