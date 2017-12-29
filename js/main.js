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
	}
}
//方向数组
mov=[
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
path=[
	[],[],[],[],[],[],[],[]
];

//存储答案
resolution = [];

cnt=0;
//状态对象构造函数
Statu=function(x,y,step,currentMoveWay){
	this.x = x;
	this.y = y;
	this.step = step;
	this.currentMoveWay = currentMoveWay;
}
//初始化路径数组
function initPathArray(){
	for(var i = 0;i < 8;i++){
		for(var j = 0;j < 8;j++){
			path[i][j] = 0;
		}
	}
}
//生成随机初始位置
function generateRandomPositon(){
	var rx = Math.floor(Math.random()*8);
	var ry = Math.floor(Math.random()*8);
	var beginStatu=new Statu(rx,ry,1,0);
	path[rx][ry]=1;
	//console.log(beginStatu);
	return beginStatu;
}
//记录可行方案
function recordResolution(){
	var res=new Array();
	for(var i = 0;i < 8;i++){
		res[i]=new Array();
	}
	for(var i = 0;i < 8;i++){
		for(var j = 0;j < 8;j++){
			res[i][j] = path[i][j];
		}
	}
	resolution.push(res);
}

function solve(){
	var beginStatu = generateRandomPositon();
	stack.push(beginStatu);
	while(!stack.empty()){
		var currentStatu = stack.top();
		console.log(currentStatu);
		var currentMoveWay = currentStatu.currentMoveWay;
		var tryAll = false;
		if(currentStatu.step == 55){
			alert('ok');
			recordResolution();
			path[currentStatu.x][currentStatu.y] = 0;
			for(var i = 0;i < resolution.length;i++){
				for(var j = 0;j < 8;j++){
					console.log(resolution[i][j]);
				}
			}
			break;
			stack.pop();
			continue;
		}
		for(var i = currentMoveWay;i < 8;i++){
			var newX = currentStatu.x + mov[i][0];
			var newY = currentStatu.y + mov[i][1];
			//console.log(newX,newY);
			if(newX >= 0 && newX < 8 && newY >= 0 && newY <8 && !path[newX][newY]){
				newStatu = new Statu(newX,newY,currentStatu.step+1,0);
				path[newX][newY] = currentStatu.step+1;
				currentStatu.currentMoveWay = i+1;
				stack.push(newStatu);
				break;
			}
			if(i == 7){
				tryAll=true;
			}
		}
		if(tryAll || currentStatu.currentMoveWay == 8){
			path[currentStatu.x][currentStatu.y] = 0;
			stack.pop();
		}
	}
}
$(document).ready(function(){
	initPathArray();
	solve();/*
	for(var i = 0;i < resolution.length;i++){
		for(var j = 0;j < 8;j++){
			console.log(resolution[i][j]);
		}
	}	*/
});