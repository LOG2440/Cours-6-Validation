import Tool from "../src/tool.js";

describe("Tool tests", () => {
  let tool;
  const baseWidth = 1;
  const baseColor = "black";

  beforeEach(() => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    tool = new Tool("baseTool", baseWidth, context);
  });
  it("should create a Tool object", () => {
    expect(tool).toBeTruthy();
  });

  it("getPositionFromMouse() should generate a position from a MouseEvent", () => {
    const mousePosition = { x: 10, y: 10 };
    const mouseStub = {
      offsetX: mousePosition.x,
      offsetY: mousePosition.y,
    };
    const position = tool.getPositionFromMouse(mouseStub);
    expect(position).toEqual(mousePosition);
  });

  it("changeWidth() should change the width of the tool", () => {
    expect(tool.width).toEqual(baseWidth);

    const newWidth = 10;
    tool.changeWidth(newWidth);
    expect(tool.width).toEqual(newWidth);
    expect(tool.context.lineWidth).toEqual(newWidth);
  });

  it("changeWidth() should not change the width of the tool if new width is bellow 0", () => {
    const newWidth = -5;
    tool.changeWidth(newWidth);
    expect(tool.width).not.toEqual(newWidth);
    expect(tool.width).toEqual(baseWidth);
  });

  it("changeWidth() should not change the width of the tool if new width is 0", () => {
    const newWidth = 0;
    tool.changeWidth(newWidth);
    expect(tool.width).not.toEqual(newWidth);
    expect(tool.width).toEqual(baseWidth);
  });

  it("changeColor() should change the color of the tool and the context", () => {
    expect(tool.color).toEqual(baseColor);

    const newColor = "#ff0000";
    tool.changeColor(newColor);
    expect(tool.color).toEqual(newColor);
    expect(tool.context.strokeStyle).toEqual(newColor);
  });
});
