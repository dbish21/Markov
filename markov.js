/** Textual markov chain generator */


class MarkovMachine {

  /** 
   * Build markov machine from input text.
   * @param {string} text - The input text to build chains from
   */

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** 
   * Creates the Markov chain map where:
   * - Each word is a key
   * - Value is array of words that follow it in the text
   * - null indicates end of chain
   * Example: "the cat in the hat" becomes
   * {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]}
   */

  makeChains() {
    let chains = new Map();

    for (let i = 0; i < this.words.length; i += 1) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if (chains.has(word)) chains.get(word).push(nextWord);
      else chains.set(word, [nextWord]);
    }

    this.chains = chains;
  }


  /**
   * Selects a random element from an array
   * @param {Array} ar - Array to choose from
   * @returns {*} Random element from array
   */

  static choice(ar) {
    return ar[Math.floor(Math.random() * ar.length)];
  }


  /**
   * Generates random text using Markov chain
   * @param {number} numWords - Maximum number of words to generate
   * @returns {string} Generated text
   */

  makeText(numWords = 100) {
    // pick a random key to begin
    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.choice(keys);
    let out = [];

    // produce markov chain until reaching termination word
    while (out.length < numWords && key !== null) {
      out.push(key);
      key = MarkovMachine.choice(this.chains.get(key));
    }

    return out.join(" ");
  }
}


module.exports = {
  MarkovMachine,
};