module.exports = {
  dialect: 'postgres',
  username: 'postgres',
  password: 'docker',
  database: 'meetapp',
  host: '172.17.0.2',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};
