const assert = require('chai').assert;
const txtToJson = require('../');

describe('when input has time, speaker, and text', () => {
  it('returns object with timestamp, speaker, and text', () => {
    const expected = {
      timestamp: '0:24:19.9',
      speaker: 'Adam Garrett-Harris & Jason Staten',
      text: '(laughing)',
    };

    const line = '0:24:19.9 **Adam Garrett-Harris & Jason Staten** (laughing)';
    const actual = txtToJson.processLine(line);

    assert.deepEqual(actual, expected);
  });
});

describe('when input has text only', function() {
  it('returns object with text', function() {
    const expected = {
      text: 'Intro music: Electro swing',
    };

    const line = 'Intro music: Electro swing ';
    const actual = txtToJson.processLine(line);

    assert.deepEqual(actual, expected);
  });
});

describe('when input has timestamp and text', function() {
  it('returns object with timestamp and text', function() {
    const expected = {
      timestamp: '0:00:41.0',
      text: '(Typewriter dings)',
    };

    const line = '0:00:41.0 (Typewriter dings)';
    const actual = txtToJson.processLine(line);

    assert.deepEqual(actual, expected);
  });
});
