//If this function is updated please update cypress test in domain_validator.js

export const Validator = url => {
  return /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(
    url
  )
}
