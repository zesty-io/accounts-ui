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

  return fetch(`${Cypress.env('API_AUTH')}/login`, {
    method: 'POST',
    credentials: 'include',
    body: formBody
  })
    .then(res => res.json())
    .then(json => json.data.data)
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
