describe('Blueprint Flow', () => {
  const timeStamp = Date.now()

  before(function() {
    cy.login()
    cy.visit('/blueprints')
  })

  it('Can Create a blueprint', () => {
    cy.get('#createBlueprint').click()

    cy.get('#Blueprint > label:nth-child(2) > input').type(
      `Blueprint test ${timeStamp}`
    )
    cy.get('#Blueprint > label:nth-child(3) > input').type('fakeGithubURL')
    cy.get('#Blueprint > label:nth-child(4) > input').type('fakeCoverImageURL')
    cy.get('#Blueprint > label:nth-child(5) > input').type('fakeShieldImageURL')
    cy.get('#Blueprint > label:nth-child(6) > input').type('fakePreviewURL')
    cy.get('#Blueprint > label:nth-child(7) > textarea').type(
      'Short description'
    )
    cy.get('#Blueprint > label:nth-child(8) > textarea').type(
      'Long description'
    )
    cy.get('#Blueprint > div > button:nth-child(1)').click()
    cy.get('#notificationMessage').should('contain', 'Successfully created')
  })

  it('Can Edit a blueprint', () => {
    cy.get('.blueprints > section > section')
      .find('article')
      .contains(timeStamp)
      .parent()
      .siblings('footer')
      .children('div')
      .children('a')
      .contains('Edit')
      .click()

    cy.get('#Blueprint > label:nth-child(2) > input').type(`Edited`)
    cy.get('#Blueprint > label:nth-child(3) > input').type('Edited')
    cy.get('#Blueprint > label:nth-child(4) > input').type('Edited')
    cy.get('#Blueprint > label:nth-child(5) > input').type('Edited')
    cy.get('#Blueprint > label:nth-child(6) > input').type('Edited')
    cy.get('#Blueprint > label:nth-child(7) > textarea').type('Edited')
    cy.get('#Blueprint > label:nth-child(8) > textarea').type('Edited')

    cy.get('#Blueprint > div > button:nth-child(1)').click()
    cy.get('#notificationMessage').should('contain', 'Successfully saved')
  })

  it('Can Delete a blueprint', () => {
    cy.get('.blueprints > section > section')
      .find('article')
      .contains(timeStamp)
      .parent()
      .siblings('footer')
      .children('button')
      .first()
      .click()

    cy.get('#confirmTrue').click()
    cy.get('#notificationMessage').should(
      'contain',
      'Blueprint successfully removed'
    )
  })
})
