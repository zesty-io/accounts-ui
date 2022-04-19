import { urlFormatter } from '../../src/apps/properties/src/views/PropertyOverview/components/Domain/Validator'

// describe('Validate adding a URL', function() {
//   it('Check domain', () => {
//     // //PASS
//     // urlFormatter('https://www.google.com/').should('eq', 'www.google.com')
//     // assert(urlFormatter('www.example.com'), 'www.example.com')
//     // assert.equal(urlFormatter('www.example.com'), true)
//     // assert.equal(urlFormatter('example.com'), true)
//     // assert.equal(urlFormatter('example.org'), true)
//     // assert.equal(urlFormatter('example.multi.sub.domain.example.org'), true)
//     // assert.equal(urlFormatter('example.co.uk'), true)
//     // assert.equal(urlFormatter('example.io'), true)
//     // assert.equal(urlFormatter('subdomain.example.org'), true)
//     // // //FAIL
//     // assert.equal(urlFormatter('https://www.example.com'), false)
//     // assert.equal(urlFormatter('http://www.example.com'), false)
//     // assert.equal(urlFormatter('https://www.example.com/'), false)
//     // assert.equal(urlFormatter('http://www.example.com/'), false)
//     // assert.equal(urlFormatter('www.example.com/path/page'), false)
//     // assert.equal(urlFormatter('example.com/path/page'), false)
//     // assert.equal(urlFormatter('example.org/path'), false)
//     // assert.equal(urlFormatter('example.i'), false)
//     // assert.equal(urlFormatter('ftp://example.org'), false)
//   })
// })

describe('Passing validator formatter', () => {
  const pass = ['https://www.example.com', 'http://www.example.com']

  describe('Calling a function', function() {
    it('Validate Formatter function', function() {
      pass.forEach(urlTest => {
        cy.urlFormatter(urlTest).should('deep.equal', {
          value: 'www.example.com',
          error: null
        })
      })
    })
  })
})
