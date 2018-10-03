/*
	This script uses command line arguments in this format
	| podcast name | episode number | text file input | outputfilename
	example node txt_to_json BookBytes 14 textfile.txt output.json
*/

var funcs = module.exports = {};
let transcript = [];
let count = 0;

let runScript = function() {

	let LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader(process.argv[4]);

	lr.on('error', function (err) {
		// 'err' contains error object
		console.log(err.line);
		return;
	});

	lr.on('line', function (line) {
		count += 1;
		if(line == '') {}
		else {
			if (line.includes('**')) { 
				// Timestamp, Speaker, Text
				funcs.time_speaker_text(line);
			} else if(line[0] == '(') {
				// Only text
				funcs.text_only(line);
			} else if(!isNaN(parseInt(line[0], 10))) {
				// Timestamp and text
				funcs.time_text(line);
			} else {
				console.log('Error: Unknown format on line '+count+': '+"\""+line+"\"");
			}
		}
	});

	lr.on('end', function () {
		// All lines are read, file is closed now.
		let json_object = {podcast:process.argv[2],episode:process.argv[3],"transcript":transcript}
		var fs = require('fs');
		fs.writeFile(process.argv[5], JSON.stringify(json_object,null,2), 'utf8',(error) =>{return});
		return json_object;
	});
}

funcs.time_speaker_text = function(line) {
	let result = line.split('**');
	let json_data = {timestamp:result[0].trim(),speaker:result[1],text:result[2].trim()}
	transcript.push(json_data);
	return json_data;
}

funcs.text_only = function(line) {
	let json_data = {text:line}
	transcript.push({text:line});
	return json_data;
}

funcs.time_text = function(line) {
	let json_data = {timestamp:line.slice(0,9), text:line.slice(10,line.length)}
	transcript.push(json_data);
	return json_data;
}

 if(process.argv.length > 2) {
 	runScript();
 }