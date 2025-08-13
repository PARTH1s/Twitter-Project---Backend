/**
 * Generic CRUD repository for MongoDB models using Mongoose.
 * Provides basic create, read, update, and delete operations.
 */
class CrudRepository {
  constructor(model) {
    if (!model) {
      throw new Error("Model must be provided to CrudRepository");
    }
    this.model = model;
  }

  // Create a new document
  async create(data) {
    try {
      return await this.model.create(data);
    } catch (error) {
      console.error("Error in CrudRepository.create:", error);
      throw error;
    }
  }

  // Delete a document by ID
  async destroy(id) {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      console.error("Error in CrudRepository.destroy:", error);
      throw error;
    }
  }

  // Get a document by ID
  async getById(id) {
    try {
      return await this.model.findById(id);
    } catch (error) {
      console.error("Error in CrudRepository.getById:", error);
      throw error;
    }
  }

  // Get all documents
  async getAll() {
    try {
      return await this.model.find({});
    } catch (error) {
      console.error("Error in CrudRepository.getAll:", error);
      throw error;
    }
  }

  // Update a document by ID and return the updated document
  async update(id, data) {
    try {
      return await this.model.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      console.error("Error in CrudRepository.update:", error);
      throw error;
    }
  }
}

export default CrudRepository;
