const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./src/models/user');

const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.redirect('/login');
    } catch (error) {
        res.status(500).send('Server error');
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
      const user = await User.findOne({ email });
      if (user && await bcrypt.compare(password, user.password)) {
          res.redirect('/profile');
      } else {
          res.status(401).send('Invalid credentials');
      }
  } catch (error) {
      res.status(500).send('Server error');
  }
});

app.post('/profile', async (req, res) => {
  const { username, email } = req.body;
  try {
      const user = await User.findByIdAndUpdate(req.session.userId, { username, email });
      res.redirect('/profile');
  } catch (error) {
      res.status(500).send('Server error');
  }
});

app.get('/services', async (req, res) => {
  try {
      const services = await Service.find();
      res.json(services);
  } catch (error) {
      res.status(500).send('Server error');
  }
});

app.get('/admin/users', async (req, res) => {
  try {
      const users = await User.find();
      res.json(users);
  } catch (error) {
      res.status(500).send('Server error');
  }
});

app.get('/admin/services', async (req, res) => {
  try {
      const services = await Service.find();
      res.json(services);
  } catch (error) {
      res.status(500).send('Server error');
  }
});
