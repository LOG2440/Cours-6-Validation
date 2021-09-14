export default class Tool {
  constructor(name, width, context) {
    this.name = name;
    this.width = width;
    this.context = context;
    this.color = "black";
    this.context.lineWidth = this.width;
    this.context.strokeStyle = this.color;
    this.isDrawing = false;
  }

  getPositionFromMouse(event) {
    return { x: event.offsetX, y: event.offsetY };
  }
  changeWidth(newWidth) {
    if (newWidth > 0) {
      this.width = newWidth;
      this.context.lineWidth = this.width;
    }
  }

  changeColor(newColor) {
    this.color = newColor;
    this.context.strokeStyle = this.color;
  }

  onMouseDown(event) {}
  onMouseMove(event) {}
  onMouseUp(event) {}
  draw() {}
}
