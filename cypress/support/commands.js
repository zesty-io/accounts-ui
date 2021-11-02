// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

// -- This is a parent command --
Cypress.Commands.add('login', (email, pass) => {
  const formBody = new FormData()
  formBody.append('email', email || Cypress.env('validEmail'))
  formBody.append('password', pass || Cypress.env('validPassword'))
  console.log(`checking email: ${Cypress.env('validEmail')}`)
  console.log(`checking password: ${Cypress.env('validPassword')}`)

  let login = fetch(`${Cypress.env('API_AUTH')}/login`, {
    method: 'POST',
    body: formBody
  }).then(async res => {
    let json = await res.json()
    return json.meta.token
  })

  cy.wrap(login).then(token => cy.setCookie(Cypress.env('COOKIE_NAME'), token))
})

//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
