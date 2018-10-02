/*
	This script uses command line arguments in this format
	| podcast name | episode number | text file input | outputfilename
	example node txt_to_json BookBytes 14 textfile.txt output.json
*/

var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader(process.argv[4]);
let transcript = [];
let count = 0;

lr.on('error', function (err) {
	// 'err' contains error object
	console.log(err.line);
	return;
});

lr.on('line', function (line) {
	// pause emitting of lines...
	lr.pause();

	// ...do your asynchronous line processing..
	setTimeout(function () {
		count += 1;
		if(line == '') {}
		else {
			if (line.includes('**')) { 
				// Timestamp, Speaker, Text
				let result = line.split('**');
				transcript.push({timestamp:result[0],speaker:result[1],text:result[2].trim()});
			} else if(line[0] == '(') {
				// Only text
				transcript.push({text:line});
			} else if(!isNaN(parseInt(line[0], 10))) {
				// Timestamp and text
				transcript.push({timestamp:line.slice(0,9), text:line.slice(10,line.length)});
			} else {
				console.log('Error: Unknown format on line '+count+': '+"\""+line+"\"");
			}
		}
		lr.resume();
	}, 100);
});

lr.on('end', function () {
	// All lines are read, file is closed now.
	let json_object = {podcast:process.argv[2],episode:process.argv[3],"transcript":transcript}
	var fs = require('fs');
	fs.writeFile(process.argv[5], JSON.stringify(json_object), 'utf8');
});