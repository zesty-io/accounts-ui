describe('User Settings Flow', () => {
  beforeEach(function() {
    cy.login()
    cy.visit('/settings/account')
  })

  it('Changes name', () => {
    cy.get('[name="firstName"]')
      .clear()
      .type('FirstName')

    cy.get('[name="lastName"]')
      .clear()
      .type('LastName')

    cy.get(
      'section.AppMain > section > div > div > article:nth-child(1) > footer > button'
    ).click()

    cy.get('#notificationMessage').should('contain', 'Name updated')
  })

  it('Adds email', () => {
    cy.get('[name="email"]').type('testEmail@zesty.io')
    cy.get('[name="name"]').type('Email Name')

    cy.get('.email footer button').click()

    cy.get('#notificationMessage').should('contain', 'Email added')
  })

  it('Removes email', () => {
    cy.get('.email main')
      .children('div')
      .last()
      .children('button')
      .last()
      .click()

    cy.get('#notificationMessage').should(
      'contain',
      'email successfully removed'
    )
  })
  // TODO: unskip once we have a dedicated test user.
  // Otherwise I could endup being locked out of my account due to a flakey test.
  it.skip('Changes password', () => {
    cy.get('[name=oldPassword]').type(Cypress.env('validPassword'))
    cy.get('[name=newPassword]').type('newValidPass2')
    cy.get('[name=confirmNewPassword]').type('newValidPass2')
    cy.get('[data-test=changePassword]').click()

    // handle logout redirect
    cy.get('#confirmTrue').click()

    // set password back
    cy.login(Cypress.env('validEmail'), 'newValidPass2')
    cy.visit('/settings/account')

    cy.get('[name=oldPassword]').type('newValidPass2')
    cy.get('[name=newPassword]').type(Cypress.env('validPassword'))
    cy.get('[name=confirmNewPassword]').type(Cypress.env('validPassword'))
    cy.get('[data-test=changePassword]').click()
    cy.contains(
      'Your password has been changed, please log in with your new password'
    ).should('exist')
  })
})
