const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

const ANGULAR = 'angular'
const EMBER = 'ember'
const REACT = 'react'
const VUE = 'vue'

router.get('/', async (req, res, next) => {
  try {
    const angular = await User.findAll({where: {vote: ANGULAR}})
    const ember = await User.findAll({where: {vote: EMBER}})
    const react = await User.findAll({where: {vote: REACT}})
    const vue = await User.findAll({where: {vote: VUE}})
    res.send([
      {name: ANGULAR, count: angular.length},
      {name: EMBER, count: ember.length},
      {name: REACT, count: react.length},
      {name: VUE, count: vue.length}
    ])
  } catch (err) {
    next(err)
  }
})
