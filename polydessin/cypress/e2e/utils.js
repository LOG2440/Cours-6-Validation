// Retourne les données [R, G, B, A] du pixel aux coordonnées (x, y) du canvas
const getPixel = (canvas, x, y) => {
    const context = canvas.getContext("2d");
    return context.getImageData(x, y, 1, 1).data;
};

// Simule le tracé d'une ligne de start à end en plusieurs petits mouvements de souris 
const drawLine = (start, end, steps = 5) => {
    cy.get("#base-canvas").trigger("mousedown", { offsetX: start.x, offsetY: start.y });
    for (let i = 1; i <= steps; i++) {
        cy.get("#base-canvas").trigger("mousemove", {
            offsetX: Math.round(start.x + ((end.x - start.x) * i) / steps),
            offsetY: Math.round(start.y + ((end.y - start.y) * i) / steps),
        });
    }
    cy.get("#base-canvas").trigger("mouseup", { offsetX: end.x, offsetY: end.y });
};

const isCanvasEmpty = (canvas) => {
    const context = canvas.getContext("2d");
    const pixels = context.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT).data;
    return !pixels.some((value) => value !== 0);
};

const CANVAS_WIDTH = 1400;
const CANVAS_HEIGHT = 800;

export { getPixel, drawLine, isCanvasEmpty, CANVAS_WIDTH, CANVAS_HEIGHT };