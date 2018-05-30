// TODO: this Should be fetched from the API
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
export function ecosystems(state = {}, action) {
  switch (action.type) {
    case 'FETCH_SITES_SUCCESS':
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

      console.log('Derive Ecosystems', ecosystems)

      return ecosystems
      break
    default:
      return state
  }
}
