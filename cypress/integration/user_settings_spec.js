describe('User Settings Flow', () => {
  beforeEach(function() {
    cy.login()
    cy.visit('/settings/account')
  })

  it('Changes name', () => {
    cy.get('[name="firstName"]', { timeout: 15000 })
      .clear()
      .type('FirstName')

    cy.get('[name="lastName"]')
      .clear()
      .type('LastName')

    cy.get(
      'section.AppMain > section > div > div > article:nth-child(1) > footer > button'
    ).click()

    cy.get('#notificationMessage', { timeout: 15000 }).should(
      'contain',
      'Name updated'
    )
  })

  it('Adds email', () => {
    cy.get('[name="email"]', { timeout: 15000 }).type('testEmail@zesty.io')
    cy.get('[name="name"]').type('Email Name')

    cy.get('.email footer button').click()

    cy.get('#notificationMessage', { timeout: 15000 }).should(
      'contain',
      'Email added'
    )
  })

  it('Removes email', () => {
    cy.get('.email main', { timeout: 15000 })
      .children('div')
      .last()
      .children('button')
      .last()
      .click()

    cy.get('#notificationMessage', { timeout: 15000 }).should(
      'contain',
      'email successfully removed'
    )
  })

  it('Changes password', () => {
    cy.get('[name=oldPassword]', { timeout: 15000 }).type(
      Cypress.env('validPassword')
    )
    cy.get('[name=newPassword]').type('newValidPass2')
    cy.get('[name=confirmNewPassword]').type('newValidPass2')
    cy.get('[data-test=changePassword]').click()

    // handle logout redirect
    cy.get('#confirmTrue', { timeout: 15000 }).click()

    // set password back
    cy.login(Cypress.env('validEmail'), 'newValidPass2')
    cy.visit('/settings/account')

    cy.get('[name=oldPassword]').type('newValidPass2')
    cy.get('[name=newPassword]').type(Cypress.env('validPassword'))
    cy.get('[name=confirmNewPassword]').type(Cypress.env('validPassword'))
    cy.get('[data-test=changePassword]').click()

    cy.get('#confirmTrue', { timeout: 15000 }).click()
  })
})
