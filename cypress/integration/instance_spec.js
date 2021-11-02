describe('Instance Flow', () => {
  const timestamp = new Date().getTime()

  beforeEach(() => {
    cy.login()
    cy.visit(`/instances/${Cypress.env('testInstanceZUID')}`)
  })

  it('Updates an instance name', () => {
    cy.get('#editInstanceName').click({ force: true })
    cy.get('[name=instanceName')
      .clear({ force: true })
      .type(`TEST EDITED: ${timestamp}`, { force: true })
    cy.get('#saveInstanceName').click({ force: true })

    cy.get('#notificationMessage').should('contain', 'Successfully')
  })

  it('Adds a domain', () => {
    cy.get('[name=domain]')
      .last()
      .clear({ force: true })
      .type(`${timestamp}-test.zesty.site`, { force: true })

    cy.get('[data-test=saveDomain]')
      .last()
      .click({ force: true })

    cy.get('#notificationMessage').should(
      'contain',
      `${timestamp}-test.zesty.site`
    )
  })

  it('Invites a User', () => {
    cy.get('[name=inviteeEmail]').type('testInvite@zesty.io', { force: true })

    cy.get('.invite .Select')
      .click({ force: true })
      .find('li')
      .contains('Developer')
      .click({ force: true })

    cy.get('#inviteUserSend').click({ force: true })

    cy.get('#notificationMessage').should('contain', 'User invite sent to')
  })

  it('Cancels an invite', () => {
    cy.get('#revoke-button').click({ force: true })
    cy.get('#confirmTrue').click()
    cy.get('#notificationMessage').should('contain', 'User invite cancelled')
  })

  it('Updates an instance blueprint', () => {
    cy.get('#changeBlueprint').click({ force: true })
    cy.get('#confirmTrue').click()
    cy.get(
      '#root > section > section.AppMain.AppMain > section > div > section > main > article:nth-child(4) > footer > button'
    ).click()

    cy.get('#blueprintName').should('contain', 'Skeleton')
  })

  it('Invites a team', () => {
    cy.get('[name=teamZUID]').type(Cypress.env('testTeamZUID'), { force: true })

    cy.get('[data-test=teamInvite] .Select')
      .click({ force: true })
      .find('li')
      .contains('Developer')
      .click({ force: true })

    cy.get('[data-test=teamInvite] button').click({
      force: true
    })

    cy.get('#notificationMessage').should('contain', 'Team successfully added')
  })

  it('Removes a team', () => {
    cy.visit(`/instances/${Cypress.env('testInstanceZUID')}`)

    cy.get('[data-test=removeTeam]').click({ force: true })
    cy.get('#confirmTrue').click()

    cy.get('#notificationMessage').should('contain', 'was removed')
  })
})
