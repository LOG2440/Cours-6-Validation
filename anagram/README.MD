# Anagrammes et test unitaires

Ce projet est un exemple simple de l'utilisation de la librairie [`Jest`](https://jestjs.io/) pour écrire des tests unitaires pour du code JavaScript.

La fonction `anagram` définie dans [`anagram.js`](./anagram.js) permet de vérifier si une chaîne de caractères est une anagramme d'un autre. Un anagramme est un mot formé en changeant de place les lettres d'un autre mot. Exemple : une anagramme de `gare` est `rage`.

Une version réusinée, mais avec le même comportement, de la fonction est disponible dans [`anagram_refactor.js`](./anagram_refactor.js).

Les tests de la fonction sont disponibles dans le fichier [`anagram.test.js`](./anagram.test.js). Si vous modifiez le module importé pour la version réusinée, vous devriez avoir le même comportement des tests.

## Installation de la librairie

Ce projet n'a besoin que de la librairie `jest` qui est fourni dans la configuration du fichier [package.json](./package.json). Pour installer la librairie, vous pouvez utiliser la commande `npm ci` dans ce répertoire pour avoir la version exacte de la dépendance.

## Exécution des tests et calcul de la couverture du code

Les tests peuvent être exécutés à l'aide de la commande `npm run test` dans ce répertoire. Le résultat de l'exécution sera visible directement dans le terminal.

La commande `npm run coverage` permet d'exécuter les tests et calculer le taux de couverture des tests (100% pour le code fourni). Le résultat de l'exécution sera visible directement dans le terminal. Un rapport en format HTML sera également généré dans le répertoire `coverage/lcov-report`. Notez que ce répertoire n'est pas présent par défaut et sera généré dès la 1re exécution de la commande.

## Exercice

L'implémentation initiale n'a pas un comportement explicite pour 2 cas d'utilisation spécifiques : 
- Sensibilité à la case. Ex : est-ce que `gare` et `Rage` devraient être considérées comme des anagrammes un à l'autre
- Gestion des paramètres `null` ou `undefined`. Ex : `anagram("rage",null)` ou `anagram(undefined,"gare")`

Dans les 2 cas, vous devez écrire un test pour vérifier le comportement par défaut et, au besoin, modifier le code initial pour faire passer les tests que vous avez écrit. Le fichier [`anagram.test.js`](./anagram.test.js) contient déjà une suite de tests vide pour écrire les tests pour ces cas d'utilisation.