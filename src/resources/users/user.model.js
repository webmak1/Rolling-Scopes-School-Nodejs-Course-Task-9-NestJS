// @ts-check

const { v4: uuid } = require('uuid');

/**
 *  ### Class to create a User object
 */
class User {
  /**
   *
   * @param {Object} User - User
   */
  constructor({ name, login, password } = {}) {
    /**
     * @property {uuid()} id - id
     */
    this.id = uuid();

    /**
     * @property {string} name - name
     */
    this.name = name;

    /**
     * @property {string} login - login
     */
    this.login = login;

    /**
     * @property {string} password - password
     */
    this.password = password;
  }

  /**
   * ### Return User public data
   * @property {Function} toResponse - Returns User public data
   * @param {User} user - User
   * @returns { {id, name, login }} - {id, name, login}
   */
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
