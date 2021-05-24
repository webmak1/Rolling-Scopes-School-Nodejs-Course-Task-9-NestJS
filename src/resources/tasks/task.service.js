const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model');

const getAll = async () => {
  const tasks = await tasksRepo.getAll();
  return tasks.map(Task.toResponse);
};
const get = async (req) => {
  const { boardId, id: taskId } = req.params;
  const task = await tasksRepo.get(boardId, taskId);
  return Task.toResponse(task);
};
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
const update = async (req) => {
  const { body } = req;
  const { boardId, id: taskId } = req.params;

  const updatedTask = await tasksRepo.update(boardId, taskId, body);
  return Task.toResponse(updatedTask);
};

const remove = async (req) => {
  const task = await tasksRepo.remove(req.params.id);
  return Task.toResponse(task);
};

module.exports = { getAll, get, create, update, remove };
