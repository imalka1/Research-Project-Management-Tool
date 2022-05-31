const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const url = 'mongodb://localhost/rpmt'

const app = express();
app.use(cors())
mongoose.connect(url);

const con = mongoose.connection;
con.on('open', () => {
    console.log('DB connected');
});

app.use(express.json());
app.use('/rpmt/user', require('./routers/user_routes'));
app.use('/rpmt/student', require('./routers/student_routes'));
app.use('/rpmt/admin', require('./routers/admin_routes'));
app.use('/rpmt/panel_member', require('./routers/panel_member_routes'));
app.use('/rpmt/staff', require('./routers/staff_routes'));

app.listen(9000, () => {
    console.log('Server started')
});
