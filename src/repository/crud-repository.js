class CrudRepository {
    constructor(model) {
        if (!model) {
            throw new Error("Model must be provided to CrudRepository");
        }
        this.model = model;
    }

    async create(data) {
        try {
            return await this.model.create(data);
        } catch (error) {
            console.error('Error in CrudRepository.create:', error);
            throw error;
        }
    }

    async destroy(id) {
        try {
            return await this.model.findByIdAndDelete(id);
        } catch (error) {
            console.error('Error in CrudRepository.destroy:', error);
            throw error;
        }
    }

    async getById(id) {
        try {
            return await this.model.findById(id);
        } catch (error) {
            console.error('Error in CrudRepository.get:', error);
            throw error;
        }
    }

    async getAll() {
        try {
            return await this.model.find({});
        } catch (error) {
            console.error('Error in CrudRepository.getAll:', error);
            throw error;
        }
    }

    async update(id, data) {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (error) {
            console.error('Error in CrudRepository.update:', error);
            throw error;
        }
    }
}

export default CrudRepository;
