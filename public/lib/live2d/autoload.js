// Minimal Live2D Cubism 4 Loader — draggable, resizable

(async function () {
  if (screen.width < 768) return;

  function loadScript(url) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = url;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  try {
    await loadScript("/lib/live2d/cubismcore.min.js");
    await loadScript("/lib/live2d/pixi.min.js");
    await loadScript("/lib/live2d/cubism4.min.js");
    await loadScript("/lib/live2d/pixi-live2d.min.js");
  } catch (e) {
    console.error("Failed to load Live2D dependencies:", e);
    return;
  }

  var W = 300, H = 420;

  var container = document.createElement("div");
  container.id = "live2d-container";
  container.style.cssText =
    "position:fixed;bottom:0;right:10px;width:"+W+"px;height:"+H+"px;z-index:9999;cursor:grab;user-select:none;";

  var canvas = document.createElement("canvas");
  canvas.id = "live2d-canvas";
  canvas.width = W;
  canvas.height = H;
  canvas.style.cssText = "width:100%;height:100%;display:block;pointer-events:none;";
  container.appendChild(canvas);
  document.body.appendChild(container);

  var app = new PIXI.Application({
    view: canvas,
    width: W,
    height: H,
    backgroundAlpha: 0,
    transparent: true,
    antialias: true,
    autoStart: true,
  });

  try {
    var model = await PIXI.live2d.Live2DModel.from(
      "/lib/live2d/models/231110/yili.model3.json"
    );
    app.stage.addChild(model);
    model.anchor.set(0.5, 0.95);
    model.position.set(W / 2, H - 10);
    model.scale.set(0.18);
  } catch (e) {
    console.error("Failed to load Live2D model:", e);
    container.style.display = "none";
    return;
  }

  // Head/eye tracking — model faces toward cursor from its own position
  var dx = 0, dy = 0;
  var curAngleX = 0, curAngleY = 0, curEyeX = 0, curEyeY = 0;

  function doTrack() {
    var tgtAngleX = dx * 30;
    var tgtAngleY = dy * -10;
    var tgtEyeX   = dx * 20;
    var tgtEyeY   = dy * 8;

    curAngleX += (tgtAngleX - curAngleX) * 0.08;
    curAngleY += (tgtAngleY - curAngleY) * 0.08;
    curEyeX   += (tgtEyeX   - curEyeX)   * 0.08;
    curEyeY   += (tgtEyeY   - curEyeY)   * 0.08;

    try {
      model.internalModel.coreModel.addParameterValueById("ParamAngleX", curAngleX - model.internalModel.coreModel.getParameterValueById("ParamAngleX"));
      model.internalModel.coreModel.addParameterValueById("ParamAngleY", curAngleY - model.internalModel.coreModel.getParameterValueById("ParamAngleY"));
      model.internalModel.coreModel.addParameterValueById("ParamEyeBallX", curEyeX - model.internalModel.coreModel.getParameterValueById("ParamEyeBallX"));
      model.internalModel.coreModel.addParameterValueById("ParamEyeBallY", curEyeY - model.internalModel.coreModel.getParameterValueById("ParamEyeBallY"));
    } catch (e) { console.warn("track", e); }
  }

  app.ticker.add(doTrack);

  document.addEventListener("mousemove", function (e) {
    var rect = container.getBoundingClientRect();
    var cx = rect.left + rect.width / 2;
    var cy = rect.top + rect.height / 2;
    dx = (e.clientX - cx) / window.innerWidth * 2;
    dy = (e.clientY - cy) / window.innerHeight * 2;
  });

  // Drag support
  var dragStartX, dragStartY, dragOrigX, dragOrigY;
  container.addEventListener("mousedown", function (e) {
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    var rect = container.getBoundingClientRect();
    dragOrigX = rect.left;
    dragOrigY = rect.top;
    container.style.bottom = "auto";
    container.style.right = "auto";
    container.style.left = rect.left + "px";
    container.style.top = rect.top + "px";

    var onMove = function (ev) {
      container.style.left = (dragOrigX + ev.clientX - dragStartX) + "px";
      container.style.top = (dragOrigY + ev.clientY - dragStartY) + "px";
    };
    var onUp = function () {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  });
})();
