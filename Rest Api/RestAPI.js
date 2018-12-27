let express = require('express');
let app = express();
let cors = require('cors');
app.use(cors());
require('./getRequests.js')(app);
app.listen(1111, function (err) {
    if (err) throw err;
    else{
        console.log("Listening on port 1111");
    }
});