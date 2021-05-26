// @ts-check

const express = require('express');
const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model');

console.log('**Express Version: ', express.version);

/**
 * ### Get All Tasks
 * @returns {Promise<Task[]>} - Promise with All Tasks
 */
const getAll = async () => {
  const tasks = await tasksRepo.getAll();
  return tasks.map(Task.toResponse);
};

/**
 * ### Get Task
 * @param {express.Request} req
 * @returns {Promise<Task>} - Promise with a Single Task
 */
const get = async (req) => {
  const { boardId, id: taskId } = req.params;
  const task = await tasksRepo.get(boardId, taskId);
  return Task.toResponse(task);
};

/**
 * ### Create Task
 * @param {express.Request} req
 * @returns {Promise<Task>} - Promise with Created Task or Empty object
 */
const create = async (req) => {
  const { title, order, description, userId, columnId } = req.body;
  const { boardId } = req.params;

  const task = await tasksRepo.create(
    new Task({
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    })
  );
  return Task.toResponse(task);
};

/**
 * ### Update Task
 * @param {express.Request} req
 * @returns {Promise<Task>} - Promise with Updated Task
 */
const update = async (req) => {
  const { body } = req;
  const { boardId, id: taskId } = req.params;

  const updatedTask = await tasksRepo.update(boardId, taskId, body);
  return Task.toResponse(updatedTask);
};

/**
 * ### Remove Task
 * @param {express.Request} req
 * @returns {Promise<Task>} - Promise with Deleted Task
 */
const remove = async (req) => {
  const task = await tasksRepo.remove(req.params.id);
  return Task.toResponse(task);
};

module.exports = { getAll, get, create, update, remove };
