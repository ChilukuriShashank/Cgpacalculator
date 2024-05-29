import Courseslist from '../Models/Courseslist.js';

export const getAllCourses = async (req, res) => {
    try {
        const allCourses = await Courseslist.find();
        res.status(200).json(allCourses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getcoursebyid = async (req, res) => {
    const { courseId } = req.params;
    try {
        const course = await Courseslist.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getCourseListByYearSemesterType = async (req, res) => {
    try {
      const { year, semester, Type } = req.body;
      // Find courseslist based on year, semester, and type
      const courseList = await Courseslist.findOne({ year, semester, Type });
      if (!courseList) {
        return res.status(404).json({ message: 'Course list not found' });
      }
      res.status(200).json(courseList);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  


  export const createCourseList = async (req, res) => {
    try {
        const { year, semester, Type, courses } = req.body;

        // Check if a course list with the same year, semester, and type already exists
        const existingCourseList = await Courseslist.findOne({ year, semester, Type });
        if (existingCourseList) {
            return res.status(400).json({ message: 'Course list with the same year, semester, and type already exists' });
        }

        // Create a new course list
        const newCourseList = new Courseslist({ year, semester, Type, courses });
        const savedCourseList = await newCourseList.save();

        res.status(201).json({ message: 'Course saved successfully', savedCourseList });
    } catch (error) {
        // Handle duplicate key error
        if (error.code === 11000) {
            res.status(400).json({ message: 'Course list with the same year, semester, and type already exists' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

export const updateCourseList = async (req, res) => {
    try {
        const { id } = req.params;
        const { year, semester, Type, courses } = req.body;

        // Check if the course list exists
        const courseList = await Courseslist.findById(id);
        if (!courseList) {
            return res.status(404).json({ message: 'Course list not found' });
        }

        // Check for duplicate year, semester, and type combination
        const duplicate = await Courseslist.findOne({ year, semester, Type, _id: { $ne: id } });
        if (duplicate) {
            return res.status(400).json({ message: 'A course list with the same year, semester, and type already exists' });
        }

        // Update the course list
        courseList.year = year;
        courseList.semester = semester;
        courseList.Type = Type;
        courseList.courses = courses;

        // Save the updated course list
        const updatedCourseList = await courseList.save();

        res.status(200).json({ message: 'Course list updated successfully', updatedCourseList });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the course list', error: error.message });
    }
};


// Controller to delete an existing course list

export const deleteCourseList = async (req, res) => {
    try {
        const { id } = req.params; // Using req.params to get the id
        console.log('Deleting course list with ID:', id);
        
        const deletedCourse = await Courseslist.findByIdAndDelete(id);
        
        if (!deletedCourse) {
            return res.status(404).json({ message: 'Course list not found' });
        }

        console.log('Course list deleted successfully');
        res.status(200).json({ message: 'Course list deleted successfully' });
    } catch (error) {
        console.error('Error deleting course list:', error);
        res.status(500).json({ message: error.message });
    }
};

export const addCourseToCourseList = async (req, res) => {
    try {
        const { id, name, credits } = req.body; // Get the course list ID, name, and credits from the request body

        // Find the course list by ID
        const courseList = await Courseslist.findById(id);
        if (!courseList) {
            return res.status(404).json({ message: 'Course list not found' });
        }

        // Add the new course to the courses array of the course list
        courseList.courses.push({ name, credits });

        // Save the updated course list
        const updatedCourseList = await courseList.save();

        res.status(200).json(updatedCourseList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

import Student from '../Models/Student.js';

// Controller function to create a new student
export const createStudent = async (req, res) => {
    try {
        const { sname, year, semester, Type } = req.body;
        const courseId = req.body.courseId;
        // Create a new student instance
        const newStudent = new Student({
            sname: sname,
            year: year,
            semester: semester,
            Type: Type,
            coursenumber: courseId
        });

        // Save the new student to the database
        const savedStudent = await newStudent.save();

        res.status(201).json(savedStudent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getstbyid = async (req, res) => {
    const { id } = req.params;
    try {
        const st = await Student.findById(id);
        if (!st) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(st);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};