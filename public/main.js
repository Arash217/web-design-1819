const audioPlayer = new Plyr('audio', {});
const subtitles = document.querySelector('#subtitles');

const data = [
    {start: '0.125', end: '0.225', text: 'There', emotion: 'happy', read: false},
    {start: '0.225', end: '0.485', text: 'were', emotion: 'happy', read: false},
    {start: '0.485', end: '1.085', text: '10 in', emotion: 'happy', read: false},
    {start: '1.085', end: '1.325', text: 'his', emotion: 'happy', read: false},
    {start: '1.325', end: '1.685', text: 'bed', emotion: 'happy', read: false},
    {start: '1.685', end: '1.965', text: 'and the', emotion: 'happy', read: false},
    {start: '1.965', end: '2.245', text: 'little', emotion: 'happy', read: false},
    {start: '2.245', end: '2.565', text: 'one', emotion: 'happy', read: false},
    {start: '2.565', end: '2.985', text: 'said', emotion: 'happy', read: false},
    {start: '2.985', end: '3.485', text: 'Roll', emotion: 'anger', read: false},
    {start: '3.485', end: '3.965', text: 'over!', emotion: 'anger', read: false},
    {start: '3.965', end: '4.805', text: 'Roll', emotion: 'anger', read: false},
    {start: '4.805', end: '5.405', text: 'over!', emotion: 'anger', read: false}
];

const createSubtitle = () => {
    for (let i = 0; i < data.length; i++) {
        let element = document.createElement('span');
        element.setAttribute('id', 'c_' + i);
        element.innerText = data[i].text + ' ';
        subtitles.appendChild(element);
    }
};

createSubtitle();

audioPlayer.on('timeupdate', () => {
    for (let index = 0; index < data.length; index++) {
        const subtitleNode = subtitles.children[index];
        const subtitleData = data[index];

        if (audioPlayer.currentTime >= subtitleData.end) {
            subtitleData.read = true;
            subtitleNode.classList.remove('grey');
            subtitleNode.classList.add('black');
            subtitleNode.classList.add(subtitleData.emotion);
        } else {
            subtitleData.read = false;
            subtitleNode.classList.remove(...subtitleNode.classList);
            subtitleNode.classList.add('grey');
        }
    }
});