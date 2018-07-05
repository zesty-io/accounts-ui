export function ecosystems(state = {}, action) {
  switch (action.type) {
    case 'FETCH_SITES_SUCCESS':
      // TODO: All of this should just be fetched from the API
      // based on the users access
      const ECOS = {
        '1': {
          id: 1,
          name: 'Zesty.io'
        },
        '154': {
          id: 154,
          name: 'Alpha Universe'
        },
        '24290': {
          id: 24290,
          name: 'Hofbrauhaus'
        },
        '24291': {
          id: 24291,
          name: 'Pet Desk'
        }
      }
      const ecoIDs = action.sites.filter(site => site.ecoID)
      const uniqueEcoIDs = ecoIDs.reduce((acc, site) => {
        if (!acc.find(id => id === site.ecoID)) {
          acc.push(site.ecoID)
        }
        return acc
      }, [])

      const ecosystems = uniqueEcoIDs.reduce((acc, id) => {
        if (ECOS[id]) {
          acc.push(ECOS[id])
        }
        return acc
      }, [])
      if (ecosystems.length) {
        ecosystems.unshift({
          id: '',
          name: 'All Instances'
        })
      }
      return ecosystems
      break
    default:
      return state
  }
}
