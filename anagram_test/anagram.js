/**
 * Compares two strings to see if they are anagrams of each other
 * An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, 
 * typically using all the original letters exactly once
 * @param {string} firstSequence original word to compare to
 * @param {string} secondSequence possible anagram
 * @returns {boolean} returns true if secondSequence is an anagram of firstSequence
 */
function anagram(firstSequence, secondSequence) {
  if (firstSequence.length !== secondSequence.length) {
    return false;
  }

  const sortedFirstSequence = Array.from(firstSequence).sort().toString();
  const sortedSecondSequence = Array.from(secondSequence).sort().toString();
  return sortedFirstSequence === sortedSecondSequence;
}

// Refactor
/* 
function Anagram() {
  function sortString(s) {
    return Array.from(s).sort().toString();
  }

  return function anagram(firstSequence, secondSequence) {
    return sortString(firstSequence) === sortString(secondSequence);
  };
}

const anagram = Anagram();
*/
module.exports = anagram;
