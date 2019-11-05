module.export = {
  username: 'postgres',
  password: 'docker',
  database: 'meetapp',
  host: '172.17.0.2',
  dialect: 'postges',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};
