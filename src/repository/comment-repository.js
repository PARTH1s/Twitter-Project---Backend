import Comment from '../models/comment.js';
import CrudRepository from './crud-repository.js';

/**
 * CommentRepository handles database operations for Comment model.
 * Inherits basic CRUD operations from CrudRepository.
 */
class CommentRepository extends CrudRepository {
  constructor() {
    super(Comment);
  }
}

export default CommentRepository;
