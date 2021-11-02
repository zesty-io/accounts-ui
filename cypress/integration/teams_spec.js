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
    cy.get('#notificationMessage').should('contain', 'Team created')
  })
  it('Can invite a member', () => {
    cy.get('input[name=inviteeEmail]')
      .first()
      .type('testInvite@zesty.io')

    cy.get('button[type="submit"]')
      .first()
      .click()

    cy.get('#notificationMessage').should('contain', 'sent')
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

    cy.get('#notificationMessage').should('contain', 'successfully')
  })
})
