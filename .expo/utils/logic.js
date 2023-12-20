

export function arrayMaker(optionsArr){
    const newOptionsArr = [];
    optionsArr.map((option) => {
        for(let i = 0; i < option.chance; i++){
            newOptionsArr.push({
                id: option.id,
                option: option.option,
                selected: true
            })
            // newOptionsArr.push(option)
        }
    })
    const shuffledArray = shuffleArray(newOptionsArr);
    return makeDecision(shuffledArray);
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function makeDecision(newOptionsArr){
    const rundomNumber = Math.floor(Math.random() * newOptionsArr.length);
    const choosenOptionArr = [newOptionsArr[rundomNumber]]
    return choosenOptionArr;
}
