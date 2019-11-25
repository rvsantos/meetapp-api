import Sequelize, { Model } from 'sequelize';

class Signup extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsTo(models.Meetup, { foreignKey: 'meetup_id' });
  }
}

export default Signup;
