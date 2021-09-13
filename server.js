const express = require('express')
const session = require('express-session')
const handle = require('express-handlebars')
const routes = require('./controllers');
const path = require('path');
const sequelize = require('./config/connection');
const SequelizeStore =require('connect-session-sequelize')(session.Store)


const app = express();
const PORT = process.env.PORT || 3000;



const sess = {
  secret: 'plants',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
}
app.use(session(sess))


app.set('view engine', 'hbs');
app.engine('hbs', handle({
  extname: 'hbs',
  defaultView: 'home',
  layoutDir: __dirname + 'views/layouts'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);      
// port where app is served
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening to port ${PORT}`))
});


