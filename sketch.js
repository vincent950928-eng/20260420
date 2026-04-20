let capture;
let pg; // 宣告用於存放繪圖層的變數

function setup() {
  createCanvas(windowWidth, windowHeight);
  // 取得攝影機影像
  capture = createCapture(VIDEO);
  // 隱藏預設產生的 HTML 影片元件，改用 image() 畫在畫布上
  capture.hide();
}

function draw() {
  background('#e7c6ff');

  // 當攝影機成功啟動且 pg 尚未建立時，建立一個與視訊同寬高的繪圖層
  if (!pg && capture.width > 0) {
    pg = createGraphics(capture.width, capture.height);
  }

  // 計算影像顯示的寬高（全螢幕的 60%）
  let w = width * 0.6;
  let h = height * 0.6;
  // 計算置中座標
  let x = (width - w) / 2;
  let y = (height - h) / 2;

  // 1. 先畫出底層的攝影機視訊
  image(capture, x, y, w, h);

  // 2. 如果繪圖層已建立，在上面繪製內容並疊加到視訊上方
  if (pg) {
    pg.clear(); 
    capture.loadPixels(); // 載入視訊像素資料
    
    let stepSize = 20; // 設定單位大小
    pg.textAlign(CENTER, CENTER);
    pg.textSize(8);
    pg.fill(255); // 設定文字顏色為白色

    // 以 20x20 為單位遍歷像素
    for (let py = 0; py < capture.height; py += stepSize) {
      for (let px = 0; px < capture.width; px += stepSize) {
        let index = (px + py * capture.width) * 4;
        let r = capture.pixels[index];
        let g = capture.pixels[index + 1];
        let b = capture.pixels[index + 2];
        let avg = floor((r + g + b) / 3); // 計算平均值

        // 在 pg 層的對應位置顯示數值
        pg.text(avg, px + stepSize / 2, py + stepSize / 2);
      }
    }

    // 將繪圖層畫在與視訊相同的位置與大小
    image(pg, x, y, w, h);
  }
}

function windowResized() {
  // 當視窗大小改變時，重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
}
