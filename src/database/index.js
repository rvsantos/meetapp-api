import Sequelize from 'sequelize';

import User from '../app/models/user';
import File from '../app/models/File';
import Meetup from '../app/models/Meetup';
import MeetupSignup from '../app/models/MeetupSignup';

import databaseConfig from '../config/database';

const models = [User, File, Meetup, MeetupSignup];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
