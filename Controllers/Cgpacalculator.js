import mongoose from 'mongoose';
import Student from '../Models/Student.js';
import Courseslist from '../Models/Courseslist.js';

export const calculateCGPA = async (req, res) => {
    try {
        const { studentId, courseId, coursesReceived } = req.body;

        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const course = await Courseslist.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        let totalCredits = 0;
        let totalGradePoints = 0;
        const studentCourses = [];

        for (const receivedCourse of coursesReceived) {
            for (const courseDoc of course.courses) {
                if (receivedCourse.name === courseDoc.name) {
                    const gradePoints = receivedCourse.point; // Changed to "point" field
                    const credits = courseDoc.credits;

                    totalCredits += credits;
                    totalGradePoints += gradePoints * credits;

                    studentCourses.push({
                        course: courseDoc.name,
                        marks: receivedCourse.marks,
                        gradePoint: gradePoints
                    });

                    break;
                }
            }
        }

        const cgpa = totalCredits !== 0 ? totalGradePoints / totalCredits : 0;

        student.courses = studentCourses;
        student.cgpa = cgpa;

        await student.save();

        res.status(200).json({ cgpa, totalCredits, student });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
