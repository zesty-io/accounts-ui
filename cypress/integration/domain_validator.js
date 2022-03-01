import { Validator } from '../../src/apps/properties/src/views/PropertyOverview/components/Domain/Validator'

describe('Validate adding a URL', function() {
  it('Check domain', () => {
    // //PASS
    assert.equal(Validator('www.example.com'), true)
    assert.equal(Validator('www.example.com'), true)
    assert.equal(Validator('example.com'), true)
    assert.equal(Validator('example.org'), true)
    assert.equal(Validator('example.multi.sub.domain.example.org'), true)
    assert.equal(Validator('example.co.uk'), true)
    assert.equal(Validator('example.io'), true)
    assert.equal(Validator('subdmain.example.org'), true)

    // //FAIL
    assert.equal(Validator('https://www.example.com'), false)
    assert.equal(Validator('http://www.example.com'), false)
    assert.equal(Validator('https://www.example.com/'), false)
    assert.equal(Validator('http://www.example.com/'), false)
    assert.equal(Validator('www.example.com/path/page'), false)
    assert.equal(Validator('example.com/path/page'), false)
    assert.equal(Validator('example.org/path'), false)
    assert.equal(Validator('example.i'), false)
    assert.equal(Validator('ftp://example.org'), false)
  })
})
