import { blueprints } from './blueprints'
import { sites } from './sites'
import { sitesCompanies } from './sitesCompanies'
// import { sitesFiltered } from './sitesFiltered'
import { sitesStats } from './sitesStats'
import { sitesUsers } from './sitesUsers'
import { sitesRoles } from './sitesRoles'
import { sitesCollections } from './sitesCollections'
import { ecosystems } from './ecosystems'

export const properties = {
  sites,
  // sitesFiltered,
  sitesCompanies,
  sitesCollections,
  sitesStats,
  sitesUsers,
  sitesRoles,
  blueprints,
  ecosystems
}

export const normalizeSites = sites => {
  return sites.reduce((acc, site) => {
    acc[site.ZUID] = site
    return acc
  }, {})
}
