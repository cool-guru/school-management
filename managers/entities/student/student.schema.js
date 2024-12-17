module.exports = {
    createStudent: [
        {
            path: 'name',
            label: 'Student Name',
            required: true,
            type: 'string',
            length: { min: 3, max: 50 },
        },
        {
            path: 'classroomId',
            label: 'Classroom ID',
            required: true,
            type: 'string',
        },
        {
            path: 'enrollmentDate',
            label: 'Enrollment Date',
            required: true,
            type: 'string',
        },
    ],
};
