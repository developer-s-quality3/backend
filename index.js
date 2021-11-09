const app = require('./app');
const { sequelize } = require('./models');

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  console.log(`Server is up on port ${port}`);
  await sequelize.authenticate();
  console.log('Database Connected');
});
