describe('App Navigation', () => {
  it('Navigates through the app', () => {
    cy.login()
    cy.visit('/instances')

    cy.get('[data-test=teamsNavLink]').click()
    cy.get('[data-test=blueprintsNavLink]').click()
    cy.get('[data-test=instancesNavLink]').click()

    // navigate to user settings
    cy.get('[data-test=UserNav]').click()
    cy.get('[data-test=accountNavLink]').click()

    // navigate to Support
    cy.get('[data-test=UserNav]').click()
    cy.get('[data-test=supportNavLink]').click()
  })
})
