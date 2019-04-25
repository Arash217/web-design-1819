const player = new Plyr('audio', {'preload': 'auto'});
const transcriptNode = document.querySelector('#transcript');

/* Different datastructuur? */

const peter = {name: 'Peter Kafka', photo: 'images/peter.png'};
const michael = {name: 'Michael Barbaro', photo: 'images/michael.png'};

transcript[0].speaker = peter;
transcript[1].speaker = michael;
transcript[2].speaker = peter;
transcript[3].speaker = michael;
transcript[4].speaker = peter;
transcript[5].speaker = michael;

transcript.forEach((speech, index) => speech.forEach(word => {
    word.speaker = speech.speaker;
    word.speech = index;
}));

const transcriptList = [].concat(...transcript);

const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

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

        const tippyInstanceSpeaker = tippy(speakerNode, {
            arrow: true,
            content: speech.speaker.name,
            hideOnClick: false,
            placement: 'left',
            flipBehavior: ['left', 'top']
        });

        speech.forEach(word => {
            const wordNode = document.createElement('span');
            wordNode.setAttribute('id', `word_${i++}`);
            wordNode.innerText = `${word.text} `;
            const {message} = word;

            if (message) {
                const tippyInstance = tippy(wordNode, {
                    theme: word.emotion,
                    arrow: true,
                    content: `<strong>${capitalizeFirstLetter(word.emotion)}</strong> - ${word.message}`,
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
            word.tippySpeaker = tippyInstanceSpeaker;
            wordsContainerNode.appendChild(wordNode);
        });

        speechNode.appendChild(wordsContainerNode);
        speechesNodes.appendChild(speakerNode);
        speechesNodes.appendChild(speechNode);

    });
    transcriptNode.appendChild(speechesNodes);
};

renderTranscript();

let previousWord = null;

/* Todo: optimize performance */
player.on('timeupdate', () => {
    for (let i = 0; i < transcriptList.length; i++) {
        const word = transcriptList[i];
        const wordNode = document.querySelector(`#transcript #word_${i}`);

        if (player.currentTime >= word.end) {
            if (!word.read) {
                wordNode.classList.remove('grey');
                wordNode.classList.add('black');
                wordNode.scrollIntoView({
                    block: 'center',
                    behavior: 'smooth',
                    inline: "nearest"
                });

                if (word.tippy) {
                    word.tippy.enable();
                    word.tippy.show();
                    wordNode.classList.add(word.emotion);
                }

                if (previousWord && previousWord.speech !== word.speech){
                    previousWord.tippySpeaker.hide();
                }

                word.tippySpeaker.show();
                word.read = true;
                previousWord = word;
            }
            continue;
        }

        if (word.read) {
            wordNode.classList.remove(...wordNode.classList);
            wordNode.classList.add('grey');
            wordNode.scrollIntoView({
                block: 'center',
                behavior: 'smooth',
                inline: "nearest"
            });

            if (word.tippy) {
                word.tippy.hide();
                word.tippy.disable();
            }

            if (previousWord && previousWord.speech !== word.speech){
                previousWord.tippySpeaker.hide();
            }

            word.tippySpeaker.show();
            previousWord = word;
            word.read = false;
        }
    }
});

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};