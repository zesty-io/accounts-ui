describe('App Navigation', () => {
  const timeStamp = Date.now()

  it('Navigates through the app', () => {
    cy.login(Cypress.env('validEmail'), Cypress.env('validPassword'))
    // navigate to user settings
    cy.get('#root > section > header > nav.UserNav.UserNav').click({
      force: true
    })
    cy.get('#userNavDropdown > li:nth-child(3) > a').click()
    // navigate to Support
    cy.get('#root > section > header > nav.UserNav.UserNav').click({
      force: true
    })
    cy.get('#userNavDropdown > li:nth-child(4) > a').click()

    cy.get('#blueprintsNavLink').click()
    cy.get('#instancesNavLink').click()
  })
})
