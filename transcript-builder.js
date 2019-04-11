fs = require('fs');
const rawTranscript = require('./transcript');

const transcript = [];

rawTranscript.forEach(speech => {
    const words = speech.split(' ');
    const tempSpeech = [];
    words.forEach(word => word.match(/[^\s]/) && tempSpeech.push({text: word}));
    transcript.push(tempSpeech);
});


const buffer = Buffer.from(`const transcript = ${JSON.stringify(transcript, 0, 4)}`);
fs.writeFile("public/transcript.js", buffer, 'binary', (err)=>{
    if(err) console.log(err);
    else console.log('File saved')
});