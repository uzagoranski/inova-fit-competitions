import mongoose, { Schema, Document } from 'mongoose';

export interface IRound extends Document {
    date: Date;
    competitionID: string;
    stravaSegmentID: string;
}

const RoundSchema: Schema = new Schema({
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    competitionID: {
        type: String,
        required: true
    },
    stravaSegmentID: {
        type: String,
        required: true
    }
});

const Round = mongoose.model<IRound>('round', RoundSchema);

export default Round;
