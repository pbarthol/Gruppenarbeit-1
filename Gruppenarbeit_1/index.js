var express = require('express');
var bodyParser = require('body-parser');
var hbs = require('express-hbs');


var app = express();
app.engine('hbs', hbs.express4());
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require("method-override")(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

app.use("/", require('./routes/notesRoutes.js'));
app.use("/notes", require('./routes/notesRoutes.js'));
app.use("/note", require('./routes/notesRoutes.js'));
app.use("/notes/edit", require('./routes/notesRoutes.js'));
/*
app.get("/ajax", function(req, res){
    res.sendFile("./public/html/index.html")
});
*/
app.use(express.static('public/html'));
app.use(express.static('public/js'));
app.use(express.static('public'));

hbs.registerHelper('if_eq', function(a, b, opts) {
    if(a == b) // Or === depending on your needs
        return opts.fn(this);
    else
        return opts.inverse(this);
});

const hostname = '127.0.0.1';
const port = 3001;
app.listen(port, hostname, () => {  console.log(`Server running at http://${hostname}:${port}/`); });
