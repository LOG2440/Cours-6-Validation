export default function loadCanvas() {
  const baseCanvas = document.getElementById("base-canvas");
  const context = baseCanvas ? baseCanvas.getContext("2d") : null;
  return {
    canvas: baseCanvas,
    context: context,
  };
}
