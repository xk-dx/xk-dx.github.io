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

    container.addEventListener("mousemove", function (e) {
      var rect = container.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width;
      model.rotation = (x - 0.5) * 0.2;
    });
    container.addEventListener("mouseleave", function () {
      model.rotation = 0;
    });

    try { model.internalModel.motionManager.startRandomMotion("Idle", 3); } catch (e) {}
  } catch (e) {
    console.error("Failed to load Live2D model:", e);
    container.style.display = "none";
    return;
  }

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
