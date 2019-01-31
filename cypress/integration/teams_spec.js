describe('Teams Flow', () => {
  const timeStamp = Date.now()
  it('Can Create a team', () => {
    cy.login(Cypress.env('validEmail'), Cypress.env('validPassword'))

    // if the teams nav link is not displayed, turn it on in prefs
    cy.get('#globalNav').then(nav => {
      if (nav.find('#teamsNavLink').length) {
        cy.get('#teamsNavLink').click()
      } else {
        cy.get('#root > section > header > nav.UserNav.UserNav').click({
          force: true
        })
        cy.get('#userNavDropdown > li:nth-child(3) > a').click()
        cy.get('#teamsToggle').click({ force: true })
        cy.get('#teamsNavLink').click()
      }
    })

    // create a team
    cy.get('#teamCreateName').type('New Team')
    cy.get('#teamCreateDescription').type(
      'this is a description of the team and its purpose'
    )
    cy.get('#teamCreateSave').click()
    cy.get('#notificationMessage').should('contain', 'Team created')
  })

  // add team to an instance

  it('Can invite a member', () => {
    cy.login(Cypress.env('validEmail'), Cypress.env('validPassword'))
    cy.get('#teamsNavLink').click()
    //add a team member
    cy.get(
      '#root > section > section.AppMain.AppMain > section > div > article:nth-child(2) > footer > form > input'
    ).type('testInvite@zesty.io')
    cy.get(
      '#root > section > section.AppMain.AppMain > section > div > article:nth-child(2) > footer > form > button'
    ).click()
    cy.wait(3000)
    cy.get('#notificationMessage').should('contain', 'sent')
  })

  it('Can remove an invite', () => {
    cy.login(Cypress.env('validEmail'), Cypress.env('validPassword'))
    cy.get('#teamsNavLink').click()
    //remove the invitiation
    cy.get(
      '#root > section > section.AppMain.AppMain > section > div > article:nth-child(2) > main > section:nth-child(3) > article'
    )
      .children()
      .last()
      .click()

    cy.get('#confirmTrue').click()

    cy.get('#notificationMessage').should('contain', 'successfully')
  })
})
