describe('Instance Flow', () => {
  const timestamp = Date.now()

  beforeEach(() => {
    cy.login()
  })

  it('Fails to create an instance with no name', () => {
    cy.visit('/instances/create')

    cy.get('[data-test=createInstance]').click()
    cy.get('#root > section > section > article > span > p', {
      timeout: 15000
    }).should('contain', 'You must enter a name')
  })

  it('Creates an instance', () => {
    cy.visit('/instances/create')

    cy.get('[name=propertyName]').type(`TEST INSTANCE ${timestamp}`)
    cy.get('[data-test=createInstance]').click()

    cy.get(
      '#root > section > section.AppMain.AppMain > section > div > section > main > article:nth-child(1) > footer > button',
      {
        timeout: 20000 // Instance creation can take a long time
      }
    ).click()

    cy.get('#siteListWrapper article h1', {
      timeout: 15000
    }).should('contain', timestamp)
  })

  it('Updates an instance name', () => {
    cy.visit(`/instances/${Cypress.env('testInstanceZUID')}`)

    cy.get('#editInstanceName', { timeout: 15000 }).click({ force: true })
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
    cy.visit(`/instances/${Cypress.env('testInstanceZUID')}`)

    cy.get('[name=domain]', { timeout: 15000 })
      .clear({ force: true })
      .type(`${timestamp}-test.zesty.site`, { force: true })

    cy.get('[data-test=saveDomain]').click({ force: true })

    cy.get('#notificationMessage', { timeout: 15000 }).should(
      'contain',
      `${timestamp}-test.zesty.site`
    )
  })

  it('Invites a User', () => {
    cy.visit(`/instances/${Cypress.env('testInstanceZUID')}`)

    cy.get('[name=inviteeEmail]', { timeout: 15000 })
      .focus()
      .type('testInvite@zesty.io')

    cy.get('.invite .Select')
      .click({ force: true })
      .find('li')
      .contains('Developer')
      .click({ force: true })

    cy.get('#inviteUserSend').click({ force: true })

    cy.get('#notificationMessage', { timeout: 15000 }).should(
      'contain',
      'Invite sent'
    )
  })

  it('Cancels an invite', () => {
    cy.visit(`/instances/${Cypress.env('testInstanceZUID')}`)

    cy.get('#revoke-button', { timeout: 15000 }).click({ force: true })
    cy.get('#confirmTrue').click()
    cy.get('#notificationMessage', { timeout: 15000 }).should(
      'contain',
      'User invite cancelled'
    )
  })

  it('Updates an instance blueprint', () => {
    cy.visit(`/instances/${Cypress.env('testInstanceZUID')}`)

    cy.get('#changeBlueprint', { timeout: 15000 }).click({ force: true })
    cy.get('#confirmTrue').click()
    cy.get(
      '#root > section > section.AppMain.AppMain > section > div > section > main > article:nth-child(4) > footer > button'
    ).click()

    cy.get('#blueprintName', { timeout: 15000 }).should('contain', 'Skeleton')
  })

  it('Invites a team', () => {
    cy.visit(`/instances/${Cypress.env('testInstanceZUID')}`)

    cy.get('[name=teamZUID]', { timeout: 15000 }).type(
      Cypress.env('testTeamZUID'),
      { force: true }
    )

    cy.get('[data-test=teamInvite] .Select')
      .click({ force: true })
      .find('li')
      .contains('Developer')
      .click({ force: true })

    cy.get('[data-test=teamInvite] button').click({ force: true })

    cy.get('#notificationMessage', { timeout: 15000 }).should(
      'contain',
      'Team successfully added'
    )
  })

  it('Removes a team', () => {
    cy.visit(`/instances/${Cypress.env('testInstanceZUID')}`)

    cy.get('[data-test=removeTeam]', { timeout: 15000 }).click({ force: true })
    cy.get('#confirmTrue').click()

    cy.get('#notificationMessage', { timeout: 15000 }).should(
      'contain',
      'was removed'
    )
  })
})
