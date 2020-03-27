import { blueprints } from './blueprints'
import { sites } from './sites'
import { sitesTeams } from './sitesTeams'
import { sitesStats } from './sitesStats'
import { sitesUsers } from './sitesUsers'
import { sitesRoles } from './sitesRoles'
import { sitesCollections } from './sitesCollections'

export const properties = {
  sites,
  sitesTeams,
  sitesCollections,
  sitesStats,
  sitesUsers,
  sitesRoles,
  blueprints
}

export const normalizeSites = sites => {
  return sites.reduce((acc, site) => {
    acc[site.ZUID] = site
    return acc
  }, {})
}
