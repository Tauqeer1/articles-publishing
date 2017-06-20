import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: String, default: 'user'},
  profile: {type: String, default: ''},
  createdAt: {type: Date, default: Date.now()}
});
export interface IUser extends mongoose.Document {
  username: string,
  email: string,
  password: string,
  role: string,
  profile: string,
  createdAt: Date,
  validatePassword(password: string, cb: Function): void
}
userSchema.pre('save', function(next) {
  const user = this;
  if(!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if(err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if(err) {
        return next(err);
      }
      user.password = hash;
      return next();
    });
  });
});

userSchema.methods = {
  validatePassword(password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
      if(err) {
        return cb(err, null);
      }
      return cb(null, isMatch);
    });
  }
};

export default mongoose.model <IUser> ('User', userSchema);
