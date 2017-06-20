import User from '../api/user/user.model';
import config from '../config/config';
import * as jwt from 'jsonwebtoken';

export default {
  signin(req, res) {
    const {email, password} = req.body;
    User.findOne({email: email})
      .exec((err, user) => {
        if(err) {
          console.error('err', err);
          return res.status(401).json({status: false, data: null, error: err});
        }
        if(!user) {
          return res.status(404).json({status: false, data: null, error: 'User does not found'});
        }
        user.validatePassword(password, (err, isMatch) => {
          if(err) {
            console.error('err validating password', err);
            return res.status(401).json({success: false, data: null, error: err});
          }
          else if(isMatch) {
            const currentUser = {
              id: user._id,
              username: user['username'],
              email: user['email'],
              role: user['role']
            };
            const token = jwt.sign(currentUser, config.jwtSecret);
            currentUser['token'] = token;
            req['user'] = currentUser;
            return res.status(200).json({success: true, data: currentUser, error: null});
          }
          else {
            return res.status(400).json({success: false, data: null, error: 'Invalid credentials'});
          }
        })
      });
  },
  verifyToken(req, res) {
    let token = req.params.token;
    jwt.verify(token, config.jwtSecret, (err, verifiedJWT) => {
      console.log('err', err);
      console.log('verifiedJWT', verifiedJWT);
      if(err) {
        return res.status(401).json({success: false, data: null, error: err});
      }
      return res.status(200).json({success: true, data: verifiedJWT, error: null});

    })
  }
}
