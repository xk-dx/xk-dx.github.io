// Minimal Live2D Cubism 4 Loader
// Directly loads yili model using pixi-live2d-display

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

  // Create container
  var container = document.createElement("div");
  container.id = "live2d-container";
  container.style.cssText =
    "position:fixed;bottom:0;right:0;width:280px;height:400px;z-index:9999;pointer-events:none;";

  var canvas = document.createElement("canvas");
  canvas.id = "live2d-canvas";
  canvas.width = 280;
  canvas.height = 400;
  canvas.style.cssText = "width:100%;height:100%;";
  container.appendChild(canvas);
  document.body.appendChild(container);

  // Load model
  var app = new PIXI.Application({
    view: canvas,
    width: 280,
    height: 400,
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
    model.anchor.set(0.5, 0.5);
    model.position.set(app.screen.width / 2, app.screen.height + 20);
    model.scale.set(0.35);

    // Pointer events for interactivity
    container.style.pointerEvents = "auto";
    container.addEventListener("mousemove", function (e) {
      var rect = container.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width;
      model.rotation = (x - 0.5) * 0.2;
    });
    container.addEventListener("mouseleave", function () {
      model.rotation = 0;
    });
    container.addEventListener("click", function () {
      model.rotation = 0;
    });

    // Start random idle motions
    try {
      model.internalModel.motionManager.startRandomMotion("Idle", 3);
    } catch (e) {
      // Idle motion not available
    }

    console.log("Live2D model loaded!");
  } catch (e) {
    console.error("Failed to load Live2D model:", e);
    container.style.display = "none";
  }
})();
