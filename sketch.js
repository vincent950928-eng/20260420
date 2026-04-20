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

    // 以 20x20 為單位遍歷視訊影像像素
    for (let py = 0; py < capture.height; py += stepSize) {
      for (let px = 0; px < capture.width; px += stepSize) {
        // 取得該 20x20 區域中心點的像素座標，並確保不超過影像邊界
        const sampleX = floor(min(px + stepSize / 2, capture.width - 1));
        const sampleY = floor(min(py + stepSize / 2, capture.height - 1));
        
        // 計算在 pixels 一維陣列中的索引位置 (每個像素佔 4 碼：R, G, B, A)
        const index = (sampleX + sampleY * capture.width) * 4;
        
        const r = capture.pixels[index];     // pixel[0]
        const g = capture.pixels[index + 1]; // pixel[1]
        const b = capture.pixels[index + 2]; // pixel[2]
        
        const avg = floor((r + g + b) / 3);  // 計算平均亮度值

        // 根據亮度自動切換文字顏色，增加可讀性
        pg.fill(avg > 128 ? 0 : 255);
        
        // 在繪圖層的對應位置中心顯示平均值
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
