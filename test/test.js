var assert = require('assert');
var superagent = require('superagent');
var server = require('../server.js');
var status = require('http-status');
var http = require('http');

var testingID = 0;
var app = -1;

// test 1 and 2
describe('/api/pad/', function() {

  before(function() {
    app = server(3000);
  });

  it('fetches wattpad story', function(done) {
    superagent.get('http://localhost:3000/api/pad/30606794').end(function(err, res) {
      assert.ifError(err);
      assert.equal(res.status, status.OK);
      // console.log(res.text);
      assert(res.text.length !== 0);
      done();
    });
  });

  it('fails gracefully when wattpad part does\'t exist', function(done) {
    superagent.get('http://localhost:3000/api/pad/404').end(function(err, res) {
      assert.ifError(err);
      assert.equal(res.status, status.OK);
      assert(res.text.length === 0);
      done();
    });
  });
});

// test 3
describe('/api/insert/', function() {

  before(function( done ){
      checkapp( done );
  });

  it('inserts text into mongo (make sure mongod is running, hacky for now)', function(done) {
    superagent.get('http://localhost:3000/api/insert/testtext').end(function(err, res) {
      assert.ifError(err);
      assert.equal(res.status, status.OK);
      assert(res.text.length > 0);
      testingID = res.text;
      // console.log(res.text);
      done();
    });
  });

  var checkapp = function(done) {
    // console.log(testingID);
    if (app !== -1){
      done();
    }
    else setTimeout( function(){
      checkapp(done);
    }, 500 );
  };
});

// test 4
describe('/api/retrieve/', function() {

  before(function( done ){
      checkinsert( done );
  });

  it('retrieves that text from mongo', function(done){
    // Only gets here once `someCondition` is satisfied
    superagent.get('http://localhost:3000/api/retrieve/'+testingID.replace(/['"]+/g, '')).end(function(err, res) {
      assert.ifError(err);
      assert.equal(res.status, status.OK);
      assert(res.text === "testtext");
      done();
    });
  });

  var checkinsert = function(done) {
  	// console.log(testingID);
      if (testingID !== 0){
        done();
      }
      else setTimeout(function(){
        checkinsert(done);
      }, 500 );
    };
});
