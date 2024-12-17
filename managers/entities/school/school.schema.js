module.exports = {
    createSchool: [
        {
            path: 'name',
            label: 'School Name',
            required: true,
            type: 'string',
            length: { min: 3, max: 100 },
        },
        {
            path: 'address',
            label: 'School Address',
            required: true,
            type: 'string',
            length: { min: 10, max: 200 },
        },
    ],
    updateSchool: [
        {
            path: 'name',
            label: 'School Name',
            type: 'string',
            length: { min: 3, max: 100 },
        },
        {
            path: 'address',
            label: 'School Address',
            type: 'string',
            length: { min: 10, max: 200 },
        },
    ],
};