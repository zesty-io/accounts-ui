describe('App Navigation', () => {
  const timeStamp = Date.now()

  it('Navigates through the app', () => {
    cy.login(Cypress.env('validEmail'), Cypress.env('validPassword'))
    // navigate to instances, blueprints, user settings, support, logout
  })
})
