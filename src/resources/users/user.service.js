// @ts-check

const express = require('express');
const usersRepo = require('./user.memory.repository');
const User = require('./user.model');

/**
 * A Public User Data
 * @typedef {Object} PublicUserData - Public User Data
 * @property {string} id - id
 * @property {string} name - name
 * @property {string} login - login
 */

/**
 * ### Get All Users in Service
 * @returns {Promise<PublicUserData[]>} - Promise with All Users in Service
 */
const getAll = async () => {
  const users = await usersRepo.getAll();
  return users.map(User.toResponse);
};

/**
 * ### Get User by ID in Service
 * @param {express.Request} req
 * @returns {Promise<PublicUserData>} - Promise with User by ID in Service
 */
const get = async (req) => {
  const user = await usersRepo.get(req.params.id);
  return User.toResponse(user);
};

/**
 * ### Create User by ID in Service
 * @param {express.Request} req
 * @returns {Promise<PublicUserData | {}>} - Promise with Created User in Service
 */
const create = async (req) => {
  const { login, password, name } = req.body;
  const user = new User({
    login,
    password,
    name,
  });
  const createdUser = await usersRepo.create(user);
  return User.toResponse(createdUser);
};

/**
 * ### Update User in Service
 * @param {string} id - User Id
 * @param {User} newUser - new User
 * @returns {Promise<PublicUserData>}  - Promise with Updated User in Service
 */
const update = async (id, newUser) => {
  const user = await usersRepo.update(id, newUser);
  return User.toResponse(user);
};

/**
 * ### Remove User in Service
 * @param {string} id - User Id
 * @returns {Promise<PublicUserData>} - Promise with Deleted User in Service
 */
const remove = async (id) => {
  const user = await usersRepo.remove(id);
  return User.toResponse(user);
};

// Dummy for linter
if (process.env.level) {
  console.log('**Express Version: ', express.version);
}

module.exports = { getAll, get, create, remove, update };
