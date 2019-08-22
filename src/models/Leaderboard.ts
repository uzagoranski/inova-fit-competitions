import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboard extends Document {
  userID: string;
  name: string;
  competitionID: string;
  averageTime: number;
  totalDistance: number;
  numberOfRounds: number;
}

const LeaderboardSchema: Schema = new Schema({
  userID: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  competitionID: {
    type: String,
    required: true
  },
  averageTime: {
    type: Number,
    required: true
  },
  totalDistance: {
    type: Number,
    required: true
  },
  numberOfRounds: {
    type: Number,
    required: true
  },
});

const Leaderboard = mongoose.model<ILeaderboard>('leaderboard', LeaderboardSchema);

export default Leaderboard;