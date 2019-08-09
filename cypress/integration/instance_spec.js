describe('Instance Flow', () => {
  const timeStamp = Date.now()

  it('Fails to create an instance with no name', () => {
    cy.visit('/instances/create')

    cy.get(
      '#root > section > section > section > section > div > div > button'
    ).click()
    cy.get('#root > section > section > article > span > p').should(
      'contain',
      'You must enter a name'
    )
  })

  it('Creates an instance', () => {
    cy.visit('/instances/create')

    cy.get('#root > section > section > section > section > div > input').type(
      `TEST INSTANCE ${timeStamp}`
    )
    cy.get(
      '#root > section > section > section > section > div > div > button'
    ).click()

    cy.get(
      '#root > section > section.AppMain.AppMain > section > div > section > main > article:nth-child(1) > footer > button',
      { timeout: 10000 }
    ).click()

    cy.get('#siteListWrapper > section > div > article > main').should(
      'contain',
      timeStamp
    )
  })

  it('Updates an instance name', () => {
    cy.visit(`/instances/${Cypress.env('testInstanceZUID')}`)

    cy.get('#editInstanceNameSpan').click({ force: true })
    cy.get('#editInstanceNameInput')
      .click({ force: true })
      .type(' changed', { force: true })
    cy.get('#editInstanceNameSave').click({ force: true })

    cy.get('#notificationMessage').should('contain', 'Successfully')
  })

  it('Adds a domain', () => {
    cy.visit(`/instances/${Cypress.env('testInstanceZUID')}`)

    cy.get('[name=domain]')
      .clear({ force: true })
      .type(`${timeStamp}-test.zesty.site`, { force: true })

    cy.get('[data-test=saveDomain]').click({ force: true })

    cy.get('#notificationMessage').should(
      'contain',
      `${timeStamp}-test.zesty.site`
    )
  })

  it('Invites a User', () => {
    cy.visit(`/instances/${Cypress.env('testInstanceZUID')}`)

    cy.get('[name=inviteeEmail]')
      .focus()
      .type('testInvite@zesty.io')

    cy.get('.invite .Select')
      .click({ force: true })
      .find('li')
      .contains('Developer')
      .click({ force: true })

    cy.get('#inviteUserSend').click({ force: true })

    cy.get('#notificationMessage', { timeout: 10000 }).should(
      'contain',
      'Invite sent'
    )
  })

  it('Cancels an invite', () => {
    cy.visit(`/instances/${Cypress.env('testInstanceZUID')}`)

    cy.get('#revoke-button').click({ force: true })
    cy.get('#confirmTrue').click()
    cy.get('#notificationMessage').should('contain', 'User invite cancelled')
  })

  it('Updates an instance blueprint', () => {
    cy.visit(`/instances/${Cypress.env('testInstanceZUID')}`)

    cy.get('#changeBlueprint').click({ force: true })
    cy.get('#confirmTrue').click()
    cy.get(
      '#root > section > section.AppMain.AppMain > section > div > section > main > article:nth-child(4) > footer > button'
    ).click()

    cy.get('#blueprintName', { timeout: 10000 }).should('contain', 'Skeleton')
  })

  it('Invites a team', () => {
    cy.visit(`/instances/${Cypress.env('testInstanceZUID')}`)

    cy.get('[name=teamZUID]').type(Cypress.env('testTeamZUID'), { force: true })

    cy.get('[data-test=teamInvite] .Select')
      .click({ force: true })
      .find('li')
      .contains('Developer')
      .click({ force: true })

    cy.get('[data-test=teamInvite] button').click({ force: true })

    cy.get('#notificationMessage').should('contain', 'Team successfully added')
  })

  it('Removes a team', () => {
    cy.visit(`/instances/${Cypress.env('testInstanceZUID')}`)

    cy.get('[data-test=removeTeam]').click({ force: true })
    cy.get('#confirmTrue').click()

    cy.get('#notificationMessage').should('contain', 'was removed')
  })
})
