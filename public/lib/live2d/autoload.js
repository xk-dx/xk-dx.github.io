// Cubism 4 Live2D Loader with pixi-live2d-display
// Provides loadlive2d(canvasId, modelPath) for waifu-tips.js compatibility

const live2d_path = "/lib/live2d/";

function loadExternalResource(url, type) {
  return new Promise((resolve, reject) => {
    let tag;
    if (type === "css") {
      tag = document.createElement("link");
      tag.rel = "stylesheet";
      tag.href = url;
    } else if (type === "js") {
      tag = document.createElement("script");
      tag.src = url;
    }
    if (tag) {
      tag.onload = () => resolve(url);
      tag.onerror = () => reject(url);
      document.head.appendChild(tag);
    }
  });
}

// Provide loadlive2d for waifu-tips.js
window.loadlive2d = function (canvasId, modelPath) {
  var canvas = document.getElementById(canvasId);
  if (!canvas) return;

  // If modelPath points to index.json (CDN mode), resolve the real .model3.json
  var loadPath = modelPath;
  if (modelPath.endsWith("index.json")) {
    var base = modelPath.substring(0, modelPath.lastIndexOf("/") + 1);
    fetch(modelPath)
      .then(function (r) { return r.json(); })
      .then(function (idx) {
        loadModelFrom(canvas, base + idx.model);
      })
      .catch(function () {
        // Fallback: try loading index.json from the same dir as Live2DModel.from
        loadModelFrom(canvas, modelPath);
      });
  } else {
    loadModelFrom(canvas, modelPath);
  }
};

function loadModelFrom(canvas, modelJsonPath) {
  var app = new PIXI.Application({
    view: canvas,
    width: canvas.clientWidth || 800,
    height: canvas.clientHeight || 800,
    transparent: true,
    backgroundAlpha: 0,
    autoStart: true,
  });

  PIXI.live2d.Live2DModel.from(modelJsonPath).then(function (model) {
    app.stage.addChild(model);
    model.anchor.set(0.5, 0.5);
    model.position.set(app.screen.width / 2, app.screen.height);
    model.scale.set(Math.min(
      app.screen.width / (model.width || 600),
      app.screen.height / (model.height || 800)
    ) * 0.8);

    window.addEventListener("resize", function () {
      model.position.set(app.screen.width / 2, app.screen.height);
    });

    try {
      model.internalModel.motionManager.startRandomMotion("Idle", 3);
    } catch (e) {}
  }).catch(function (err) {
    console.error("Live2D load error at " + modelJsonPath + ":", err);
  });
}

if (screen.width >= 768) {
  loadExternalResource(live2d_path + "waifu.css", "css");
  loadExternalResource(live2d_path + "cubismcore.min.js", "js")
    .then(function () { return loadExternalResource(live2d_path + "pixi.min.js", "js"); })
    .then(function () { return loadExternalResource(live2d_path + "cubism4.min.js", "js"); })
    .then(function () { return loadExternalResource(live2d_path + "pixi-live2d.min.js", "js"); })
    .then(function () {
      initWidget({
        waifuPath: live2d_path + "waifu-tips.json",
        cdnPath: live2d_path + "models/",
        tools: ["hitokoto", "asteroids", "switch-model", "switch-texture", "photo", "info", "quit"],
      });
    });
  }
}
