describe('Teams Flow', () => {
  const timeStamp = Date.now()

  it('Can Create a team', () => {
    cy.login()
    cy.visit('/teams')

    // create a team
    cy.get('input[name="name"]').type(`New Team ${timeStamp}`)
    cy.get('textarea[name="description"]').type(
      'this is a description of the team and its purpose'
    )
    cy.get('#teamCreateSave').click()
    cy.get('#notificationMessage').should('contain', 'Team created')
  })

  // add team to an instance

  it('Can invite a member', () => {
    cy.login()
    cy.visit('/teams')

    //add a team member
    cy.get('.team article')
      .contains(timeStamp)
      .type('testInvite@zesty.io')

    cy.get(
      '#root > section > section.AppMain.AppMain > section > div > article:nth-child(2) > footer > form > button'
    ).click()

    cy.get('#notificationMessage', { timeout: 10000 }).should('contain', 'sent')
  })

  it('Can remove an invite', () => {
    cy.login()
    cy.visit('/teams')

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
