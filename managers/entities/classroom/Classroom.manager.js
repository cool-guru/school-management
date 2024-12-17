const Classroom = require('./Classroom.model');

module.exports = class ClassroomManager {
    constructor({ config, validators }) {
        this.validators = validators;
        this.config = config;
    }

    async createClassroom(data) {
        try {
            let result = await this.validators.classroom.createClassroom(data);
            if(result) return result;
            const newClassroom = new Classroom({...data, occupiedSeats: 0});
            return await newClassroom.save();
        } catch (err) {
            throw new Error(`Failed to create classroom: ${err.message}`);
        }
        
    }

    async getClassroomsBySchool(schoolId) {
        try {
            return await Classroom.find({ schoolId });
        } catch (err) {
            throw new Error(`Failed to get classroom: ${err.message}`);
        }
    }

    async updateClassroomCapacity(id, newCapacity) {
        try {
            const classroom = await Classroom.findById(id);
            if (!classroom) throw new Error('Classroom not found');

            if (classroom.occupiedSeats > newCapacity) {
                throw new Error('Cannot reduce capacity below occupied seats');
            }

            let result = await this.validators.classroom.updateClassroom({newCapacity});
            if(result) return result;

            classroom.capacity = newCapacity;
            return await classroom.save();
        } catch (err) {
            console.error('Error in updateClassroomCapacity:', err.message);
            throw new Error(`Failed to update capacity: ${err.message}`);
        }
    }

    async updateResources(id, resources) {
        try {
            const classroom = await Classroom.findById(id);
            if (!classroom) throw new Error('Classroom not found');

            let result = await this.validators.classroom.updateClassroom({resources});
            if(result) return result;

            classroom.resources = resources;
            return await classroom.save();
        } catch (err) {
            console.error('Error in updateResources:', err.message);
            throw new Error(`Failed to update resources: ${err.message}`);
        }
    }

    async getAvailableSeats(id) {
        try {
            const classroom = await Classroom.findById(id);
            if (!classroom) throw new Error('Classroom not found');

            return classroom.capacity - classroom.occupiedSeats;
        } catch (err) {
            console.error('Error in getAvailableSeats:', err.message);
            throw new Error(`Failed to get available seats: ${err.message}`);
        }
    }
};