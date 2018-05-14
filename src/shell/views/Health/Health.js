import react from 'react'

function Health () {
  return (
    <pre>{JSON.stringify(window.APP_HEALTH, null, 2)}</pre>
  )
}

export default Health
