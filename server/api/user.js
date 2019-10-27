const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['email', 'vote']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  const {body, sessionID} = req
  const {email, vote} = body
  try {
    const user = await User.findOne({where: {email}})
    if (user) {
      if (user.sesssionID !== sessionID) {
        User.update({vote}, {where: {email}})
      }
    } else {
      User.create({email, vote, sessionID})
    }
  } catch (err) {
    next(err)
  }
})
