//数据结构栈
stack={
	data:[],
	push:function(e){
		this.data[this.data.length++] = e;
	},
	pop:function(){
		this.data.length--;
	},
	empty:function(){
		return this.data.length === 0;
	},
	top:function(){
		return this.data[this.data.length - 1];
	},
	clear:function(){
		this.data.length = 0;
	}
}
//方向数组

var mov=[
	[-1,-2],
	[-2,-1],
	[-2,1],
	[-1,2],
	[1,2],
	[2,1],
	[2,-1],
	[1,-2],
];

//路径数组
var path=[
	[],[],[],[],[],[],[],[]
];
//用于绘图的路径数组
var pathToDraw=[
	[],[],[],[],[],[],[],[]
]
//可行数数组
var accessible=[
	[],[],[],[],[],[],[],[]
]
//初始状态
var beginStatu;
//状态对象构造函数
Statu=function(row,col,step){
	this.row = row;
	this.col = col;
	this.step = step;
	this.currentMoveWay = 0;
	this.order= [];
}
var inAnima = false;
var row63;
var col63;
var row64;
var col64;
//初始化函数
function init(){
	stack.clear();
	initSupportArray();
	beginStatu = generateRandomPositon();
	stack.push(beginStatu);
}
//初始化辅助数组
function initSupportArray(){
	for(var i = 0;i < 8;i++){
		for(var j = 0;j < 8;j++){
			path[i][j] = 0;
			accessible[i][j] = 0;
			for(var k = 0;k < 8;k++){
				var newI=i + mov[k][0];
				var newJ=j + mov[k][1];
				if(newI >= 0 && newI < 8 && newJ >= 0 && newJ < 8){
					accessible[i][j]++;
				} 
			}
		}
	}	
}
//冒泡排序
function bubbleSort(access,order){
	for(var i = 0;i < 7;i++){
		for(var j = 0;j < 7 - i;j++){
			if(access[j]>access[j+1]){
				var temp = order[j];
				order[j] = order[j+1];
				order[j+1] = temp;
				temp = access[j];
				access[j] = access[j+1];
				access[j+1] = temp;
			}
		}
	}
}
//生成随机初始位置
function generateRandomPositon(){
	var rrow = Math.floor(Math.random()*8);
	var rcol = Math.floor(Math.random()*8);
	var beginStatu = new Statu(rrow,rcol,1);
	handleStatuAccessible(beginStatu);
	adjust(rrow,rcol);
	path[rrow][rcol]=1;
	$(".gird-"+rrow+"-"+rcol).text(1);
	return beginStatu;
}
//处理状态的可行性数组
function handleStatuAccessible(statu){
	if(statu.step == 63){
		for(var i = 0;i < 8;i++){
			var newRow = statu.row + mov[i][0];
			var newCol = statu.col + mov[i][1];
			if(newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8 && !path[newRow][newCol]){
				row63 = statu.row,col63 = statu.col,row64 = newRow,col64 = newCol;
				return true;
			}
		}
		return false;
	}


	var access = [];
	var order = [0,1,2,3,4,5,6,7];
	for(var i = 0;i < 8;i++){
		var newRow = statu.row + mov[i][0];
		var newCol = statu.col + mov[i][1];
		if(newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8 && !path[newRow][newCol]){
				access[i] = accessible[newRow][newCol] - 1;
		}else{
			access[i] = 0;
		}
	}
	bubbleSort(access,order);
	var cur = 0;
	while(access[cur] == 0 && cur < 8){
		cur++;
	}
	statu.currentMoveWay = cur;
	statu.order = order;

	if(cur == 8){
		return false;
	}
	return true;
}
//调整可行性
function adjust(row,col){
	for(var i = 0;i <8;i++){
		var newRow = row + mov[i][0]; 
		var newCol = col + mov[i][1];
		if(newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8){
			accessible[newRow][newCol]--;
		} 
	}
}
function rollBack(row,col){
	for(var i = 0;i <8;i++){
		var newRow = row + mov[i][0]; 
		var newCol = col + mov[i][1];
		if(newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8){
			accessible[newRow][newCol]++;
		} 
	}
}
//生成一组答案
function solve(){
	var cnt = 0;

	while(!stack.empty()){
		var currentStatu = stack.top();
		var haveNextStatu = 0;
		console.log(currentStatu);
		var currentMoveWay = currentStatu.currentMoveWay;

		for(var i = currentStatu.currentMoveWay;i < 8;i++){
			console.log(currentStatu);
			moveMay = currentStatu.order[i];
			var newRow = currentStatu.row + mov[moveMay][0];
			var newCol = currentStatu.col + mov[moveMay][1];
			var newStatu = new Statu(newRow,newCol,currentStatu.step+1);
			if(currentStatu.step == 62){
				for(var i = 0;i < 8;i++){
					var lastRow = newRow + mov[i][0];
					var lastCol = newCol + mov[i][1];
					if(lastRow >= 0 && lastRow < 8 && lastCol >= 0 && lastCol < 8 && !path[lastRow][lastCol]){
						console.log(lastRow,lastCol,path[lastRow][lastCol])
						row63 = newRow,col63 = newCol,row64 = lastRow,col64 = lastCol;
						currentStatu.currentMoveWay++;
						return true;
					}
				}
			}else if(handleStatuAccessible(newStatu)){
				haveNextStatu = 1;
				stack.push(newStatu);
				adjust(newRow,newCol);
				path[newRow][newCol] = currentStatu.step + 1;
				currentStatu.currentMoveWay = i + 1;
				break;	
			}
		}
		if(!haveNextStatu){
			path[currentStatu.row][currentStatu.col] = 0;
			rollBack(currentStatu.row,currentStatu.col);
			stack.pop();
		}
	}
	return false;
}
function generateGird(){
	var chessboard = $(".chessboard");
	for(var i = 0;i < 8;i++){
		for(var j=0;j < 8;j++){
			var gird = $("<div class='gird gird-"+i+"-"+j+"'></div>");
			gird.css({
				"width": "12.5%",
				"height": "12.5%", 
				"float": "left",
			});
			if((i + j) % 2 == 1){
				gird.addClass("white-gird");
			}else{
				gird.addClass("black-gird");
			}
			chessboard.append(gird);
		}
	}
}
function removeGird(){
	for(var i = 0;i < 8;i++){
		for(var j = 0;j < 8;j++){
			var gird=$(".gird-"+i+"-"+j);
			gird.remove();
		}
	}
	$(".horse").remove();
}
function drawPath(){
	for(var i = 0;i < 8;i++){
		for(var j = 0;j < 8;j++){
			pathToDraw[i][j] = path[i][j];
		}
	}
	pathToDraw[row63][col63] = 63;
	pathToDraw[row64][col64] = 64;
	for(var i = 0;i < 8;i++){
		for(var j = 0;j < 8;j++){
			var gird = $(".gird-"+i+"-"+j);
			gird.text(pathToDraw[i][j]);
		}
	}
}
function rowOffset(row){
	return row*75;
}
function colOffset(col){
	return col*75;
}
function showAnima(){
	inAnima = true;
	var step = 1;
	var chessboard = $(".chessboard");
	var horse = $("<div class='horse'></div>");
	var currentRow = beginStatu.row;
	var currentCol = beginStatu.col;
	chessboard.append(horse);
	horse.css({
		"position": "relative",
		"height": "75px",
		"width": "75px",
		"background-image": "url('image/horse.jpg')",
		"top": rowOffset(currentRow),
		"left": colOffset(currentCol),
	});
	while(step < 64){
		console.log(step);
		for(var i = 0;i < 8;i++){
			var nextRow = currentRow + mov[i][0];
			var nextCol = currentCol + mov[i][1];
			console.log(nextRow,nextCol);
			if(nextRow >= 0 && nextRow < 8 && nextCol >= 0 && nextCol < 8 && pathToDraw[nextRow][nextCol] == step + 1){
				if(step == 63){
					horse.animate({
					left: colOffset(nextCol),
					top: rowOffset(nextRow)
					},function(){
						$(".showAnimaBtn").removeClass("disabled").attr("disabled",false);
					});
				}else{
					horse.animate({
					left: colOffset(nextCol),
					top: rowOffset(nextRow)
					});
				}
				
				currentRow = nextRow;
				currentCol = nextCol;
				step++
				break;
			}
		}
	}
}
$(document).ready(function(){
	generateGird();
	init();
	$(".restartBtn").click(function(){
		removeGird();
		generateGird();
		init();
	});
	$(".nextAnswerBtn").click(function(){
		$(".horse").remove();
		if(!solve()){
			alert("当前是最后一组解了");
		}else{
			drawPath();

			$(".showAnimaBtn").removeClass("disabled").attr("disabled",false);

		}

	});
	$(".showAnimaBtn").click(function(){
		$(".horse").remove();
		$(".showAnimaBtn").addClass("disabled").attr("disabled",true);
		showAnima();
	});
});