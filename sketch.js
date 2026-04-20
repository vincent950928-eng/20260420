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
    pg.clear(); // 清除上一幀內容，保持背景透明
    
    // --- 在 pg 繪圖層上繪製內容 (範例：在中心畫一個圓與文字) ---
    pg.fill(255, 255, 0); // 黃色
    pg.noStroke();
    pg.ellipse(pg.width / 2, pg.height / 2, 50, 50); 
    
    pg.textAlign(CENTER);
    pg.textSize(20);
    pg.text("Overlay Layer", pg.width / 2, pg.height / 2 + 40);

    // 將繪圖層畫在與視訊相同的位置與大小
    image(pg, x, y, w, h);
  }
}

function windowResized() {
  // 當視窗大小改變時，重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
}
