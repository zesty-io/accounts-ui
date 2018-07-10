describe('User is able to login', () => {
  const timeStamp = Date.now()
  it('Can create a blueprint', () => {
    cy.visit(Cypress.env('ACCOUNTS_UI'))
    cy.get(
      '#root > section > div > main > form > label:nth-child(1) > input'
    ).type(Cypress.env('validEmail'))
    cy.get(
      '#root > section > div > main > form > label:nth-child(2) > input'
    ).type(Cypress.env('validPassword'))
    cy.get('#root > section > div > main > form > button').click()
    cy.get('#blueprintsNavLink').click()
    cy.get('#createBlueprint').click()

    cy.get('#Blueprint > label:nth-child(2) > input').type(
      `Blueprint test ${timeStamp}`
    )
    cy.get('#Blueprint > label:nth-child(3) > input').type('fakeGithubURL')
    cy.get('#Blueprint > label:nth-child(4) > input').type('fakeCoverImageURL')
    cy.get('#Blueprint > label:nth-child(5) > input').type('fakeShieldImageURL')
    cy.get('#Blueprint > label:nth-child(6) > input').type('fakePreviewURL')
    cy.get('#Blueprint > label:nth-child(7) > textarea').type(
      'Short description'
    )
    cy.get('#Blueprint > label:nth-child(8) > textarea').type(
      'Long description'
    )
    cy.get('#Blueprint > div > button:nth-child(1)').click()
  })

  it('Can Delete a blueprint', () => {
    cy.visit(Cypress.env('ACCOUNTS_UI'))
    cy.get(
      '#root > section > div > main > form > label:nth-child(1) > input'
    ).type(Cypress.env('validEmail'))
    cy.get(
      '#root > section > div > main > form > label:nth-child(2) > input'
    ).type(Cypress.env('validPassword'))
    cy.get('#root > section > div > main > form > button').click()
    cy.get('#blueprintsNavLink').click()

    cy.get(
      '#root > section > section.AppMain.AppMain > section > section > section'
    )
      .find('article')
      .contains(timeStamp)
      .parent()
      .siblings('footer')
      .children('div')
      .children('a')
      .first()
      .click()
    cy.get('#confirmTrue').click()
  })

  // it('can edit a blueprint')
  // it('can delete a blueprint')
})
