import Pencil from "../src/pencil.js";
import { jest } from "@jest/globals";
describe("Pencil tests", () => {
  let pencil;
  const baseWidth = 1;
  let mousePosition;
  let mouseStub;

  beforeEach(() => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    pencil = new Pencil("pencil", baseWidth, context);
    mousePosition = { x: 10, y: 10 };
    mouseStub = {
      offsetX: mousePosition.x,
      offsetY: mousePosition.y,
    };
  });

  afterEach(() => {
    // Remettre tous les mocks à leur implémentation initiale
    jest.restoreAllMocks();
  });

  it("should create a new Pencil object", () => {
    expect(pencil).toBeTruthy();
    expect(pencil.lastPoint).toEqual({ x: 0, y: 0 });
  });

  describe("Mouse events", () => {
    it("onMouseDown() should set isDrawing to true", () => {
      pencil.onMouseDown(mouseStub);
      expect(pencil.isDrawing).toBeTruthy();
    });

    it("onMouseDown() should set last point to new coordonate", () => {
      pencil.onMouseDown(mouseStub);
      expect(pencil.lastPoint).toEqual(mousePosition);
    });

    it("onMouseMove() should call updateCurrentPoint if isDrawing is true", () => {
      pencil.isDrawing = true;
      // Dont actually call the real function
      const updateCurrentPointSpy = jest.spyOn(pencil, "updateCurrentPoint").mockImplementation(() => {});

      pencil.onMouseMove(mousePosition);
      expect(updateCurrentPointSpy).toBeCalled();
      expect(updateCurrentPointSpy).toBeCalledWith({ x: mousePosition.x, y: mousePosition.y });
    });

    it("onMouseMove() should not call updateCurrentPoint if isDrawing is false", () => {
      pencil.isDrawing = false;
      const updateCurrentPointSpy = jest.spyOn(pencil, "updateCurrentPoint").mockImplementation(() => {});

      pencil.onMouseMove(mousePosition);
      expect(updateCurrentPointSpy).not.toBeCalled();
    });

    it("onMouseUp() should call updateCurrentPoint if isDrawing is true", () => {
      pencil.isDrawing = true;
      // Dont actually call the real function
      const updateCurrentPointSpy = jest.spyOn(pencil, "updateCurrentPoint").mockImplementation(() => {});

      pencil.onMouseUp(mousePosition);
      expect(updateCurrentPointSpy).toBeCalled();
      expect(updateCurrentPointSpy).toBeCalledWith({ x: mousePosition.x, y: mousePosition.y });
    });

    it("onMouseUp() should set isDrawing to false", () => {
      pencil.isDrawing = true;
      pencil.updateCurrentPoint = jest.fn(() => {}); // dont call the real method
      pencil.onMouseUp(mousePosition);
      expect(pencil.isDrawing).toBeFalsy();
    });

    it("onMouseUp() should not call updateCurrentPoint if isDrawing is false", () => {
      pencil.isDrawing = false;
      const updateCurrentPointSpy = jest.spyOn(pencil, "updateCurrentPoint").mockImplementation(() => {});

      pencil.onMouseUp(mousePosition);
      expect(updateCurrentPointSpy).not.toBeCalled();
    });
  });

  describe("Drawing functions", () => {
    it("updateCurrentPoint() should set lastPoint to new coordinate", () => {
      const newMouseStub = { offsetX: 100, offsetY: 100 };
      // Enlever la dépendance à getPositionFromMouse
      jest.spyOn(pencil, "getPositionFromMouse").mockImplementation(() => {
        return { x: newMouseStub.offsetX, y: newMouseStub.offsetY };
      });
      // Ne pas appeler la vraie méthode draw()
      const drawSpy = jest.spyOn(pencil, "draw").mockImplementation(() => {});

      const newMousePosition = { x: 100, y: 100 };

      pencil.updateCurrentPoint(newMouseStub);
      expect(pencil.lastPoint).toEqual(newMousePosition);
    });

    it("updateCurrentPoint() should call getPositionFromMouse and draw", () => {
      const getPositionSpy = jest.spyOn(pencil, "getPositionFromMouse").mockImplementation(() => {});
      const drawSpy = jest.spyOn(pencil, "draw").mockImplementation(() => {});

      pencil.updateCurrentPoint(mousePosition);
      expect(getPositionSpy).toBeCalled();
      expect(drawSpy).toBeCalled();
    });

    it("draw() should call the correct context functions", () => {
      const beginPathSpy = jest.spyOn(pencil.context, "beginPath").mockImplementation(() => {});
      const moveToSpy = jest.spyOn(pencil.context, "moveTo").mockImplementation(() => {});
      const lineToSpy = jest.spyOn(pencil.context, "lineTo").mockImplementation(() => {});
      const strokeSpy = jest.spyOn(pencil.context, "stroke").mockImplementation(() => {});
      const start = { x: 0, y: 0 };
      const end = { x: 5, y: 5 };

      pencil.draw(pencil.context, start, end);

      expect(beginPathSpy).toBeCalled();

      expect(moveToSpy).toBeCalled();
      expect(moveToSpy).toBeCalledWith(start.x, start.y);

      expect(lineToSpy).toBeCalled();
      expect(lineToSpy).toBeCalledWith(end.x, end.y);

      expect(strokeSpy).toBeCalled();
    });

  });
});
