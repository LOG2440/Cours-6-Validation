# Tests pour un projet plus complexe

Ce projet est un exemple simple de l'utilisation de la librairie [`Jest`](https://jestjs.io/) pour écrire des tests unitaires, d'intégration et de système pour un (petit) site web. 

Le site web `Poly Dessin` est une application simple qui permet de dessiner sur un [canevas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) à l'aide de la souris : l'utilisateur doit garder le bouton gauche enfoncé et déplacer la souris sur la surface de dessin. L'utilisateur peut changer la couleur et l'épaisseur du trait à travers les 2 champs de saisie à gauche de la page.

## Composantes du projet

Ce projet contient 4 composantes principales : la fonction `loadCanvas()` ([canvas-loader.js](./src/canvas-loader.js)), les classes `Tool` ([tool.js](./src/tool.js)), `Pencil` ([pencil.js](./src/pencil.js)) et `PolyPaint`([poly-paints.js](./src/poly-paint.js)).

Chaque fichier vient avec son fichier de tests correspondant dans le répertoire [`tests`](./tests/). Les fichiers de tests contiennent des tests unitaires pour le code sauf [`poly-paint.test.js`](./tests/poly-paint.test.js) qui contient un exemple de test d'intégration ainsi qu'un test de système qui émule l'utilisation du système par un utilisateur dans les lignes `118` à `161`.

## Installation de la librairie

Ce projet a besoin des librairies `jest`, `jest-environment-jsdom` et `canvas` fournis dans la configuration du fichier [package.json](./package.json). Les 2 librairies supplémentaires permettent d'émuler le DOM durant les tests puisque `Jest` est executé dans NodeJS et non dans un navigateur. Une dépendance optionnelle, `win-node-env` est présente pour l'exécution des commandes sur Windows. Pour installer les librairies, vous pouvez utiliser la commande `npm ci` dans ce répertoire pour avoir la version exacte des dépendances.

## Exécution des tests et calcul de la couverture du code

Les tests peuvent être exécutés à l'aide de la commande `npm run test` dans ce répertoire. Le résultat de l'exécution sera visible directement dans le terminal.

La commande `npm run coverage` permet d'exécuter les tests et calculer le taux de couverture des tests (100% pour le code fourni). Le résultat de l'exécution sera visible directement dans le terminal. Un rapport en format HTML sera également généré dans le répertoire `coverage/lcov-report`. Notez que ce répertoire n'est pas présent par défaut et sera généré dès la 1re exécution de la commande.

## Tests visuels avec Cypress

Jest est un outil très pratique puisqu'il permet de tester le code sans avoir besoin d'un navigateur. Cependant, il ne permet pas de tester l'interface graphique du site web. Pour cela, nous utilisons la librairie [Cypress](https://www.cypress.io/) qui permet d'écrire des tests visuels pour les applications web.

La commande `npm run cypress` permet d'ouvrir l'interface graphique de Cypress. Vous pouvez ensuite exécuter les tests visuels en cliquant sur le fichier de test désiré dans l'interface. Le résultat de l'exécution sera visible directement dans l'interface graphique.

Les tests de `Poly Dessin` sont divisés en 2 fichiers : [polydessin-interface.cy.js](./cypress/e2e/polydessin-interface.cy.js) qui teste l'interface graphique du site web et [polydessin-drawing.cy.js](./cypress/e2e/polydessin-drawing.cy.js) qui teste la fonctionnalité de dessin du site web.

Dans le cas du dessin, on simule les actions de l'utilisateur sur le canevas et on vérifie que les pixels du canevas sont modifiés en conséquence. Notez qu'il faut expliciter les valeurs de `offsetX` et `offsetY` pour simuler les mouvements de la souris sur le canevas. Ces valeurs sont relatives au coin supérieur gauche du canevas.

### Exercice

Le fichier [polydessin-tdd.cy.js](./cypress/e2e/polydessin-tdd.cy.js) contient un exemple de test TDD (Test Driven Development) pour la fonctionnalité de nettoyage du canevas. Le test est déjà écrit et il vous reste à implémenter la fonctionnalité dans le code source pour que le test passe.

## Déploiement du projet

Le code JS utilise ESM pour la gestion des différents modules. Vous pouvez déployer le site avec un serveur statique local sur le port `3000` à travers la commande `npm start`. Le projet utilise la librairie `http-server` pour le serveur statique. 

Vous pouvez également accéder au projet déployé en ligne sur la [page GitHub de l'entrepôt](https://log2440.github.io/Cours-6-Validation/).