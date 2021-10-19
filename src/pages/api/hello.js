// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nextConnect from 'next-connect'
import {User} from '../../../sequelize/models'

const db = require('../../../sequelize/models/index')


// db.sequelize.sync()
const handler = nextConnect()
  .get(async (req, res) => {
    await db.sequelize.sync({force: true})
    const user = await User.findOne({where: {email: 'eu'}})
    console.log('_____ _______', user)
    res.status(200).json({ name: 'Welcome to Word Race' })
  })

export default handler
