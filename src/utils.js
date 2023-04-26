export const decodeString = str => {
    const decodedString = document.createElement('textarea')
    decodedString.innerHTML = str
    return decodedString.value
}

export const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array
}

export const categoryDecoder = (number) => {
    const result = number == 9 ? 'General Knowledge' :
        number == 10 ? 'Books' :
            number == 11 ? 'Films' :
                number == 12 ? 'Music' :
                    number == 13 ? 'Musicals & Theaters' :
                        number == 14 ? 'Television' :
                            number == 15 ? 'Video Games' :
                                number == 16 ? 'Board Games' :
                                    number == 17 ? 'Science & Nature' :
                                        number == 18 ? 'Computers' :
                                            number == 19 ? 'Mathematics' :
                                                number == 20 ? 'Mythology' :
                                                    number == 21 ? 'Sports' :
                                                        number == 22 ? 'Geography' :
                                                            number == 23 ? 'History' :
                                                                number == 24 ? 'Politics' :
                                                                    number == 25 ? 'Art' :
                                                                        number == 26 ? 'Celebrities' :
                                                                            number == 27 ? 'Animals' :
                                                                                'Any'
    return result
}

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}