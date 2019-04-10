const audioPlayer = new Plyr('audio', {});
const subtitles = document.querySelector("#subtitles");

const data = [
    {"start": "0.125", "end": "0.225", "text": "There"},
    {"start": "0.225", "end": "0.485", "text": "were"},
    {"start": "0.485", "end": "1.085", "text": "10 in"},
    {"start": "1.085", "end": "1.325", "text": "his"},
    {"start": "1.325", "end": "1.685", "text": "bed"},
    {"start": "1.685", "end": "1.965", "text": "and the"},
    {"start": "1.965", "end": "2.245", "text": "little"},
    {"start": "2.245", "end": "2.565", "text": "one"},
    {"start": "2.565", "end": "2.985", "text": "said"},
    {"start": "2.985", "end": "3.485", "text": "Roll"},
    {"start": "3.485", "end": "3.965", "text": "over!"},
    {"start": "3.965", "end": "4.805", "text": "Roll"},
    {"start": "4.805", "end": "5.405", "text": "over!"}
];

const createSubtitle = () => {
    for (let i = 0; i < data.length; i++) {
        let element = document.createElement('span');
        element.setAttribute("id", "c_" + i);
        element.innerText = data[i].text + " ";
        subtitles.appendChild(element);
    }
};

createSubtitle();

audioPlayer.on("timeupdate",  () => {
    data.forEach( (element, index) => {
        if (audioPlayer.currentTime >= element.start && audioPlayer.currentTime <= element.end)
            subtitles.children[index].style.color = 'black';
    });
});