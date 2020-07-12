/*
 * @Overview:   Image-methods
 * @Author:     Zi_Jun
 * @Email:      zijun2030@163.com
 * @Date:       2020/7/11 15:44
 * @Mark:       注意使用前提条件：安装 html2canvas、canvas2image 插件
 */

/**
 * 将html转化为图片
 * @param element {Object} 需要转化的dom
 * @param scale {Number} 放大倍数，默认2倍，原因为保持转化后图片的清晰度
 * @param isSaveImg {Boolean} 是否保存图片
 * @param callback {Function} 转化后的成功回调，参数为图片的DOM,用于图片操作
 */
/*

export const generateCanvasImage = (
  element,
  scale = 2,
  isSaveImg = false,
  callback
) => {
  let width = element.offsetwidth;
  let height = element.offsetheight;
  let canvas = document.createElement("canvas");
  const SCALE = scale;
  canvas.width = width * SCALE;
  canvas.height = height * SCALE;
  canvas.getContext("2d").scale(scale, scale);
  const opts = {
    scale,
    canvas,
    width,
    height,
    useCORS: true
  };
  html2canvas(element, opts).then(canvasObj => {
    let context = canvasObj.getContext("2d");
    context.webkitImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;
    isSaveImg &&
      Canvas2Image.saveAsPNG(canvasObj, canvasObj.width, canvasObj.height);
    const IMGDOM = Canvas2Image.convertToPNG(
      canvasObj,
      canvasObj.width,
      canvasObj.height
    );
    callback && callback(IMGDOM);
    return IMGDOM;
  });
};
*/
