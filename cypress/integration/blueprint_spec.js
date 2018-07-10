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
  it('Can create a blueprint', () => {
    cy.get('#blueprintsNavLink').click()
    cy.get(
      '#root > section > section.AppMain.AppMain > section > section > section > article > footer > div > a'
    ).click()

    cy.get('input')
      .first()
      .click()
      .type(`Blueprint test ${timeStamp}`)
      .should('contain', 'Blueprint test')
    cy.get('#Blueprint > label:nth-child(3) > input').type('fakeGithubURL')
    cy.get('#Blueprint > label:nth-child(4) > input').type('fakeCoverImageURL')
    cy.get('#Blueprint > label:nth-child(5) > .Input').type(
      'fakeShieldImageURL'
    )
    cy.get('#Blueprint > label:nth-child(6) > .Input').type('fakePreviewURL')
    cy.get('#Blueprint > label:nth-child(7) > .Input').type('Short description')
    cy.get('#Blueprint > label:nth-child(8) > .Input').type('Long description')
  })

  // it('can edit a blueprint')
  // it('can delete a blueprint')
})
