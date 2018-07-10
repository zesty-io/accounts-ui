describe('User Creation Flow', function() {
  it('Creates a user', function() {
    cy.visit(Cypress.env('ACCOUNTS_UI'))
    cy.get('#root > section > div > main > div > a').click()
    cy.get('#root > section > form > label:nth-child(2) > input').type(
      `newUser${Date.now()}@email.com`
    )
    cy.get('#root > section > form > label:nth-child(3) > input').type(
      'newUserName'
    )
    cy.get('#root > section > form > label:nth-child(4) > input').type(
      'lastName'
    )
    cy.get('#root > section > form > label:nth-child(5) > input').type(
      'asdASD123'
    )
    cy.get('#root > section > form > label:nth-child(6) > input').click()
    cy.get('#root > section > form > button').click()
    cy.wait(10000)
    cy.get('#root > section > main > p').should(
      'contain',
      'We have sent a verification email to the email address you signed up with. This is done for account security to ensure you are the owner of the email address. Once you have verified your email return here to begin using Zesty.io'
    )
  })
})
