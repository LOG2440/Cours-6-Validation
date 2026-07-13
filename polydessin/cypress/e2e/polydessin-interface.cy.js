import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./utils";

describe("PolyDessin : Interface", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display the drawing board and the tool options", () => {
    cy.title().should("equal", "PolyDessin");
    cy.get("#base-canvas").should("be.visible");
    cy.get("#input-color").should("exist");
    cy.get("#input-width").should("have.value", "1");
  });

  it("should limit the width input to a maximum of 10", () => {
    cy.get("#input-width").clear().type("9").trigger("change");
    // Simuler l'augmentation de la largeur plus que le maximum
    cy.get("#input-width").type('{upArrow}');
    cy.get("#input-width").type('{upArrow}');

    cy.get("#input-width").should("have.value", "10");
  });

  it("should change the color of the drawing tool when a new color is selected", () => {
    cy.get("#input-color").invoke("val", "#00ff00").trigger("change");
    cy.get("#input-color").should("have.value", "#00ff00");
  });

});