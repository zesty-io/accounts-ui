describe('Instance Creation Flow', () => {
  const timestamp = new Date().getTime()

  beforeEach(() => {
    cy.login()
    cy.visit('/instances/create')
  })

  it('Fails to create an instance with no name', () => {
    cy.get('[data-test=createInstance]').click()
    cy.get('#root > section > section > article > span > p').should(
      'contain',
      'You must enter a name'
    )
  })

  // If this fails make sure the update_sql_users.sh script in the zutil repo has been ran today.
  // An issue has been created to move this into a daily cron: https://github.com/zesty-io/zutil/issues/40
  it('Creates an instance', () => {
    cy.get('[name=propertyName]').type(`TEST INSTANCE ${timestamp}`)
    cy.get('[data-test=createInstance]').click()

    cy.get(
      '#root > section > section.AppMain.AppMain > section > div > section > main > article:nth-child(1) > footer > button'
    ).click()

    cy.get('#siteListWrapper article h1').should('contain', timestamp)
  })
})
