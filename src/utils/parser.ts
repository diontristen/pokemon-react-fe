export const parseToSentence = (str: string) => {
    if (!str || typeof str !== 'string') return str;
    str = str.replace(/_/g, ' ');
    const sentences = str.match(/[^.!?]+[.!?]*\s*/g);

    if (!sentences) return str;

    const sentenceCasedArray = sentences.map(sentence => {
        return sentence.trim().toLowerCase().replace(/^./, char => char.toUpperCase());
    });

    return sentenceCasedArray.join(' ');
}