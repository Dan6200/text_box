function Backspace(obj) {
    if (word && word.length > 1) 
        word = word.substring(0, word.length-1)
    else 
        word = ''
    if (updateLine.length >= 1 && updateLine[index].length === 1) {
        updateLine.pop()
    if (index > 0) setIndex(index - 1);
            word = updateLine[index-1]
    }
    else {
        updateLine[index] = word;
    }
    setLine([...updateLine])
