# txtToJson script

Converts the transcripts from txt to json format.

## Running

```
npm install
npm start BookBytes 8 bb-8.txt bb-8.json
```

## Testing

`npm run test`

## Example txt format

```
(Intro music: Electro swing) 

0:00:13.2 **Adam Garrett-Harris** Hello, and welcome to BookBytes, a book club podcast for developers. We’re continuing our summer of an Imposter’s syndrome by talking about “The Imposter’s Handbook” by Rob Conery which is a CS primer for self-taught programmers. So today we’re going to go over chapters 8 and 9: Advanced Algorithms and Compilation.  I’m Adam Garrett-Harris. 

0:00:36.5 **Safia Abdalla** I’m Safia Abdalla. 

0:00:38.2 **Jen Luker** I’m Jen Luker. 

0:00:39.5 **Jason Staten** And I’m Jason Staten. 

0:00:41.0 **Adam Garrett-Harris** All right, so what about Advanced Algorithms? 

(Typewriter Dings)


________________



0:00:45.5 **Adam Garrett-Harris** I think he kind of mentioned here ke’s kind of using the term “advanced” loosely. It’s kind of just like, algorithms part two, but I don’t know, some of these are kinda complicated. 
```


## Example json format

```
{
  "podcast": "BookBytes",
  "episode": "8",
  "transcript": [
    {
      "timestamp": "0:00:13.2",
      "speaker": "Adam Garrett-Harris",
      "text": "Hello, and welcome to BookBytes, a book club podcast for developers. We’re continuing our summer of an Imposter’s syndrome by talking about “The Imposter’s Handbook” by Rob Conery which is a CS primer for self-taught programmers. So today we’re going to go over chapters 8 and 9: Advanced Algorithms and Compilation.  I’m Adam Garrett-Harris."
    },
    {
      "timestamp": "0:00:36.5",
      "speaker": "Safia Abdalla",
      "text": "I’m Safia Abdalla."
    },
    {
      "timestamp": "0:00:38.2",
      "speaker": "Jen Luker",
      "text": "I’m Jen Luker."
    },
    {
      "timestamp": "0:00:39.5",
      "speaker": "Jason Staten",
      "text": "And I’m Jason Staten."
    },
    {
      "timestamp": "0:00:41.0",
      "speaker": "Adam Garrett-Harris",
      "text": "All right, so what about Advanced Algorithms?"
    },
    {
      "text": "(Typewriter Dings)"
    },
    {
      "timestamp": "0:00:45.5",
      "speaker": "Adam Garrett-Harris",
      "text": "I think he kind of mentioned here ke’s kind of using the term “advanced” loosely. It’s kind of just like, algorithms part two, but I don’t know, some of these are kinda complicated."
    }
  ]
}
```
