import loadCanvas from "./canvas-loader.js";
import Pencil from "./pencil.js";
import PolyPaint from "./poly-paint.js";

const drawingCanvas = loadCanvas();
const pencil = new Pencil("pencil", 2, drawingCanvas.context);

const polyPaint = new PolyPaint(drawingCanvas.canvas, [pencil]);
polyPaint.attachListeners();
