const player = new Plyr('audio', {'preload': 'auto'});
const transcriptNode = document.querySelector('#transcript');

/* Different datastructuur? */

transcript[0].speaker = {name: 'Peter Kafka', photo: 'images/peter.png'};
transcript[1].speaker = {name: 'Michael Barbaro', photo: 'images/michael.png'};
transcript[2].speaker = {name: 'Peter Kafka', photo: 'images/peter.png'};
transcript[3].speaker = {name: 'Michael Barbaro', photo: 'images/michael.png'};
transcript[4].speaker = {name: 'Peter Kafka', photo: 'images/peter.png'};
transcript[5].speaker = {name: 'Michael Barbaro', photo: 'images/michael.png'};

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
                        setTimeout(() => {
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
