var colors = "1e91d6-0072bb-8fc93a-e4cc37-e18335".split("-").map(a=>"#"+a)
var colors_r = "aaaaaa-bbbbbb-cccccc-dddddd-eeeeee".split("-").map(a=>"#"+a)
var clr,clr_r
//宣告陣列資料，記錄每一朵花的基本資料
var positionListX =[]  //所有花的X軸位置，List串列，array陣列
var positionListY =[]  //所有花的Y軸位置
var clrList=[]      //所有花瓣顏色
var clr_r_List = []  //所有花圓心顏色
var sizeList =[]  //所有花的大小

//+++++++++++++手勢辨識＿變數宣告區++++++++++++++++
let handpose;
let video;//攝影機取得放影像資料的地方
let predictions = [];//放手勢辨識的資料
let pointerX, pointerY, pointerZ;
let pointerX8,pointerY8,pointerZ8,pointerX4,pointerY4,d//d為4,8點之間的距離
let pointerX14,pointerY14,pointerX16,pointerY16//用四個變數紀錄第14(pointerX14,pointerY14)及第16個點(pointerX16,pointerY16)的xy軸
//++++++++++++++++++++++++++++++++++++++++++++++

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(var j=0;j<10;j++){  //從j=0開始(第1朵花).......j=9(第10朵花)
    //紀錄資料
    positionListX.push(random(width)) //把花X位置存入到positionListX list資料內
    positionListY.push(random(height))
    clrList.push(colors[int(random(colors.length))])
    clr_r_List.push(colors_r[int(random(colors_r.length))])
    sizeList.push(random(0.5,1.5))
    //畫圖
    push() 
      translate(positionListX[j],positionListY[j]) //花的座標，原點移到視窗的中心點
      clr = clrList[j]
      clr_r = clr_r_List[j]
      drawFlower(clr,clr_r,sizeList[j]) 
    pop()
    }
			//+++++++++++++++++++++++++++取得攝影機影像並開始執行++++++++++++++++++++++++++++++
			video = createCapture(VIDEO);//取得攝影機的影像，影像畫面放到video中
			video.size(width, height);//影像大小為整個視窗的大小

			handpose = ml5.handpose(video, modelReady);//把video影像執行辨識手勢，辨識完畢會去執行modelReady function

				// This sets up an event that fills the global variable "predictions"
				// with an array every time new hand poses are detected
			handpose.on("predict", (results) => { //最後手勢辨識後的結果放到變數中
					predictions = results;
			});

				// Hide the video element, and just show the canvas
			video.hide();//隱藏video
			//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	
}
//最後手勢辨識後的結果完成就開始執行
function modelReady() {
  console.log("Model ready!");
}


function draw() {  //一秒進到function執行60次
	
	 //攝影機反向
  translate(width, 0);
  scale(-1, 1);
    //+++++++++
	
  background(255); 
	image(video,0,0,width,height);
	
	 d= dist(pointerX8,pointerY8,pointerX4,pointerY4)
	
  for(var j=0;j<positionListX.length;j++){  //從j=0開始(第1朵花).......j=9(第10朵花)    
    //畫圖
    // push()  
    //   translate(positionListX[j],positionListY[j]) //花的座標，原點移到視窗的中心點
    //   rotate(frameCount/70)  //旋轉指令，每次進到draw()，framecount，每次進到draw()，frameCount就會+1
    //   clr = clrList[j]
    //   clr_r = clr_r_List[j]
    //   drawFlower(clr,clr_r,map(mouseX,0,width,sizeList[j],sizeList[j]+1)) 
    // pop()
		r_Flower(clrList[j], clr_r_List[j],sizeList[j],positionListX[j],positionListY[j])
  }
		drawKeypoints(); //取得手指位置
   }
  


