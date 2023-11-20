import { urlFormatter } from '../../src/apps/properties/src/views/PropertyOverview/components/Domain/Validator'

describe('Validate adding a URL', function() {
  it('Check domain', () => {
    // Examples of values which can be corrected to return a valid value

    expect(urlFormatter('www.example.com/')).to.deep.equal({
      value: 'www.example.com/',
      error: null
    })

    expect(urlFormatter('https://www.example.com/')).to.deep.equal({
      value: 'www.example.com/',
      error: null
    })

    expect(urlFormatter('http://www.example.com/')).to.deep.equal({
      value: 'www.example.com/',
      error: null
    })

    expect(urlFormatter('https://www.example.com')).to.deep.equal({
      value: 'www.example.com',
      error: null
    })
    expect(urlFormatter('http://www.example.com')).to.deep.equal({
      value: 'www.example.com',
      error: null
    })
    expect(urlFormatter('https://www.example.org')).to.deep.equal({
      value: 'www.example.org',
      error: null
    })
    expect(urlFormatter('ftp://example.org')).to.deep.equal({
      value: 'example.org',
      error: null
    })
    expect(urlFormatter('www.example.org')).to.deep.equal({
      value: 'www.example.org',
      error: null
    })

    expect(urlFormatter('example.multi.sub.domain.example.org')).to.deep.equal({
      value: 'example.multi.sub.domain.example.org',
      error: null
    })
    expect(urlFormatter('example.co.uk')).to.deep.equal({
      value: 'example.co.uk',
      error: null
    })

    expect(urlFormatter('https://www.example.co.uk')).to.deep.equal({
      value: 'www.example.co.uk',
      error: null
    })

    expect(urlFormatter('subdomain.example.org')).to.deep.equal({
      value: 'subdomain.example.org',
      error: null
    })

    //FAIL Examples of invalid values which can not be corrected
    expect(urlFormatter('example.i')).to.deep.equal({
      value: 'example.i',
      error: 'Invalid domain extension'
    })
    expect(urlFormatter('example')).to.deep.equal({
      value: 'example',
      error: 'Invalid domain extension'
    })
  })
})
