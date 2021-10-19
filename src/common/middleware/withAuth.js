import jwt from 'jsonwebtoken'

const { TokenExpiredError } = jwt

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).json({
      error: 'Token expired! You need to login again!'
    })
  }
  return res.status(401).json({
    error: 'You must be logged in to perform this action!'
  })
}

const withAuth = (handler) => (req, res) => {
  const token = req.headers.authorization || req.params?.token
  if (!token) {
    return res.status(401).json({
      error: 'You must be logged in to perform this action!'
    })
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return catchError(err, res)
    }
    req.user = decoded
    return null
  })
  return handler(req, res)
}

export default withAuth
