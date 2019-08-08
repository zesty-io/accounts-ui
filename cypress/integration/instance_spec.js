describe('Instance Flow', () => {
  const timeStamp = Date.now()

  it('Fails to create an instance with no name', () => {
    cy.login()
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
    cy.login()
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
    cy.login()
    cy.visit(`/instances/${Cypress.env('testInstanceZUID')}`)

    cy.get('#editInstanceNameSpan').click({ force: true })
    cy.get('#editInstanceNameInput')
      .click({ force: true })
      .type(' changed', { force: true })
    cy.get('#editInstanceNameSave').click({ force: true })

    cy.get('#notificationMessage').should('contain', 'Successfully')
  })

  it('Adds a domain', () => {
    cy.login()
    cy.visit(`/instances/${Cypress.env('testInstanceZUID')}`)

    cy.get('[name=domain]')
      .focus()
      .type(`domain-test${timeStamp}.zesty.site`)

    cy.get('[data-test=saveDomain]').click({ force: true })

    cy.get('#notificationMessage').should(
      'contain',
      `domain-test${timeStamp}.zesty.site`
    )
  })

  it('Invites a User', () => {
    cy.login()
    cy.visit(`/instances/${Cypress.env('testInstanceZUID')}`)

    cy.get('[data-test=inviteeEmail]')
      .click({ force: true })
      .type('testInvite@zesty.io', { force: true })

    cy.get('[data-test=siteRoles]')
      .first()
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
    cy.login()
    cy.visit(`/instances/${Cypress.env('testInstanceZUID')}`)

    cy.get('#revoke-button').click({ force: true })
    cy.get('#confirmTrue').click()
    cy.get('#notificationMessage').should('contain', 'User invite cancelled')
  })

  it('Updates an instance blueprint', () => {
    cy.login()
    cy.visit(`/instances/${Cypress.env('testInstanceZUID')}`)

    cy.get('#changeBlueprint').click({ force: true })
    cy.get('#confirmTrue').click()
    cy.get(
      '#root > section > section.AppMain.AppMain > section > div > section > main > article:nth-child(4) > footer > button'
    ).click()

    cy.get('#blueprintName', { timeout: 10000 }).should('contain', 'BS3')
  })

  // // invites a team
  // it('Invites a team', () => {
  //   cy.login()
  //   cy.wait(2000)
  //   cy.get('#siteListWrapper > main')
  //     .find('article')
  //     .contains(timeStamp)
  //     .parent()
  //     .siblings('footer')
  //     .children('div')
  //     .children('a')
  //     .first()
  //     .click()
  //   // invite the team
  // })

  // it('Updates an instance blueprint', () => {
  //   cy.login()
  // cy.wait(2000)
  // cy.get('#siteListWrapper > main')
  //   .find('article')
  //   .contains(timeStamp)
  //   .parent()
  //   .siblings('footer')
  //   .children('div')
  //   .children('a')
  //   .first()
  //   .click()

  // })
})
