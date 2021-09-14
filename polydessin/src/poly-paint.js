const MIN_WIDTH = 1;
const MAX_WIDTH = 10;

export default class PolyPaint {
  constructor(canvas, tools) {
    this.canvas = canvas;
    this.tools = tools;
    this.currentTool = tools[0];
  }

  attachListeners() {
    this.canvas.addEventListener("mousedown", (event) => {
      this.currentTool.onMouseDown(event);
    });

    this.canvas.addEventListener("mouseup", (event) => {
      this.currentTool.onMouseUp(event);
    });

    this.canvas.addEventListener("mousemove", (event) => {
      this.currentTool.onMouseMove(event);
    });

    document.getElementById("input-width").addEventListener("change", (event) => {
      const newWidth = parseInt(event.target.value);
      if (this.inputValidator(newWidth, MIN_WIDTH, MAX_WIDTH)) {
        this.currentTool.changeWidth(newWidth);
      }
    });

    document.getElementById("input-color").addEventListener("change", (event) => {
      const newColor = event.target.value;
      if (this.colorValidator(newColor)) {
        this.currentTool.changeColor(newColor);
      }
    });
  }

  inputValidator(input, min, max) {
    return input >= min && input <= max;
  }

  colorValidator(newColor) {
    const colorRegex = /(#([\da-f]{3}){1,2})/;
    return colorRegex.exec(newColor);
  }
}
