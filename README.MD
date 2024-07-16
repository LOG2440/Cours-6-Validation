# Tests automatisés avec Jest

Cet entrepôt contient des exemples de l'utilisation de la librairie [`Jest`](https://jestjs.io/) pour écrire des tests automatisés pour des projets web.

Les exemples se concentrent sur la notion de tests unitaires, mais le projet `Poly Dessin` contient également des exemples de tests d'intégration ainsi que des tests du système.

Les exemples sont les suivants:
- [`Anagrammes`](./anagram/README.MD) : exemple d'introduction à Jest et aux tests automatisés
- [`Poly Dessin`](./polydessin/README.MD) : exemple de tests pour un petit site complet

## Syntaxe de Jest

Jest et plusieurs autres librairies de tests en JS utilisent une syntaxe similaire qui se base sur les notions de suites de tests et l'utilisation d'un échafaudage.

Une suite de tests est définie par la fonction `describe` et contient un ensemble de tests ayant un lien logique entre-eux. Chaque suite de tests prend en paramètre le nom de la suite qui sera affiché dans le rapport final.

Chaque test dans la suite est exécuté avec la fonction `test` ou `it` et prend en paramètre le titre du test et une fonction qui contient la logique du test. Cette fonction doit avoir au moins un validateur (fonction `expect`) avec un comparateur qui valide un certain comportement ou résultat dans le test.

L'échaufaudage des tests est une technique qui permet de configurer un envrionnement avant les tests et le nettoyer après les tests. Jest utilise les fonctions `before` et `after` qui contiennent du code qui est exécuté au début et à la fin d'une suite de tests. Il est également possible d'utiliser `beforeEach` et `afterEach` qui sont exécutées avant et après chaque test. Ceci permet de bien isoler les tests un de l'autre et éviter qu'un test impact le fonctionnement d'un autre.

### Exemple de syntaxe :

Cet exemple est tiré de [canvas-loader.test.js](./polydessin/tests/canvas-loader.test.js) du projet `Poly Dessin` et qui illustre toutes les étapes d'une suite de tests.

```js
describe("Canvas-loader tests", () => {
  let canvas;
  let context;

  const clearHTML = () => (document.body.innerHTML = "");

  beforeEach(() => {
    canvas = document.createElement("canvas");
    canvas.setAttribute("id", "base-canvas");
    document.body.appendChild(canvas);
    context = canvas.getContext("2d");
  });

  afterEach(() => {
    clearHTML();
  });

  it("loadCanvas should load the correct canvas and its context", () => {
    const loadData = loadCanvas();
    expect(loadData.canvas).toEqual(canvas);
    expect(loadData.context).toEqual(context);
  });
});
```

## Stub, Mock et Spy

Lors de l'écriture des tests unitaires, on doit s'assurer de ne pas avoir des dépendances qui peuvent influencer le comportement de l'unité testée. Ces dépendances devront être remplacés par des _Stub_ ou des _Mock_ : code dont le comportement est prédéterminé.
### Exemple de Stub:

Cet exemple est tiré de [poly-paint.test.js](./polydessin/tests/poly-pain.test.js) du projet `Poly Dessin` :

```js
 beforeEach(() => {
    toolStub = {
      name: "toolStub",
      onMouseDown: () => { },
      onMouseMove: () => { },
      onMouseUp: () => { },
      changeWidth: () => { },
      changeColor: () => { },
    };
    const canvas = document.createElement("canvas");
    polyPaint = new PolyPaint(canvas, [toolStub]);
  });
```

Dans le cas d'un test d'un code qui utilise une autre fonction, il est parfois intéressant de si la fonction a été appelée ou non en fonction d'une certaine configuration initiale. La notion de _Spy_ permet cette fonctionnalité. Un _Spy_ est un objet qui englobe la fonction appelée et permet d'avoir des informations sur l'état de la fonction, le nombre de paramètres, la valeur retournée, etc. Cette notion est souvent couplé à un _Mock_ lorsqu'on veut savoir si la fonction a été appelée ou non sans vraiment l'exécuter. Dans un tel cas, le _Spy_ "capture" l'appel et le redigire vers un _Mock_ qui effectue un comportement différent, souvent rien.

### Exemple de Spy et Mock :
Cet exemple est tiré de [poly-paint.test.js](./polydessin/tests/poly-pain.test.js) du projet `Poly Dessin`. Ici, la fonction `changeWidth` est appelée seulement si la valeur du champs de saisie est entre `0` et `12`. Une valeur de `12` comme dans le deuxième test fera en sorte que la fonction ne sera pas appelée et ceci peut être detecté par `changeEventSpy`. Dans les 2 cas, l'appel de méthode est redirigé vers un _Mock_ vide à l'aide de la fonction `mockImplementation` de l'objet espion.

```js
it("should call changeWidth method of the Tool on a valid width change", () => {
      const changeEventSpy = jest.spyOn(polyPaint.currentTool, "changeWidth").mockImplementation(() => { });
      const input = document.getElementById("input-width");
      input.value = 10;
      input.dispatchEvent(new Event("change"));
      expect(changeEventSpy).toBeCalled();
    });

    it("should not call changeWidth method of the Tool on an invalid width change", () => {
      const changeEventSpy = jest.spyOn(polyPaint.currentTool, "changeWidth").mockImplementation(() => { });
      const input = document.getElementById("input-width");
      input.value = 12;
      input.dispatchEvent(new Event("change"));
      expect(changeEventSpy).not.toBeCalled();
    });
```

## Tests en boîte blanche et boîte noire

La majorité des tests peuvent être classés en 2 types : `boîte blanche` et `boîte noire`. Ces deux types de tests ont des objectifs différents et peuvent être utilisés en fonction de la complexité du code et des besoins de tests.

### Boîte noire

Un test en boîte noire se concentre seulement sur la relation entre les entrées et les sorties d'une partie du système. Les entrées/sorties peuvent être aussi des comportements et pas seulement les paramètres/sorties d'une fonction. Le test en boîte noire ne s'intéresse pas au fonctionnement interne du code et, idéalement, devrait l'ignorer.

Le [premier exemple](#exemple-de-syntaxe-) dans ce fichier est un exemple de test de boîte noire où on vérifie si la sortie de la fonction `loadCanvas()` correspond à nos attentes en fonction de l'état initial du HTML de la page.

### Boîte blanche

Un test en boîte blanche se concentre sur le fonctionnement interne du code et doit connaître les détails d'implémentation du code. Les tests unitaires sont souvent des tests en boîte blanche et plus les tests sont haut niveau, plus les tests en boîte blanche sont rares dû à la compléxité relative du code.

Les [exemples de _spy_ et _mock_](#exemple-de-spy-et-mock-) sont des exemples de tests de boîte blanche où on vérifie qu'une fonction spécifique a été appelée ou non en fonction de la configuration du test.