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

  // Head/eye tracking — directly set params on the internal model
  var targetX = 0.5, targetY = 0.5;
  var smoothX = 0, smoothY = 0;

  function doTrack() {
    smoothX += (targetX - 0.5 - smoothX) * 0.1;
    smoothY += (targetY - 0.5 - smoothY) * 0.1;

    try {
      var cm = model.internalModel.coreModel;
      cm.addParameterValueById("ParamAngleX", smoothX * 30 - cm.getParameterValueById("ParamAngleX"));
      cm.addParameterValueById("ParamAngleY", smoothY * -15 - cm.getParameterValueById("ParamAngleY"));
      cm.addParameterValueById("ParamEyeBallX", smoothX * 20 - cm.getParameterValueById("ParamEyeBallX"));
      cm.addParameterValueById("ParamEyeBallY", smoothY * 10 - cm.getParameterValueById("ParamEyeBallY"));
    } catch (e) {
      console.warn("Live2D track error:", e);
    }
  }

  app.ticker.add(doTrack);

  document.addEventListener("mousemove", function (e) {
    targetX = e.clientX / window.innerWidth;
    targetY = e.clientY / window.innerHeight;
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
