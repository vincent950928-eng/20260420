let capture;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // 取得攝影機影像
  capture = createCapture(VIDEO);
  // 隱藏預設產生的 HTML 影片元件，改用 image() 畫在畫布上
  capture.hide();
}

function draw() {
  background('#e7c6ff');

  // 計算影像顯示的寬高（全螢幕的 60%）
  let w = width * 0.6;
  let h = height * 0.6;
  // 計算置中座標
  let x = (width - w) / 2;
  let y = (height - h) / 2;

  image(capture, x, y, w, h);
}

function windowResized() {
  // 當視窗大小改變時，重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
}
