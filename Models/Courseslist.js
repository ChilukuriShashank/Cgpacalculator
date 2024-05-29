import mongoose from 'mongoose';

const { Schema } = mongoose;

const courselistSchema = new Schema({
    year: {
        type: Number,
        required: true
    },
    semester: {
        type: String,
        enum: ['odd', 'even'],
        required: true
    },
    Type: {
        type: String,
        enum: ['advance', 'regular'], 
        required: true
    },
    courses: {
        type: [{
            name: {
                type: String,
                required: true,
            },
            credits: {
                type: Number,
                required: true
            }
        }],
        default: []
    },
    totalCredits: {
        type: Number,
        default: 0
    }
});

// Define a pre hook to update totalCredits before saving or updating the document
courselistSchema.pre('save', function(next) {
    this.totalCredits = this.courses.reduce((total, course) => total + course.credits, 0);
    next();
});
courselistSchema.index({ year: 1, semester: 1, Type: 1 }, { unique: true });
export default mongoose.model('CourseList', courselistSchema);
