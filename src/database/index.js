// Database connection

import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import Admin from '../app/models/Admin';
import Students from '../app/models/Students';

const modelAdmin = [Admin];
const modelStudents = [Students];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    modelAdmin.map(model => model.init(this.connection));
    modelStudents.map(model => model.init(this.connection));
  }
}

export default new Database();
