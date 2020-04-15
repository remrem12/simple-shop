let admin = (req, res, next) => {
  if(req.user.role === 0){
    return res.send('U dun have permission')
  }

  next()
}

module.exports = { admin }