describe('User can perform instance actions', () => {
  const timeStamp = Date.now()
  it('Cannot create an instance with no name', () => {
    cy.login(Cypress.env('validEmail'), Cypress.env('validPassword'))
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
    cy.login(Cypress.env('validEmail'), Cypress.env('validPassword'))
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
    cy.get('#siteListWrapper > section > div > article > main').should(
      'contain',
      timeStamp
    )
  })
})
