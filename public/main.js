const audioPlayer = new Plyr('audio', {});
const transcriptNode = document.querySelector('#transcript');

/* TODO: transcript to json */
const transcript = [
    [
        {start: 0.125, end: 0.225, text: 'There', emotion: 'happy'},
        {start: 0.225, end: 0.485, text: 'were', emotion: 'happy'},
        {start: 0.485, end: 1.085, text: '10 in', emotion: 'happy'},
    ],
    [
        {start: 1.085, end: 1.325, text: 'his', emotion: 'happy'},
        {start: 1.325, end: 1.685, text: 'bed', emotion: 'happy'},
        {start: 1.685, end: 1.965, text: 'and the', emotion: 'happy'},
    ],
    [
        {start: 1.965, end: 2.245, text: 'little', emotion: 'happy'},
        {start: 2.245, end: 2.565, text: 'one', emotion: 'happy'},
        {start: 2.565, end: 2.985, text: 'said', emotion: 'happy'},
    ],
    [
        {start: 2.985, end: 3.485, text: 'Roll', emotion: 'angry'},
        {start: 3.485, end: 3.965, text: 'over!', emotion: 'angry'},
        {start: 3.965, end: 4.805, text: 'Roll', emotion: 'angry'},
        {start: 4.805, end: 5.405, text: 'over!', emotion: 'angry'}
    ]
];

const transcriptList = [].concat(...transcript);

const renderTranscript = () => {
    let transcriptSpeecheNodes = document.createElement('div');
    let i = 0;

    transcript.forEach(speech => {
        let speechNode = document.createElement('p');

        speech.forEach(word => {
            const wordNode = document.createElement('span');
            wordNode.setAttribute('id', 'c_' + i++);
            wordNode.innerText = word.text + ' ';
            speechNode.appendChild(wordNode);
        });

        transcriptSpeecheNodes.appendChild(speechNode);
    });
    transcriptNode.appendChild(transcriptSpeecheNodes);
};

renderTranscript();

/* Todo: optimize performance */

audioPlayer.on('timeupdate', () => {
    for (let i = 0; i < transcriptList.length; i++) {
        const speech = transcriptList[i];
        const subtitleNode = document.querySelector('#transcript #c_' + i);
        
        if (audioPlayer.currentTime >= speech.end) {
            subtitleNode.classList.remove('grey');
            subtitleNode.classList.add('black');
            subtitleNode.classList.add(speech.emotion);
        } else {
            subtitleNode.classList.remove(...subtitleNode.classList);
            subtitleNode.classList.add('grey');
        }
    }
});