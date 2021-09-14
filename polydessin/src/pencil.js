import Tool from "./tool.js";

export default class Pencil extends Tool {
  constructor(name, width, context) {
    super(name, width, context);
    this.lastPoint = { x: 0, y: 0 };
  }

  onMouseDown(event) {
    this.isDrawing = true;
    const coord = this.getPositionFromMouse(event);
    this.lastPoint = coord;
  }

  onMouseMove(event) {
    if (this.isDrawing) {
      this.updateCurrentPoint(event);
    }
  }

  onMouseUp(event) {
    if (this.isDrawing) {
        this.updateCurrentPoint(event);
    }
    this.isDrawing = false;
  }

  updateCurrentPoint(event) {
    const coord = this.getPositionFromMouse(event);
    this.draw(this.context, this.lastPoint, coord);
    this.lastPoint = coord;
  }

  draw(context, start, end) {
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.stroke();
  }

  
}
