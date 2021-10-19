import cookie from 'cookie'
import { Op } from 'sequelize'
import db, { RefreshToken, user } from '../../../../sequelize/models'
import { genToken } from '../../../common/helpers/auth'
import withAuth from '../../../common/middleware/withAuth'

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ error: 'Only POST requests allowed' })
  }

  try {
    await db.sequelize.sync({alter: false})

    const { refreshToken } = req.cookies

    if (!refreshToken) {
      return res.status(401)
        .json({ error: 'You must be looged in to perform this action' })
    }

    const token = await RefreshToken
      .findOne({
        where: {
          [Op.and]: [
            {token: refreshToken},
            {isRevoked: false}
          ]
        },
        include: [{
          model: user,
          as: 'owner',
          attributes: ['username', 'id', 'email']
        }]
      })
    
    if (!token || token.isRevoked) {
      return res.status(403)
        .json({
          error: 'Revoked! You are not authorized to perform this action'
        })
    }
    const newToken = genToken(token.owner)
  
    return res
      .setHeader('Set-Cookie', cookie
        .serialize('refreshToken', refreshToken, {
          httpOnly: true,
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
          path: '/' 
      }))
      .status(201)
      .json({
        message: 'New access token successfully generated',
        data: {
          accessToken: newToken
        }
      })
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'An error occured while trying to refresh token' })
  }
}

export default withAuth(handler)