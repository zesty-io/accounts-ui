describe('Instance Flow', () => {
  const timeStamp = Date.now()

  // it('Fails to create an instance with no name', () => {
  //   cy.login(Cypress.env('validEmail'), Cypress.env('validPassword'))
  //   cy.get('#siteListWrapper > main > article > footer > a > button').click()
  //   cy.get(
  //     '#root > section > section > section > section > div > div > button'
  //   ).click()
  //   cy.get('#root > section > section > article > span > p').should(
  //     'contain',
  //     'You must enter a name'
  //   )
  // })

  it('Creates an instance', () => {
    cy.login(Cypress.env('validEmail'), Cypress.env('validPassword'))
    cy.get('#siteListWrapper > main > article > footer > a > button').click()
    cy.get('#root > section > section > section > section > div > input').type(
      `TEST INSTANCE ${timeStamp}`
    )
    cy.get(
      '#root > section > section > section > section > div > div > button'
    ).click()
    cy.wait(10000)
    cy.get(
      '#root > section > section.AppMain.AppMain > section > div > section > main > article:nth-child(1) > footer > button'
    ).click()
    cy.get('#siteListWrapper > section > div > article > main').should(
      'contain',
      timeStamp
    )
  })

  it('Updates an instance name', () => {
    cy.login(Cypress.env('validEmail'), Cypress.env('validPassword'))
    cy.wait(2000)
    cy.get('#siteListWrapper > main')
      .find('article')
      .contains(timeStamp)
      .parent()
      .siblings('footer')
      .children('div')
      .children('a')
      .first()
      .click()
    cy.pause()
    cy.get('#siteListWrapper > section > div > article > main')
      .children()
      .first()
      .children()
      .focus()
      .click()
      .type(`New Name ${timeStamp}`)
    cy.get(
      '#siteListWrapper > section > div > article > main > article.Card.Meta > header > h2 > label > div > button:nth-child(2)'
    )
  })

  // it('Updates an instance blueprint', () => {
  //   cy.login(Cypress.env('validEmail'), Cypress.env('validPassword'))
  //   cy.get('#siteListWrapper > section > div > article > main').should(
  //     'contain',
  //     timeStamp
  //   )
  // })
})
