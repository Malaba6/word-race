import cookie from 'cookie'
import db, { RefreshToken } from '../../../../sequelize/models'
import withAuth from '../../../common/middleware/withAuth'

const handler = async (req, res) => {
  if (req.method !== 'GET') {
    return res
      .status(405)
      .json({ error: 'Only GET requests allowed' })
  }

  try {
    await db.sequelize.sync({alter: false})

    const { refreshToken } = req.cookies

    if (!refreshToken) {
      return res
        .status(401)
        .json({ error: 'You must be logged in to continue' })
    }

    const revokedToken = await RefreshToken
      .findOne({where: {token: refreshToken}})
    
    if (!revokedToken) {
      return res
        .status(500)
        .json({ error: 'An error occured while trying to logout' })
    }

    await RefreshToken
      .update({isRevoked: true},
        {where: {token: refreshToken}})
  
    return res
      .setHeader('Set-Cookie', cookie
        .serialize('refreshToken', '', {
          httpOnly: true,
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
          path: '/' 
      }))
      .status(200)
      .json({ message: 'User Successfuly logged out' })
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'An error occured while trying to logout' })
  }
}

export default withAuth(handler)
