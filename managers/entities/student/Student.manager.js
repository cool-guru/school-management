const Student = require('./Student.model');
const Classroom = require('../classroom/Classroom.model');

module.exports = class StudentManager {
    constructor({ config, validators }) {
        this.validators = validators;
        this.config = config;
    }


    async enrollStudent(data) {
        try {
            let result = await this.validators.student.createStudent(data);
            if (result) return result;
            
            const { classroomId } = data;

            const classroom = await Classroom.findById(classroomId);
            if (!classroom) throw new Error('Classroom not found');

            if (classroom.occupiedSeats >= classroom.capacity) {
                throw new Error('Classroom is full. Cannot enroll student.');
            }

            const newStudent = new Student({
                ...data,
                classroomId: classroomId,
            });
            await newStudent.save();

            classroom.occupiedSeats += 1;
            await classroom.save();

            return newStudent;
        } catch (err) {
            console.error('Error in enrollStudent:', err.message);
            throw new Error(`Failed to enroll student: ${err.message}`);
        }
    }

    async getStudentsByClassroom(classroomId) {
        try {
            return await Student.find({ classroomId });
        } catch (err) {
            throw new Error(`Failed to get student: ${err.message}`);
        }
    }

    async transferStudent(studentId, newClassroomId) {
        try {
            const student = await Student.findById(studentId);
            if (!student) throw new Error('Student not found');

            const oldClassroom = await Classroom.findById(student.classroomId);
            const newClassroom = await Classroom.findById(newClassroomId);

            if (!newClassroom) throw new Error('New classroom not found');

            if (!oldClassroom.schoolId.equals(newClassroom.schoolId)) {
                throw new Error('Cannot transfer student to a classroom in a different school.');
            }

            if (newClassroom.occupiedSeats >= newClassroom.capacity) {
                throw new Error('New classroom is full. Cannot transfer student.');
            }

            oldClassroom.occupiedSeats -= 1;
            await oldClassroom.save();

            newClassroom.occupiedSeats += 1;
            await newClassroom.save();

            student.classroomId = newClassroomId;
            await student.save();

            return student;
        } catch (err) {
            console.error('Error in transferStudent:', err.message);
            throw new Error(`Failed to transfer student: ${err.message}`);
        }
    }

    async updateStudentProfile(studentId, updates) {
        try {
            const student = await Student.findByIdAndUpdate(studentId, updates, { new: true });
            if (!student) throw new Error('Student not found');
            return student;
        } catch (err) {
            console.error('Error in updateStudentProfile:', err.message);
            throw new Error(`Failed to update student profile: ${err.message}`);
        }
    }
};
