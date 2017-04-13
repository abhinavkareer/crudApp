var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET home page. */
// Create a schema
var TestSchema = new mongoose.Schema({
  numb1: Number,
  numb2: Number,
  res: Number,
  
});
// Create a model based on the schema
var TestData = mongoose.model('test', TestSchema);

router.get('/getData', function(req, res, next) {
TestData.find(function (err, testData) {
	res.json(testData);
});
 
});

router.post('/saveData', function(req, res, next) {
var data=JSON.parse(req.body.numbs);
var newTest = new TestData(data);


TestData.find(function (err, testData) {
	if(testData.length==0){
		// Save it to database
newTest.save(function(err){
  if(err)
    res.json(err);
  else
     res.json(newTest);
});
	}
	else
	{
		TestData.update(testData[0],data,function(err){
  if(err)
    res.json(err);
  else
     res.json(newTest);
});
	}
})





});

router.get('/', function(req, res, next) {
  res.render('index');
});


module.exports = router;
