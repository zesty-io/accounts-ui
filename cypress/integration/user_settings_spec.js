describe('User Settings Flow', () => {
  const timeStamp = Date.now()

  before(function() {
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

    cy.get('#notificationMessage', { timeout: 10000 }).should(
      'contain',
      'Name updated'
    )
  })

  it('Adds email', () => {
    cy.get('[name="email"]').type('testEmail@zesty.io')
    cy.get('[name="name"]').type('Email Name')

    cy.get('.email footer button').click()

    cy.get('#notificationMessage', { timeout: 10000 }).should(
      'contain',
      'Email added'
    )
  })

  it('Removes email', () => {
    cy.get('.email main')
      .children('div')
      .last()
      .children('button')
      .last()
      .click()

    cy.get('#notificationMessage', { timeout: 10000 }).should(
      'contain',
      'email successfully removed'
    )
  })

  it('Changes password', () => {
    cy.get(
      '#root > section > section.AppMain > section > div > div > article:nth-child(3) > main > input:nth-child(2)'
    ).type(Cypress.env('validPassword'))
    cy.get(
      '#root > section > section.AppMain > section > div > div > article:nth-child(3) > main > input:nth-child(3)'
    ).type('newValidPass2')
    cy.get(
      '#root > section > section.AppMain > section > div > div > article:nth-child(3) > main > input:nth-child(4)'
    ).type('newValidPass2')
    cy.get(
      '#root > section > section.AppMain > section > div > div > article:nth-child(3) > footer > button'
    ).click()

    cy.wait(2000)
    //
    // handle logout redirect
    cy.get('#confirmTrue').click()
    //
    // set password back

    cy.login(Cypress.env('validEmail'), 'newValidPass2')
    cy.visit('/settings/account')

    cy.get(
      '#root > section > section.AppMain > section > div > div > article:nth-child(3) > main > input:nth-child(2)'
    ).type('newValidPass2')
    cy.get(
      '#root > section > section.AppMain > section > div > div > article:nth-child(3) > main > input:nth-child(3)'
    ).type(Cypress.env('validPassword'))
    cy.get(
      '#root > section > section.AppMain > section > div > div > article:nth-child(3) > main > input:nth-child(4)'
    ).type(Cypress.env('validPassword'))
    cy.get(
      '#root > section > section.AppMain > section > div > div > article:nth-child(3) > footer > button'
    ).click()

    cy.wait(2000)

    cy.get('#confirmTrue').click()
  })
})
