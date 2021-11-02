describe('Instance Flow', () => {
  const timestamp = new Date().getTime()

  beforeEach(() => {
    cy.login()
    cy.visit(`/instances/${Cypress.env('testInstanceZUID')}`)
  })

  it('Updates an instance name', () => {
    cy.get('#editInstanceName', { timeout: 60000 }).click({ force: true })
    cy.get('[name=instanceName')
      .clear({ force: true })
      .type(`TEST EDITED: ${timestamp}`, { force: true })
    cy.get('#saveInstanceName').click({ force: true })

    cy.get('#notificationMessage', { timeout: 15000 }).should(
      'contain',
      'Successfully'
    )
  })

  it('Adds a domain', () => {
    cy.get('[name=domain]', { timeout: 60000 })
      .last()
      .clear({ force: true })
      .type(`${timestamp}-test.zesty.site`, { force: true })

    cy.get('[data-test=saveDomain]')
      .last()
      .click({ force: true })

    cy.get('#notificationMessage', { timeout: 15000 }).should(
      'contain',
      `${timestamp}-test.zesty.site`
    )
  })

  it('Invites a User', () => {
    cy.get('[name=inviteeEmail]', { timeout: 60000 }).type(
      'testInvite@zesty.io',
      { force: true }
    )

    cy.get('.invite .Select')
      .click({ force: true })
      .find('li')
      .contains('Developer')
      .click({ force: true })

    cy.get('#inviteUserSend').click({ force: true })

    cy.get('#notificationMessage', { timeout: 15000 }).should(
      'contain',
      'User invite sent to'
    )
  })

  it('Cancels an invite', () => {
    cy.get('#revoke-button', { timeout: 60000 }).click({ force: true })
    cy.get('#confirmTrue').click()
    cy.get('#notificationMessage', { timeout: 15000 }).should(
      'contain',
      'User invite cancelled'
    )
  })

  it('Updates an instance blueprint', () => {
    cy.get('#changeBlueprint', { timeout: 60000 }).click({ force: true })
    cy.get('#confirmTrue').click()
    cy.get(
      '#root > section > section.AppMain.AppMain > section > div > section > main > article:nth-child(4) > footer > button'
    ).click()

    cy.get('#blueprintName', { timeout: 60000 }).should('contain', 'Skeleton')
  })

  it('Invites a team', () => {
    cy.get('[name=teamZUID]', { timeout: 60000 }).type(
      Cypress.env('testTeamZUID'),
      { force: true }
    )

    cy.get('[data-test=teamInvite] .Select')
      .click({ force: true })
      .find('li')
      .contains('Developer')
      .click({ force: true })

    cy.get('[data-test=teamInvite] button', { timeout: 15000 }).click({
      force: true
    })

    cy.get('#notificationMessage', { timeout: 15000 }).should(
      'contain',
      'Team successfully added'
    )
  })

  it('Removes a team', () => {
    cy.visit(`/instances/${Cypress.env('testInstanceZUID')}`)

    cy.get('[data-test=removeTeam]', { timeout: 60000 }).click({ force: true })
    cy.get('#confirmTrue').click()

    cy.get('#notificationMessage', { timeout: 15000 }).should(
      'contain',
      'was removed'
    )
  })
})
