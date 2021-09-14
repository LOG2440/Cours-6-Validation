import PolyPaint from "../src/poly-paint";
import { jest } from "@jest/globals";

describe("PolyPaint tests", () => {
  let toolStub;
  let polyPaint;

  beforeEach(() => {
    toolStub = {
      name: "toolStub",
      onMouseDown: () => {},
      onMouseMove: () => {},
      onMouseUp: () => {},
      changeWidth: () => {},
      changeColor: () => {},
    };
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", "base-canvas");
    const widthInput = document.createElement("input");
    widthInput.setAttribute("id", "input-width");
    const colorInput = document.createElement("input");
    colorInput.setAttribute("id", "input-color");
    document.body.appendChild(canvas);
    document.body.appendChild(widthInput);
    document.body.appendChild(colorInput);

    polyPaint = new PolyPaint(canvas, [toolStub]);
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should create a new PolyPaint object", () => {
    expect(polyPaint).toBeTruthy();
    expect(polyPaint.currentTool).toEqual(toolStub);
  });

  describe("Mouse Events", () => {
    it("should call onMouseDown method of the Tool on a mouse down event", () => {
      polyPaint.attachListeners();
      const mouseEventSpy = jest.spyOn(polyPaint.currentTool, "onMouseDown").mockImplementation(() => {});
      polyPaint.canvas.dispatchEvent(new MouseEvent("mousedown"));
      expect(mouseEventSpy).toBeCalled();
    });

    it("should call onMouseUp method of the Tool on a mouse up event", () => {
      polyPaint.attachListeners();
      const mouseEventSpy = jest.spyOn(polyPaint.currentTool, "onMouseUp").mockImplementation(() => {});
      polyPaint.canvas.dispatchEvent(new MouseEvent("mouseup"));
      expect(mouseEventSpy).toBeCalled();
    });

    it("should call onMouseMove method of the Tool on a mouse move event", () => {
      polyPaint.attachListeners();
      const mouseEventSpy = jest.spyOn(polyPaint.currentTool, "onMouseMove").mockImplementation(() => {});
      polyPaint.canvas.dispatchEvent(new MouseEvent("mousemove"));
      expect(mouseEventSpy).toBeCalled();
    });
  });

  describe("Change Events", () => {
    it("should call changeWidth method of the Tool on a valid width change", () => {
      polyPaint.attachListeners();
      const changeEventSpy = jest.spyOn(polyPaint.currentTool, "changeWidth").mockImplementation(() => {});
      const input = document.getElementById("input-width");
      input.value = 10;
      input.dispatchEvent(new Event("change"));
      expect(changeEventSpy).toBeCalled();
    });

    it("should not call changeWidth method of the Tool on an invalid width change", () => {
      polyPaint.attachListeners();
      const changeEventSpy = jest.spyOn(polyPaint.currentTool, "changeWidth").mockImplementation(() => {});
      const input = document.getElementById("input-width");
      input.value = 12;
      input.dispatchEvent(new Event("change"));
      expect(changeEventSpy).not.toBeCalled();
    });

    it("should call changeColor method of the Tool on a valid color change", () => {
      polyPaint.attachListeners();
      const changeEventSpy = jest.spyOn(polyPaint.currentTool, "changeColor").mockImplementation(() => {});
      const input = document.getElementById("input-color");
      input.value = "#00ff00";
      input.dispatchEvent(new Event("change"));
      expect(changeEventSpy).toBeCalled();
    });

    it("should not call changeColor method of the Tool on an invalid color change", () => {
      polyPaint.attachListeners();
      const changeEventSpy = jest.spyOn(polyPaint.currentTool, "changeColor").mockImplementation(() => {});
      const input = document.getElementById("input-color");
      input.value = "allo";
      input.dispatchEvent(new Event("change"));
      expect(changeEventSpy).not.toBeCalled();
    });
  });

  describe("Helper Functions", () => {
    it("inputValidator should return true if value is between min and max", () => {
      expect(polyPaint.inputValidator(5, 0, 10)).toBeTruthy();
    });

    it("inputValidator should return false if value is under min", () => {
      expect(polyPaint.inputValidator(-5, 0, 10)).toBeFalsy();
    });

    it("inputValidator should return false if value is over max", () => {
      expect(polyPaint.inputValidator(15, 0, 10)).toBeFalsy();
    });

    it("colorValidator should return true if input is an valid color", () => {
      expect(polyPaint.colorValidator("#0000ff")).toBeTruthy();
    });

    it("colorValidator should return false if input is an invalid color", () => {
      expect(polyPaint.colorValidator("#rrggbb")).toBeFalsy();
    });
  });
});
