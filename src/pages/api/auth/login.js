import { Op } from 'sequelize'
import cookie from 'cookie'
import {
  genToken, unhashedPassword, genRefreshToken
} from '../../../common/helpers/auth'
import { withValidation } from '../../../common/middleware/withValidation'
import { loginUserSchema } from '../../../common/helpers/schema/validationRules'
import db, { user as User } from '../../../../sequelize/models'

async function handler(req, res) {
  await db.sequelize.sync({alter: false})

  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ error: 'Only POST requests allowed' })
  }
  
  const { user: usr, password } = req.body

  const user = await User.findOne({ where: {
    [Op.or]: [
      {email: usr},
      {username: usr}
    ]
  }})

  if (!user || !unhashedPassword(password, user.password) ) {
    return res.status(401).json({
      error: 'Incorrect email, username or password'
    })
  }

  const userToken = genToken(user)
  const refreshToken = await genRefreshToken(user.id)
  const { error } = refreshToken

  if (error) {
    return res.status(400).json({
      error
    })
  }

  const { token } = refreshToken

  return res
    .setHeader('Set-Cookie', cookie
      .serialize('refreshToken', token, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        path: '/' 
      }))
    .status(200)
    .json({
      message: `Welcome back ${user.username}`,
      data: {
        accessToken: `Bearer ${userToken}`,
        username: user.username,
        email: user.email
      }
    })
}

export default withValidation(handler, loginUserSchema)
