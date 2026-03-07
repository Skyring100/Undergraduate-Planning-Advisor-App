/**
 * USER SERVICE - Business Logic for Users
 * 
 * This file contains the business logic for user operations.
 * It sits between the controller (HTTP handling) and storage (database).
 * 
 * Think of it as: "What should happen when we want to get/create/update a user?"
 * 
 * Responsibilities:
 * - Validate data
 * - Apply business rules
 * - Format responses
 * - Handle errors
 */

const userStorage = require('../utils/userStorage');  // Database operations

class UserService {
  /**
   * Get a user by their ID
   * @param {string} id - User ID
   * @returns {Object} Response object with success status and data
   */
  async getUserById(id) {
    try {
      // Try to find the user in the database
      const user = await userStorage.findUserById(id);
      
      // If user doesn't exist, return error
      if (!user) {
        return { 
          success: false, 
          message: 'User not found' 
        };
      }
      
      // User found! Convert to safe response format (removes password)
      return { 
        success: true, 
        message: 'User retrieved successfully', 
        data: new UserModel(user).toResponse()  // Remove password before sending
      };
    } catch (error) {
      // Something went wrong, return error
      return { 
        success: false, 
        message: 'Error retrieving user', 
        error: error.message 
      };
    }
  }

  /**
   * Get a user by their email address
   * @param {string} email - User email
   * @returns {Object} Response object with success status and data
   */
  async getUserByEmail(email) {
    try {
      const user = await userStorage.findUserByEmail(email);
      
      if (!user) {
        return { 
          success: false, 
          message: 'User not found' 
        };
      }
      
      return { 
        success: true, 
        message: 'User retrieved successfully', 
        data: new UserModel(user).toResponse() 
      };
    } catch (error) {
      return { 
        success: false, 
        message: 'Error retrieving user', 
        error: error.message 
      };
    }
  }

  /**
   * Get all users
   * @returns {Object} Response object with array of users
   */
  async getAllUsers() {
    try {
      // Get all users from database
      const users = await userStorage.getAllUsers();
      
      // Convert all users to safe response format (removes passwords)
      return { 
        success: true, 
        message: 'Users retrieved successfully', 
        data: UserModel.toResponseList(users) 
      };
    } catch (error) {
      return { 
        success: false, 
        message: 'Error retrieving users', 
        error: error.message 
      };
    }
  }

  /**
   * Create a new user
   * @param {Object} userData - User data (email, name, phone, password)
   * @returns {Object} Response object with success status and created user
   */
  async createUser(userData) {
    try {
      // Check if user with this email already exists
      const existingUser = await userStorage.findUserByEmail(userData.email);
      
      if (existingUser) {
        return { 
          success: false, 
          message: 'User with this email already exists' 
        };
      }

      // Save the new user to database
      const user = await userStorage.saveUser(userData);
      
      // Return success response (without password)
      return { 
        success: true, 
        message: 'User created successfully', 
        data: new UserModel(user).toResponse() 
      };
    } catch (error) {
      return { 
        success: false, 
        message: 'Error creating user', 
        error: error.message 
      };
    }
  }

  /**
   * Check if a user exists by email
   * @param {string} email - Email to check
   * @returns {boolean} True if user exists, false otherwise
   */
  async userExists(email) {
    try {
      const user = await userStorage.findUserByEmail(email);
      return !!user;  // Convert to boolean (true if user exists)
    } catch (error) {
      return false;  // On error, assume user doesn't exist
    }
  }

  /**
   * Update user information
   * @param {string} id - User ID to update
   * @param {Object} updates - Fields to update (name, phone, email, avatar)
   * @returns {Object} Response object with success status and updated user
   */
  async updateUser(id, updates) {
    try {
      // If email is being updated, check if it's already taken by another user
      if (updates.email) {
        const existingUser = await userStorage.findUserByEmail(updates.email);
        if (existingUser && existingUser.id !== id) {
          return {
            success: false,
            message: 'Email is already taken by another user'
          };
        }
      }

      // Validate the updates
      const validation = UserModel.validate(updates);
      if (!validation.valid) {
        return {
          success: false,
          message: 'Validation failed',
          errors: validation.errors
        };
      }

      // Update the user
      const updatedUser = await userStorage.updateUser(id, updates);
      
      if (!updatedUser) {
        return {
          success: false,
          message: 'User not found'
        };
      }

      return {
        success: true,
        message: 'User updated successfully',
        data: new UserModel(updatedUser).toResponse()
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error updating user',
        error: error.message
      };
    }
  }

  /**
   * Change user password
   * @param {string} id - User ID
   * @param {string} oldPassword - Current password (for verification)
   * @param {string} newPassword - New password
   * @returns {Object} Response object with success status
   */
  async changePassword(id, oldPassword, newPassword) {
    try {
      // Get the user
      const user = await userStorage.findUserById(id);
      
      if (!user) {
        return {
          success: false,
          message: 'User not found'
        };
      }

      // Verify old password
      const bcrypt = require('bcryptjs');
      const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
      
      if (!isOldPasswordValid) {
        return {
          success: false,
          message: 'Current password is incorrect'
        };
      }

      // Validate new password
      if (!newPassword || newPassword.length < 6) {
        return {
          success: false,
          message: 'New password must be at least 6 characters long'
        };
      }

      // Hash the new password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      // Update password
      await userStorage.updateUserPassword(id, hashedPassword);

      return {
        success: true,
        message: 'Password changed successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error changing password',
        error: error.message
      };
    }
  }
}

// Export a single instance of the service (singleton pattern)
module.exports = new UserService();
