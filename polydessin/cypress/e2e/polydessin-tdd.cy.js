import { drawLine, isCanvasEmpty} from "./utils";

describe("PolyDessin : TDD", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    /**
     * Exercice : implémenter la fonctionnalité de nettoyage du canvas 
     */
    it("should clear canvas when the clear button is clicked", () => {
        // Dessine une ligne pour remplir le canvas
        drawLine({ x: 100, y: 100 }, { x: 500, y: 100 });

        // Vérifie qu'il y a des pixels dessinés
        cy.get("#base-canvas").then(($canvas) => {
            expect(isCanvasEmpty($canvas[0]), "canvas should not be empty before clearing").to.be.false;
        });

        // Clique sur le bouton de nettoyage
        cy.get("#clear-button").click();

        // Vérifie que le canvas est maintenant vide
        cy.get("#base-canvas").then(($canvas) => {
            expect(isCanvasEmpty($canvas[0]), "canvas should be empty after clearing").to.be.true;
        });
    });

});