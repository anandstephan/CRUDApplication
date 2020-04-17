const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const employeeController = require('./controllers/employeeController');

const app = express();

app.set('views',path.join(__dirname,'/views/'));
app.engine('hbs',exphbs({extname:'hbs',defaultLayout:'mainLayout'}));
app.set('view engine','hbs');

app.use(express.urlencoded({extended:false}));

app.use(employeeController); // localhost:5000
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server is running at ${PORT}`));