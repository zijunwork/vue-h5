(function(doc, win) {
  // Rem适配 > 750px
  let docEl = doc.documentElement,
    resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
    reCalc = function() {
      if (docEl.clientWidth > 750) {
        docEl.style.fontSize = "75px";
        doc.querySelector("#app").style.width = "750px";
      }
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, reCalc, false);
  doc.addEventListener("DOMContentLoaded", reCalc, false);
})(document, window);

// 禁止双指/双击放大
document.addEventListener("gesturestart", function(e) {
  e.preventDefault();
});
document.addEventListener("touchstart", function(event) {
  if (event.touches.length > 1) {
    event.preventDefault();
  }
});
