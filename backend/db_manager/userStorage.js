/**
 * USER STORAGE - Database Operations for Users
 * 
 * This file handles reading and writing user data to/from the JSON file.
 * Think of it as a simple database layer.
 * 
 * The "database" is just a JSON file: db/user.json
 */

const fs = require('fs').promises;  // File system operations (async)
const path = require('path');       // Handle file paths

// Path to the users JSON file (our "database table")
const USERS_TABLE = path.join(__dirname, '../db_manager/user.json');

/**
 * Make sure the db folder exists before reading/writing
 * This prevents errors if the folder doesn't exist yet
 */
const ensureDatabaseDirectory = async () => {
  const dbDir = path.dirname(USERS_TABLE);  // Get the folder path
  try {
    await fs.access(dbDir);  // Check if folder exists
  } catch {
    // Folder doesn't exist, create it
    await fs.mkdir(dbDir, { recursive: true });
  }
};

/**
 * Read all users from the JSON file
 * @returns {Array} Array of user objects
 */
const readUsers = async () => {
  try {
    // Make sure folder exists
    await ensureDatabaseDirectory();
    
    // Read the file
    const data = await fs.readFile(USERS_TABLE, 'utf8');
    
    // Parse JSON string to JavaScript array
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return empty array (no users yet)
    if (error.code === 'ENOENT') {
      return [];
    }
    // Other errors, throw them up
    throw error;
  }
};

/**
 * Write users array to the JSON file
 * @param {Array} users - Array of user objects to save
 */
const writeUsers = async (users) => {
  // Make sure folder exists
  await ensureDatabaseDirectory();
  
  // Convert array to JSON string and write to file
  // null, 2 means: format with 2-space indentation (pretty print)
  await fs.writeFile(USERS_TABLE, JSON.stringify(users, null, 2), 'utf8');
};

/**
 * Save a new user to the database
 * @param {Object} user - User object to save
 * @returns {Object} The saved user
 */
const saveUser = async (user) => {
  // Read existing users
  const users = await readUsers();
  
  // Add new user to the array
  users.push(user);
  
  // Save updated array back to file
  await writeUsers(users);
  
  // Return the saved user
  return user;
};

/**
 * Find a user by their email address
 * @param {string} email - Email to search for
 * @returns {Object|null} User object or null if not found
 */
const findUserByEmail = async (email) => {
  const users = await readUsers();
  
  // Search for user with matching email (case-insensitive)
  return users.find(user => 
    user.email.toLowerCase() === email.toLowerCase()
  );
};

/**
 * Get all users (useful for testing or admin purposes)
 * @returns {Array} Array of all users
 */
const getAllUsers = async () => {
  return await readUsers();
};

/**
 * Update a user's information
 * @param {string} id - User ID to update
 * @param {Object} updates - Object with fields to update (name, phone, email)
 * @returns {Object|null} Updated user object or null if not found
 */
const updateUser = async (id, updates) => {
  const users = await readUsers();
  
  // Find the user index
  const userIndex = users.findIndex(user => user.id === id);
  
  // If user not found, return null
  if (userIndex === -1) {
    return null;
  }
  
  // Update only the provided fields (don't overwrite password or id)
  const allowedFields = ['name', 'phone', 'email', 'avatar'];
  allowedFields.forEach(field => {
    if (updates[field] !== undefined) {
      users[userIndex][field] = updates[field];
    }
  });
  
  // Save updated users array
  await writeUsers(users);
  
  // Return the updated user
  return users[userIndex];
};

/**
 * Update a user's password
 * @param {string} id - User ID to update
 * @param {string} newPassword - New hashed password
 * @returns {Object|null} Updated user object or null if not found
 */
const updateUserPassword = async (id, newPassword) => {
  const users = await readUsers();
  
  // Find the user index
  const userIndex = users.findIndex(user => user.id === id);
  
  // If user not found, return null
  if (userIndex === -1) {
    return null;
  }
  
  // Update password
  users[userIndex].password = newPassword;
  
  // Save updated users array
  await writeUsers(users);
  
  // Return the updated user
  return users[userIndex];
};

// Export functions so other files can use them
module.exports = {
  saveUser,           // Save a new user
  findUserByEmail,    // Find user by email
  getAllUsers,        // Get all users
  updateUser,         // Update user information
  updateUserPassword  // Update user password
};
