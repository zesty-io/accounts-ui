describe('Instance Flow', () => {
  const timeStamp = Date.now()

  it('Fails to create an instance with no name', () => {
    cy.login(Cypress.env('validEmail'), Cypress.env('validPassword'))
    cy.get('#siteListWrapper > main > article > footer > a > button').click()
    cy.get(
      '#root > section > section > section > section > div > div > button'
    ).click()
    cy.get('#root > section > section > article > span > p').should(
      'contain',
      'You must enter a name'
    )
  })

  it('Creates an instance', () => {
    cy.login(Cypress.env('validEmail'), Cypress.env('validPassword'))
    cy.wait(2000)

    cy.get('#siteListWrapper > main > article > footer > a > button').click()
    cy.get('#root > section > section > section > section > div > input').type(
      `TEST INSTANCE ${timeStamp}`
    )
    cy.get(
      '#root > section > section > section > section > div > div > button'
    ).click()
    cy.wait(10000)
    cy.get(
      '#root > section > section.AppMain.AppMain > section > div > section > main > article:nth-child(1) > footer > button'
    ).click()
    cy.get('#siteListWrapper > section > div > article > main').should(
      'contain',
      timeStamp
    )
  })

  it('Updates an instance name', () => {
    cy.login(Cypress.env('validEmail'), Cypress.env('validPassword'))
    cy.wait(2000)
    cy.get('#siteListWrapper > main')
      .find('article')
      .contains(timeStamp)
      .parent()
      .siblings('footer')
      .children('div')
      .children('a')
      .first()
      .click()
    cy.get('#editInstanceNameSpan').click({ force: true })
    cy.get('#editInstanceNameInput')
      .click({ force: true })
      .type(' changed', { force: true })
    cy.get('#editInstanceNameSave').click({ force: true })
    cy.get('#notificationMessage').should('contain', 'Successfully')
  })

  it('Adds a domain', () => {
    cy.login(Cypress.env('validEmail'), Cypress.env('validPassword'))
    cy.wait(2000)
    cy.get('#siteListWrapper > main')
      .find('article')
      .contains(timeStamp)
      .parent()
      .siblings('footer')
      .children('div')
      .children('a')
      .first()
      .click()
    cy.get('#editDomainInput')
      .click({ force: true })
      .type('domain-test.zesty.site', { force: true })
    cy.get('#editDomainSave').click({ force: true })
    cy.get('#notificationMessage').should('contain', 'domain-test.zesty.site')
  })

  it('Invites a User', () => {
    cy.login(Cypress.env('validEmail'), Cypress.env('validPassword'))
    cy.wait(2000)
    cy.get('#siteListWrapper > main')
      .find('article')
      .contains(timeStamp)
      .parent()
      .siblings('footer')
      .children('div')
      .children('a')
      .first()
      .click()

    cy.get('#inviteUserInput')
      .click({ force: true })
      .type('testInvite@zesty.io', { force: true })
    cy.get('.selector')
      .first()
      .click({ force: true })
      .find('li')
      .contains('Developer')
      .click({ force: true })
    cy.get('#inviteUserSend').click({ force: true })
    cy.wait(2000)
    cy.get('#notificationMessage').should('contain', 'testInvite@zesty.io')
  })

  it('Cancels an invite', () => {
    cy.login(Cypress.env('validEmail'), Cypress.env('validPassword'))
    cy.wait(2000)
    cy.get('#siteListWrapper > main')
      .find('article')
      .contains(timeStamp)
      .parent()
      .siblings('footer')
      .children('div')
      .children('a')
      .first()
      .click()
    cy.get('#revoke-button').click({ force: true })
    cy.get('#confirmTrue').click()
    cy.get('#notificationMessage').should('contain', 'Cancelled')
  })

  // // invites a team
  // it('Invites a team', () => {
  //   cy.login(Cypress.env('validEmail'), Cypress.env('validPassword'))
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
  //   cy.login(Cypress.env('validEmail'), Cypress.env('validPassword'))
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
