const player = new Plyr('audio', {'preload': 'auto'});
const transcriptNode = document.querySelector('#transcript');

// let audio;
//
// function preload() {
//     audio = loadSound(player.source);
// }

/* Different datastructuur? */

const peter = {name: 'Peter Kafka', photo: 'images/peter.png'};
const michael = {name: 'Michael Barbaro', photo: 'images/michael.png'};

transcript[0].speaker = peter;
transcript[1].speaker = michael;
transcript[2].speaker = peter;
transcript[3].speaker = michael;
transcript[4].speaker = peter;
transcript[5].speaker = michael;

transcript.forEach(speech => speech.forEach(word => word.speaker = speech.speaker));

const transcriptList = [].concat(...transcript);

const renderTranscript = () => {
    const speechesNodes = document.createElement('div');
    speechesNodes.classList.add('speeches');
    let i = 0;

    transcript.forEach(speech => {
        const speechNode = document.createElement('div');
        const speakerNode = document.createElement('div');
        const speakerPictureNode = document.createElement('img');
        const wordsContainerNode = document.createElement('div');

        speechNode.classList.add('speech');
        speakerPictureNode.src = speech.speaker.photo;
        speakerNode.appendChild(speakerPictureNode);
        speakerNode.classList.add('speaker');
        wordsContainerNode.classList.add('words');

        speech.forEach(word => {
            const wordNode = document.createElement('span');
            wordNode.setAttribute('id', `word_${i++}`);
            wordNode.innerText = `${word.text} `;
            const {message} = word;

            if (message) {
                const tippyInstance = tippy(wordNode, {
                    arrow: true,
                    content: word.message,
                    hideOnClick: false,
                    onShow(instance) {
                        clearTimeout(instance.timeOutId);
                        instance.timeOutId = setTimeout(() => {
                            instance.hide();
                        }, 5000);
                    }
                });
                word.tippy = tippyInstance;
                tippyInstance.disable();
            }

            wordsContainerNode.appendChild(wordNode);
        });

        speechNode.appendChild(wordsContainerNode);
        speechesNodes.appendChild(speakerNode);
        speechesNodes.appendChild(speechNode);

    });
    transcriptNode.appendChild(speechesNodes);
};

renderTranscript();

/* Todo: optimize performance */
player.on('timeupdate', () => {
    for (let i = 0; i < transcriptList.length; i++) {
        const word = transcriptList[i];
        const wordNode = document.querySelector(`#transcript #word_${i}`);

        if (player.currentTime >= word.end) {
            if (!word.read) {
                wordNode.classList.remove('grey');
                wordNode.classList.add('black');

                if (word.tippy) {
                    word.tippy.enable();
                    word.tippy.show();
                    wordNode.classList.add('highlighted');
                }

                word.read = true;
            }
            continue;
        }

        if (word.read) {
            wordNode.classList.remove(...wordNode.classList);
            wordNode.classList.add('grey');

            if (word.tippy) {
                word.tippy.hide();
                word.tippy.disable();
            }

            word.read = false;
        }
    }
});

// let cnv;
// let amplitude;
//
// function setup() {
//     cnv = createCanvas(100, 100);
//     amplitude = new p5.Amplitude();
//
//     // start / stop the sound when canvas is clicked
//
//     player.on('play', () => {
//         audio.play();
//     });
//
//     player.on('pause', () => {
//         audio.stop();
//     });
// }
//
// function draw() {
//     background(0);
//     fill(255);
//     var level = amplitude.getLevel();
//     var size = map(level, 0, 1, 0, 200);
//     ellipse(width/2, height/2, size + 80, size + 80);
// }