const assert = require('chai').assert;
const txtToJson = require('../');

describe('when input has time, speaker, and text', () => {
  it('returns object with timestamp, speaker, and text', () => {
    let expected = {
      timestamp: '0:24:19.9',
      speaker: 'Adam Garrett-Harris & Jason Staten',
      text: '(laughing)',
    };

    let line = '0:24:19.9 **Adam Garrett-Harris & Jason Staten** (laughing)';
    let actual = txtToJson.processLine(line);

    assert.deepEqual(actual, expected);
  });
});

describe('when input has text only', function() {
  it('returns object with text', function() {
    let expected = {
      text: 'Intro music: Electro swing',
    };

    let line = 'Intro music: Electro swing ';
    let actual = txtToJson.processLine(line);

    assert.deepEqual(actual, expected);
  });
});

describe('when input has timestamp and text', function() {
  it('returns object with timestamp and text', function() {
    let expected = {
      timestamp: '0:00:41.0',
      text: '(Typewriter dings)',
    };

    let line = '0:00:41.0 (Typewriter dings)';
    let actual = txtToJson.processLine(line);

    assert.deepEqual(actual, expected);
  });
});
