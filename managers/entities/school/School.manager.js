const School = require('./School.model');

class SchoolManager {
    constructor({ config, validators }) {
        this.config = config;
        this.validators = validators;
    }

    async createSchool({ name, address }) {
        try {
            const school = { name, address };
            let result = await this.validators.school.createSchool(school);
            if (result) return result;
            const newSchool = new School({ name, address });
            return await newSchool.save();
        } catch (err) {
            throw new Error(`Failed to create school: ${err.message}`);
        }
    }

    async getSchools() {
        return await School.find({});
    }

    async getSchoolById(id) {
        return await School.findById(id);
    }

    async updateSchool(id, {name, address}) {
        const school = { name, address };
        let result = await this.validators.school.updateSchool(school);
        if (result) return result;
        return await School.findByIdAndUpdate(id, school, { new: true });
    }

    async deleteSchool(id) {
        return await School.findByIdAndDelete(id);
    }
}

module.exports = SchoolManager;
