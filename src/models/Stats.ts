import mongoose, { Schema, Document } from 'mongoose';

export interface IStats extends Document {
  userID: string;
  name: string;
  competitionID: string;
  segmentID: string;
  elapsedTime: number;
  distance: number;
}

const StatsSchema: Schema = new Schema({
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
  segmentID: {
    type: String,
    required: true
  },
  elapsedTime: {
    type: Number,
    required: true
  },
  distance: {
    type: Number,
    required: true
  }
});

const Stats = mongoose.model<IStats>('stats', StatsSchema);

export default Stats;