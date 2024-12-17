module.exports = {
    createClassroom: [
        {
            path: 'name',
            label: 'Classroom Name',
            required: true,
            type: 'string',
            length: { min: 3, max: 50 },
        },
        {
            path: 'schoolId',
            label: 'School ID',
            required: true,
            type: 'string',
        },
        {
            path: 'capacity',
            label: 'Capacity',
            required: true,
            type: 'number',
            length: { min: 1, max: 100 },
        },
        {
            path: 'resources',
            label: 'Resources',
            type: 'array',
            items: { type: 'object' },
        },
    ],
    updateClassroom: [
        {
            path: 'capacity',
            label: 'Capacity',
            type: 'number',
            length: { min: 1, max: 100 },
        },
        {
            path: 'resources',
            label: 'Resources',
            type: 'array',
            items: { type: 'object' },
        },
    ],
};
