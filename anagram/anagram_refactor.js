function Anagram() {
    /**
     * Trie une chaîne de caractère en ordre alphabétique
     * @param {string} s chaîne à trier
     * @returns {string} chaîne triée en ordre alphabétique
     */
    function sortString(s) {
        return Array.from(s).sort().toString();
    }

    /**
     * Compares 2 chaînes pour vérifier si une est une anagramme de l'autre
     * Une anagramme est un mot ou une expression obtenu en 
     * permutant les lettres d'un mot ou d'une expression de départ.
     * @param {string} firstSequence mot original
     * @param {string} secondSequence anagramme possible
     * @returns {boolean} true si secondSequence est une anagramme de firstSequence, false sinon
     */
    return function anagram(firstSequence, secondSequence) {
        return sortString(firstSequence) === sortString(secondSequence);
    };
}

const anagram = Anagram();
module.exports = anagram;