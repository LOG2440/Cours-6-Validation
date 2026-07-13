import { getPixel, drawLine, isCanvasEmpty, CANVAS_HEIGHT, CANVAS_WIDTH } from "./utils";

describe("PolyDessin : Drawing", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("should draw on the canvas when the user drags the mouse", () => {
        // Trace une ligne diagonale de (100, 100) à (800, 100)
        drawLine({ x: 100, y: 100 }, { x: 800, y: 100 });

        // Le milieu de la ligne ne devrait plus être transparent
        cy.get("#base-canvas").then(($canvas) => {
            const pixel = getPixel($canvas[0], 400, 100);
            const alpha = pixel[3];
            expect(alpha, "alpha of a pixel in the middle of the line").to.be.greaterThan(0);
        });
    });

    it("should not draw if the mouse button is not pressed", () => {
        cy.get("#base-canvas")
            .trigger("mousemove", { offsetX: 100, offsetY: 100 })
            .trigger("mousemove", { offsetX: 200, offsetY: 200 })
            .trigger("mouseup", { offsetX: 200, offsetY: 200 });

        // Aucun pixel du canvas ne devrait être modifié
        cy.get("#base-canvas").then(($canvas) => {
            const isEmpty = isCanvasEmpty($canvas[0]);
            expect(isEmpty, "canvas should be empty when mouse is moved without pressing").to.be.true;
        });
    });

    it("should draw with the color and width chosen in the tool options", () => {
        cy.get("#input-color").invoke("val", "#ff0000").trigger("change");
        cy.get("#input-width").invoke("val", "5").trigger("change");

        drawLine({ x: 300, y: 300 }, { x: 600, y: 300 });

        cy.get("#base-canvas").then(($canvas) => {
            const [red, green, blue] = getPixel($canvas[0], 450, 300);
            expect([red, green, blue], "color of a pixel on the line").to.deep.equal([255, 0, 0]);
        });
    });
});