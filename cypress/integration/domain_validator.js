// Validator definition can found in cypress/support/commands.js

describe('Validate adding a URL', function() {
  it('Check domain', () => {
    //PASS
    cy.Validator('www.example.com').should('eq', true)
    cy.Validator('example.com').should('eq', true)
    cy.Validator('example.org').should('eq', true)
    cy.Validator('example.multi.sub.domain.example.org').should('eq', true)
    cy.Validator('example.co.uk').should('eq', true)
    cy.Validator('example.io').should('eq', true)
    cy.Validator('subdmain.example.org').should('eq', true)

    //FAIL
    cy.Validator('https://www.example.com').should('eq', false)
    cy.Validator('http://www.example.com').should('eq', false)
    cy.Validator('https://www.example.com/').should('eq', false)
    cy.Validator('http://www.example.com/').should('eq', false)
    cy.Validator('www.example.com/path/page').should('eq', false)
    cy.Validator('example.com/path/page').should('eq', false)
    cy.Validator('example.org/path').should('eq', false)
    cy.Validator('example.i').should('eq', false)
    cy.Validator('ftp://example.org').should('eq', false)
  })
})
