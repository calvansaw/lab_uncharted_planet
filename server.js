require('dotenv').config();
const { request } = require('express');
const express = require('express');
const { reduce } = require('./models/scientists');
const app = express();
const port = process.env.PORT || 3000;
const methodOverride = require('method-override');

//////////////////////Middleware/////////////////////////
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

//////////////////////Import Data////////////////////////
const scientists = require('./models/scientists');

//////////////////////Routes/////////////////////////
app.get('/', (req, res) => {
	res.send('Hello World, uncharted planet');
});

//////Index route///////
app.get('/scientists', (req, res) => {
	res.render('index.ejs', { allScientists: scientists });
});

//////New route///////
app.get('/scientists/new', (req, res) => {
	res.render('new.ejs');
});

//////Edit route///////
app.get('/scientists/:index/edit', (req, res) => {
	res.render('edit.ejs', {
		scientistObj: scientists[req.params.index],
		index: req.params.index,
	});
});

//////Show route///////
app.get('/scientists/:index', (req, res) => {
	res.render('show.ejs', {
		scientistObj: scientists[req.params.index],
		index: req.params.index,
	});
});

//////Create route///////
app.post('/scientists', (req, res) => {
	scientists.push(req.body);
	res.redirect('/scientists');
});

//////Destroy route///////
app.delete('/scientists/:index', (req, res) => {
	scientists.splice(req.params.index, 1);
	res.redirect('/scientists');
});

//////Update route///////
app.put('/scientists/:index', (req, res) => {
	scientists[req.params.index] = req.body;
	res.redirect('/scientists');
});

//////////////////////////////////////////////////////
app.listen(port, () => {
	console.log('Listening at port', port);
});
