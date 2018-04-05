import { blueprints } from './blueprints'
import { sites } from './sites'
import { sitesCompanies } from './sitesCompanies'
import { sitesFiltered } from './sitesFiltered'
import { sitesStats } from './sitesStats'
import { sitesUsers } from './sitesUsers'
import { sitesRoles } from './sitesRoles'
import { invite } from './invite'
import { sitesDomain } from './sitesDomain'
import { createSite } from './createSite'
import { sitesCollections } from './sitesCollections'


export const propertiesReducers = {
  sites,
  sitesFiltered,
  sitesCompanies,
  sitesCollections,
  sitesStats,
  sitesUsers,
  sitesRoles,
  invite,
  blueprints,
  sitesDomain,
  createSite
}

export const normalizeSites = sites => {
  const zuids = sites.map(site => site.ZUID)
  const normalized = zuids.reduce((sites, zuid) => {
    sites[zuid] = {}
    return sites
  }, {})

  sites.forEach(site => {
    normalized[site.ZUID] = site
  })

  return normalized
}
