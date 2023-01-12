const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const app = express();

const authRouter = require('./routes/authRoute');
const servicesRouter = require('./routes/servicesRoute');
const newsRouter = require('./routes/newsRoute');
const noticesRouter = require('./routes/noticesRoute');
const userRouter = require('./routes/userRoute');

const statitDir = path.join(__dirname, 'public');

app.use(logger('short'));
app.use(cors());
app.use(express.json());
app.use(express.static(statitDir));

app.route('/petsupport/auth', authRouter);
app.route('/petsupport/services', servicesRouter);
app.route('/petsupport/news', newsRouter);
app.route('/petsupport/notices', noticesRouter);
app.route('/petsupport/user', userRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;