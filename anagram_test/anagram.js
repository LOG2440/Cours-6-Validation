function anagram(firstSequence, secondSequence) {
  if (firstSequence.length !== secondSequence.length) {
    return false;
  }

  let sortedFirstSequence = Array.from(firstSequence).sort().toString();
  let sortedSecondSequence = Array.from(secondSequence).sort().toString();
  return sortedFirstSequence === sortedSecondSequence;
}

// Refactor

// function Anagram() {
//   function sortString(s) {
//     return Array.from(s).sort().toString();
//   }

//   return function anagram(firstSequence, secondSequence) {
//     return sortString(firstSequence) === sortString(secondSequence);
//   };
// }

// const anagram = Anagram();
module.exports = anagram;
