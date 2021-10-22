import { hashedPassword } from '../../../common/helpers/auth'
import { withValidation } from '../../../common/middleware/withValidation'
import { signupUserSchema } from '../../../common/helpers/schema/validationRules'
import db, { user } from '../../../../sequelize/models'

async function handler(req, res) {
  await db.sequelize.sync({alter: false})

  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ error: 'Only POST requests allowed' })
  }

  const { email, username, password } = req.body

  const usr = await user.findOne({ where: { email }})
  const name = await user.findOne({ where: { username }})

  if (name) {
    return res.status(409).json({
      error: `Username ${username} already taken`
    })
  }

  if (usr) {
    return res.status(409).json({
      error: `Email ${email} already exist`
    })
  }

  req.body.password = hashedPassword(password)

  const createdUser = await user.create(req.body)

  return res.status(200).json({
    message: 'User successfully created',
    data: {
      id: createdUser.id,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      username: createdUser.username,
      email: createdUser.email
    }
  })
}

export default withValidation(handler, signupUserSchema)
