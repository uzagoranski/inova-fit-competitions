import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  date: Date;
  stravaUserID: string;
  stravaAccessToken: string;
  stravaRefreshToken: string;
  accessTokenExpirationDate: Date;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  stravaUserID: {
    type: String,
    default: ""
  },
  stravaAccessToken: {
    type: String,
    default: ""
  },
  stravaRefreshToken: {
    type: String,
    default: ""
  },
  accessTokenExpirationDate: {
    type: Date,
    default: ""
  }
});

const User = mongoose.model<IUser>('users', UserSchema);

export default User;