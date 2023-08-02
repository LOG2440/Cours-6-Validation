/**
 * Compares 2 chaînes pour vérifier si une est une anagramme de l'autre
 * Une anagramme est un mot ou une expression obtenu en 
 * permutant les lettres d'un mot ou d'une expression de départ.
 * @param {string} firstSequence mot original
 * @param {string} secondSequence anagramme possible
 * @returns {boolean} true si secondSequence est une anagramme de firstSequence, false sinon
 */
function anagram(firstSequence, secondSequence) {
  if (firstSequence.length !== secondSequence.length) {
    return false;
  }

  const sortedFirstSequence = Array.from(firstSequence).sort().toString();
  const sortedSecondSequence = Array.from(secondSequence).sort().toString();
  return sortedFirstSequence === sortedSecondSequence;
}

module.exports = anagram;
