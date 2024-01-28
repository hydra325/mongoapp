const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/merndb');

const UserApp = mongoose.model('myapp', { name: String });

const kitty = new UserApp({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));