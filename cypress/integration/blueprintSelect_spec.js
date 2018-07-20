describe('Use can only see own blueprints in select', function() {
  const timeStamp = Date.now()
  it('creates a blueprint and invites our user to the instance', function() {
    cy.login(Cypress.env('validEmail2'), Cypress.env('validPassword'))
    cy.get('#globalNav').then(nav => {
      if (nav.find('#blueprintsNavLink').length) {
        cy.get('#blueprintsNavLink').click()
      } else {
        cy.get('#root > section > header > nav.UserNav.UserNav').click({
          force: true
        })
        cy.get('#userNavDropdown > li:nth-child(3) > a').click()
        cy.get('#blueprintsToggle').click({ force: true })
        cy.get('#blueprintsNavLink').click()
      }
    })
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
    cy.get('#notificationMessage').should('contain', 'Successfully created')

    //back to instances
    cy.get('#instancesNavLink').click({ force: true })
    cy.get('#siteListWrapper > main > article > footer > a > button').click()
    cy.get('#root > section > section > section > section > div > input').type(
      `TEST INSTANCE ${timeStamp}`
    )
    cy.get(
      '#root > section > section > section > section > div > div > button'
    ).click()
    cy.wait(10000)
    // find the custom blueprint
    cy.contains(timeStamp)
      .parent()
      .siblings()
      .last()
      .children()
      .first()
      .click()
    cy.get('#siteListWrapper > section > div > article > main').should(
      'contain',
      timeStamp
    )
    //invites our other user
    cy.get('#inviteUserInput')
      .click({ force: true })
      .type(Cypress.env('validEmail'), { force: true })
    cy.get('.selector')
      .first()
      .click({ force: true })
      .find('li')
      .contains('Admin')
      .click({ force: true })
    cy.get('#inviteUserSend').click({ force: true })
    cy.wait(2000)
    cy.get('#notificationMessage').should('contain', Cypress.env('validEmail'))
  })
  // then login with the other user, accept the invite, and change the blueprint
  // checking if the other users blueprint is present
  it('accepts the invite and changes the blueprint', function() {
    cy.login(Cypress.env('validEmail'), Cypress.env('validPassword'))
    // accept invite
    cy.contains(timeStamp)
      .parent()
      .siblings()
      .last()
      .children()
      .first()
      .click()
    cy.wait(5000)
    cy.get('#changeBlueprint').click({ force: true })
    cy.get('#confirmTrue').click()
    cy.contains(timeStamp).should('not.exist')
  })
})
