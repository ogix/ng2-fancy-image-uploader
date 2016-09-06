import {ResizeOptions} from './interfaces';

export function createImage(url: string, cb: (i: HTMLImageElement) => void) {
  var image = new Image();
  image.onload = function () {
    cb(image);
  };
  image.src = url;
}

const resizeAreaId = 'imageupload-resize-area';

function getResizeArea() {
  let resizeArea = document.getElementById(resizeAreaId);
  if (!resizeArea) {
    resizeArea = document.createElement('canvas');
    resizeArea.id = resizeAreaId;
    resizeArea.style.display = 'none';
    document.body.appendChild(resizeArea);
  }

  return <HTMLCanvasElement>resizeArea;
}

export function resizeImage(origImage: HTMLImageElement, {
  resizeHeight,
  resizeWidth,
  resizeQuality = 0.7,
  resizeType = 'image/jpeg'
}: ResizeOptions = {}) {

  let canvas = getResizeArea();

  let height = origImage.height;
  let width = origImage.width;

  // calculate the width and height, constraining the proportions
  if (width / height > resizeWidth / resizeHeight) {
    width = Math.round(height * resizeWidth / resizeHeight);
  } else {
    height = Math.round(width * resizeHeight / resizeWidth);
  }

  canvas.width = resizeWidth <= width ? resizeWidth : width;
  canvas.height = resizeHeight <= height ? resizeHeight : height;

  let offsetX = origImage.width / 2 - width / 2;
  let offsetY = origImage.height / 2 - height / 2;

  //draw image on canvas
  const ctx = canvas.getContext("2d");
  ctx.drawImage(origImage, offsetX, offsetY, width, height, 0, 0, canvas.width, canvas.height);

  // get the data from canvas as 70% jpg (or specified type).
  return canvas.toDataURL(resizeType, resizeQuality);
}


