import { blueprints } from './blueprints'
import { sites } from './sites'
import { sitesTeams } from './sitesTeams'
import { sitesStats } from './sitesStats'
import { sitesUsers } from './sitesUsers'
import { sitesRoles } from './sitesRoles'
import { sitesCollections } from './sitesCollections'
import { sitesDomains } from './sitesDomains'
import { sitesAccessTokens } from './sitesAccessTokens'

export const properties = {
  sites,
  sitesTeams,
  sitesCollections,
  sitesStats,
  sitesUsers,
  sitesRoles,
  blueprints,
  sitesDomains,
  sitesAccessTokens
}

export const normalizeSites = sites => {
  return sites.reduce((acc, site) => {
    acc[site.ZUID] = site
    return acc
  }, {})
}
