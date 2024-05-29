
import { getAllCourses, createCourseList, updateCourseList, deleteCourseList, addCourseToCourseList, getCourseListByYearSemesterType, getcoursebyid, createStudent, getstbyid } from '../Controllers/Cgpacontroller.js';
import express, { request } from 'express';
import { calculateCGPA } from '../Controllers/Cgpacalculator.js';

const router = express.Router();


router.get('/getall', getAllCourses);
router.get('/getbyid/:courseId',getcoursebyid);
router.post('/create', createCourseList);
router.put('/update/:id', updateCourseList);
router.delete('/delete/:id', deleteCourseList);
router.post('/course/add', addCourseToCourseList);
router.post('/getbydetails',getCourseListByYearSemesterType);
router.post('/createstudent',createStudent);
router.get('/getstudentbyid/:id',getstbyid);
router.post('/calculatecgpa',calculateCGPA);

export default router;
