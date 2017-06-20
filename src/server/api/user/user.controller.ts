import User from './user.model';

export default {
  readAllUsers(req, res) {
    res.json({success: true});
  },
  readUser(req, res) {

  },
  createUser(req, res) {
    User.findOne({email: req.body.email})
      .exec((err, userObj) => {
        if(err) {
          return res.json({success: false, data: null, error: err});
        }
        else if(userObj == null) {
          let user = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
          };
          User.create(user)
            .then(user => {
              console.log('user created', user);
              return res.status(200).json({success: true, data: 'User signup successfully', error: null});
            })
            .catch(err => {
              console.error('user created error', err);
              return res.json({success: false, data: null, error: err});
            })
        }
        else {
          console.error('user already exists');
          return res.json({success: false, data: null, error: 'User already exists'});
        }
      })
  },
  updateUser(req, res) {

  },
  deleteUser(req, res) {

  }
}
