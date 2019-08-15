describe('Teams Flow', () => {
  const timeStamp = Date.now()

  beforeEach(function() {
    cy.login()
    cy.visit('/teams')
  })

  it('Can Create a team', () => {
    cy.get('input[name="name"]').type(timeStamp)
    cy.get('textarea[name="description"]').type(
      'This is a test description of the team and its purpose'
    )
    cy.get('#teamCreateSave').click()
    cy.get('#notificationMessage', { timeout: 15000 }).should(
      'contain',
      'Team created'
    )
  })

  it('Can invite a member', () => {
    cy.get('.teams article')
      .children('main h3', {
        timeout: 15000 // Wait for members to be loaded after team creation
      })
      .contains(timeStamp)
      .parents('article')
      .children('footer input[name=inviteeEmail]')
      .type('testInvite@zesty.io')
      .parents('article')
      .children('footer button')
      .click()

    cy.get('#notificationMessage', { timeout: 15000 }).should('contain', 'sent')
  })

  it('Can remove an invite', () => {
    //remove the invitiation
    cy.get(
      '#root > section > section.AppMain.AppMain > section > div > article:nth-child(2) > main > section:nth-child(3) > article'
    )
      .children()
      .last()
      .click()

    cy.get('#confirmTrue').click()

    cy.get('#notificationMessage', { timeout: 15000 }).should(
      'contain',
      'successfully'
    )
  })
})
