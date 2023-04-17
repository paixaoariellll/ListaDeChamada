export default function selectRandomWords(wordsList) {
  const randomWords = [];
  const usedIndexes = new Set();

  for (let i = 0; i < 5; i++) {
    let index = Math.floor(Math.random() * wordsList.length);

    // garantir que não selecione a mesma palavra mais de uma vez
    while (usedIndexes.has(index)) {
      index = Math.floor(Math.random() * wordsList.length);
    }

    randomWords.push(wordsList[index]);
    usedIndexes.add(index);
  }

  // selecionar uma das palavras aleatórias como a palavra correta
  const correctWord = randomWords[Math.floor(Math.random() * randomWords.length)];

  return {
    words: randomWords,
    correctWord,
  };
}
