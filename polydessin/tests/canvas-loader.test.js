import loadCanvas from "../src/canvas-loader.js";

describe("Canvas-loader tests", () => {
  let canvas;
  let context;

  const clearHTML = () => (document.body.innerHTML = "");

  beforeEach(() => {
    // Creation du cavans sur le document (on utilise un mock fourni par Jest)
    canvas = document.createElement("canvas");
    canvas.setAttribute("id", "base-canvas");
    document.body.appendChild(canvas);
    context = canvas.getContext("2d");
  });

  afterEach(() => {
    // Remettre le document à vide après chaque test
    clearHTML();
  });

  it("loadCanvas should load the correct canvas and its context", () => {
    const loadData = loadCanvas();
    expect(loadData.canvas).toEqual(canvas);
    expect(loadData.context).toEqual(context);
  });

  it("loadCanvas should return null if the canvas has a wrong id", () => {
    clearHTML();

    const wrongCanvas = document.createElement("canvas");
    wrongCanvas.setAttribute("id", "wrong-canvas");
    document.body.appendChild(wrongCanvas);
    const loadData = loadCanvas();
    expect(loadData.canvas).toBeNull();
    expect(loadData.context).toBeNull();
  });
});
