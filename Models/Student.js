import mongoose from 'mongoose';

const { Schema } = mongoose;

const Studentschema = new Schema({
    sname: {
        type: String,
        required: true
    },
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
    coursenumber:{
        type: Schema.Types.ObjectId, 
        ref: 'Courseslist' 
    },
    courses: {
        type: [{
            course: {
                type: String,
                required: true
            },
            gradePoint: {
                type: Number,
                required: true
            }
        }],
        default: []
    },
    cgpa:{
        type: Number,
        default: 0
    }
});

const Student = mongoose.model('Student', Studentschema);

export default Student;
