import mongoose, { Schema, Document } from 'mongoose';

export interface ICompetition extends Document {
    name: string;
    date: Date;
}

const CompetitionSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Competition = mongoose.model<ICompetition>('competition', CompetitionSchema);

export default Competition;
