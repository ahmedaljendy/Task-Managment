const { DataSource } = require('typeorm');

const dbConfig = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'taskApi',
  autoLoadEntities: true,
  synchronize: false,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/src/migrations/*.js'],
  migrationsTableName: 'migrations',
  cli: {
    migrationsDir: 'src/migrations',
  },
};

module.exports = new DataSource(dbConfig);
