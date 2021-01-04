export function Backspace(obj) {
    let {
        word: newWord,
        line: newLine, 
        index: newIdx
    } = obj;

    if (newWord.length <= 1) {
        if (newLine.length <= 1)
            newLine = [""]
        else {
            newLine.pop()
            if (newIdx > 0) newIdx-- 
            newWord = newLine[newIdx]
        }
    }
    else {
        newWord = newWord.substring(0, newWord.length-1)
        newLine[newIdx] = newWord
    }
    return {
        newWord,
        newLine,
        newIdx
    }
}
