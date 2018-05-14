const fs = require('fs')
const path = require('path')
const package = require('../package.json')

const root = path.resolve(__dirname, '../')

const formatDateTime = date => {
  if (!date) {
    return ''
  }
  const newDate = new Date(date)
  return `${newDate.getMonth() +
    1}-${newDate.getDate()}-${newDate.getFullYear()} | ${newDate.getHours()}:${(newDate.getMinutes() <
  10
    ? '0'
    : '') + newDate.getMinutes()}`
}

module.exports = function health() {
  //create a health file
  const version = package.version

  const healthDoc = `export default {
    version: '${version || ''}',
    environment: '${process.env.NODE_ENV || 'no env found'}',
    buildDateTime: '${formatDateTime(Date.now())}'
  }`
  fs.writeFileSync(`${root}/build/health.js`, healthDoc)
}