function drawFlower(clr,clr_r,size=1){  //clr:花瓣顏色，clr_r:花圓心顏色，size:花大小
  
  push()
    // fill(255,211,33)
    scale(size)    //縮放，size=1，100%顯示，0.5，50%顯示
    fill(clr)
		ellipse(0,0,100)
	//臉的線
		fill(0)
		ellipse(0,-10,80)//外圓
		fill(255)
		ellipse(0,-10,79.5)//內圓
	//眼睛
		fill(255)
		ellipse(10,20,20,30)
		ellipse(-10,20,20,30)
		ellipse(7,20,15,20)
		ellipse(-7,20,15,20)
		fill(0)
		ellipse(5,20,5,8)
		ellipse(-5,20,3,5)
	//鼻子
		fill(255,0,0)
		ellipse(0,10,10)
		fill(0)
		line(0,-10,0,5)
	//鬍鬚
		line(30,10,40,20)//右邊鬍鬚 上
		line(30,10,50,10)//中
		line(30,10,50,0)//下
		
		line(-30,10,-40,20)//左邊鬍鬚 上
		line(-30,10,-50,10)//中
		line(-30,10,-50,0)//下
	//嘴巴
		fill(255,0,0)
		
		ellipse(0,-20,60,30)
		
  
    ellipseMode(CORNER)
    // fill(255,90,61)
    
    for(var i =0 ;i<5;i++){
			fill(clr_r)
			ellipse(35,75,30)
			ellipse(80,80,30)
			ellipse(50,50,50)
			
			fill(0)
			ellipse(60,75,5,10)
			ellipse(90,75,5,10)
			ellipse(75,70,7,5)


			rotate(PI/2.5)
      
    }
  pop()    
}

function mousePressed(){
//紀錄資料
positionListX.push(mouseX) //把滑鼠按下的位置當作花X位置，存入到positionListX list資料內
positionListY.push(mouseY)
clrList.push(colors[int(random(colors.length))])
clr_r_List.push(colors_r[int(random(colors_r.length))])
sizeList.push(random(0.5,1.5))
let data_length = positionListX.length
//畫圖
push() 
  translate(positionListX[data_length-1],positionListY[data_length-1]) //花的座標，原點移到視窗的中心點
  clr = clrList[data_length-1]
  clr_r = clr_r_List[data_length-1]
  drawFlower(clr,clr_r,sizeList[data_length-1]) 
pop()
}

//畫點，取第八點及第四點
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      fill(0, 255, 0);
      // noStroke();
      if (j == 8) {	//食指的上端			
				pointerX8 = map(keypoint[0],0,640,0,width) //j=8所以取得第8點的資訊，keypoint[0]代表x(食指座標)
				pointerY8 = map(keypoint[1],0,480,0,height)//keypoint[1]代表y(食指座標)
        pointerZ8 = map(keypoint[2],0,480,0,height)//keypoint[2]代表z(食指座標)
        console.log(pointerZ8)
        if(pointerZ8<-40)
        {
          R_draw(pointerX8,pointerY8)
        }
				ellipse(pointerX8, pointerY8, 30, 30);
      } else
      if (j == 4) { //大拇指的上端  
				fill(255,0,0)
        pointerX4 = map(keypoint[0],0,640,0,width)
        pointerY4 = map(keypoint[1],0,480,0,height)
				// pointerZ = keypoint[2]
				// print(pointerZ)
        ellipse(pointerX4, pointerY4, 30, 30);
		
      } else
      if (j == 14) { //無名指第三個關節
        pointerX14 = keypoint[0];
        pointerY14 =  keypoint[1];
      } else
      if (j == 16) { //無名指上端
        pointerX16 = keypoint[0];
        pointerY16 =  keypoint[1];
      }
			
    }
  
  }
}


		function r_Flower(F_clr,F_clr_r,F_size,F_x,F_y){
			push()
				translate(F_x,F_y);
				if(pointerY14<pointerY16){  
					drawFlower(F_clr,F_clr_r,map(d,0,600,F_size-0.2,F_size+0.6)) //放大縮小，代表無名指有彎曲
				}else
				{
					//無名指沒有彎曲
					rotate(frameCount/20)
					drawFlower(F_clr,F_clr_r,F_size)

				}
			pop()
}
	//畫一朵花，跟滑鼠按下的程式碼一模一樣，改變handX,handY
	function R_draw(handX,handY){
		//紀錄資料
		positionListX.push(handX) //把滑鼠按下的位置當作花X位置，存入到positionListX list資料內
		positionListY.push(handY)
		clrList.push(colors[int(random(colors.length))])
		clr_r_List.push(colors_r[int(random(colors_r.length))])
		sizeList.push(random(0.5,1.5))
		let data_length = positionListX.length
		//畫圖
		push() 
			translate(positionListX[data_length-1],positionListY[data_length-1]) //花的座標，原點移到視窗的中心點
			clr = clrList[data_length-1]
			clr_r = clr_r_List[data_length-1]
			drawFlower(clr,clr_r,sizeList[data_length-1]) 
		pop()
}