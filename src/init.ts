import Overworld from "./Overworld/Overworld";

(function () {
  const overworld = new Overworld({
    element: document.querySelector(".game-con"),
  });
  overworld.init();
})();
