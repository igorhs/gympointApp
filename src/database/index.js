// Database connection

import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import Admin from '../app/models/Admin';
import Students from '../app/models/Students';
import Memberships from '../app/models/Memberships';
import Registrations from '../app/models/Registrations';
import Checkins from '../app/models/Checkins';
import HelpOrders from '../app/models/HelpOrders';

const models = [
  Admin,
  Students,
  Memberships,
  Registrations,
  Checkins,
  HelpOrders,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
