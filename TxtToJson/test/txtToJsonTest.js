const assert = require('chai').assert;
const txtToJson = require('../txtToJson');

describe('Test for Time,Speaker,Text', function() {
	it('Should return js object with keys (timestamp, speaker, text)', function(){ 
		
		let expected = {
			"timestamp": "0:24:19.9",
			"speaker": "Adam Garrett-Harris & Jason Staten",
			"text": "(laughing)"
		  };
		
		let line = '0:24:19.9 **Adam Garrett-Harris & Jason Staten** (laughing)';
		
		let result = txtToJson.time_speaker_text(line);
		
		for (let key in result) {
			assert.equal(result[key],expected[key]);
		}
	});
});

describe('Test for Text Only', function() {
	it('Should return js object with key (text)', function(){ 
		
		let expected = {
			"text": "(Intro music: Electro swing)"
		  };
		
		let line = '(Intro music: Electro swing)';
		
		let result = txtToJson.text_only(line);
		
		for (let key in result) {
			assert.equal(result[key],expected[key]);
		}
	});
});

describe('Test for Timestamp and Text', function() {
	it('Should return js object with keys (timestamp and text)', function(){ 
		
		let expected = {
			"timestamp": "0:00:41.0",
			"text": "(Typewriter dings)"
		  }
		
		let line = '0:00:41.0 (Typewriter dings)';
		
		let result = txtToJson.time_text(line);
		
		for (let key in result) {
			assert.equal(result[key],expected[key]);
		}
	});
});