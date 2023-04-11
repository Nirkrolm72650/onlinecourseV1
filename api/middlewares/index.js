
const { isAdmin } = require('./admin.middleware')
const { isVisiteur } = require('./visiteur.middleware')

module.exports = {
    isAdmin, isVisiteur
}