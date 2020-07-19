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
//左斜线
var leftDiagonal = [];
//右斜线
var rightDiagonal = [];
//列
var colUsed = [];
//方案
var res = [];
var cur = 0;
//状态
statu = function(row,cur,occupy){
	this.row = row;
	this.cur = cur;
	this.occupy = occupy;
}
function initSupportArray(){
	res.splice(0,res.length);
	for(var i = 0;i < 8;i++){
		colUsed [i] = false;
	}
	for(var i = 0;i < 16;i++){
		leftDiagonal[i] = rightDiagonal[i] = false; 
	}
}
function generateGird(){
	var chessboard = $(".chessboard");
	for(var i = 0;i < 8;i++){
		for(var j = 0;j < 8;j++){
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

function solve(){
	var beginStatu = new statu(0,0,[]);
	stack.push(beginStatu);
	while(!stack.empty()){
		var currentStatu = stack.top();
		var haveNextStatu = false;
		var currentRow = currentStatu.row;
		var currentCur = currentStatu.cur;
		if(currentStatu.row == 8){
			res.push(currentStatu.occupy);
			var lastPos = currentStatu.occupy[7];
			colUsed[lastPos] = false;
			leftDiagonal[ lastPos - 7 + 8] = false;
			rightDiagonal[lastPos + 7] = false;
			stack.pop();
			continue;
		}
		for(var i = currentCur;i < 8;i++){
			if(!leftDiagonal[i - currentRow + 8] && !rightDiagonal[i + currentRow] && !colUsed[i]){
				haveNextStatu = true;
				leftDiagonal[i - currentRow + 8] = true;
				rightDiagonal[i + currentRow] = true;
				colUsed[i] = true;
				occupy = currentStatu.occupy.slice(0);
				occupy [currentRow] = i;
				var newStatu = new statu(currentRow + 1,0,occupy);
				stack.push(newStatu);
				currentStatu.cur = i + 1;
				break;
			}
		}
		if(!haveNextStatu){
			var lastPos = currentStatu.occupy[currentStatu.row - 1];
			colUsed[lastPos] = false;
			leftDiagonal[lastPos - currentStatu.row + 1 + 8] = false;
			rightDiagonal[lastPos + currentStatu.row - 1] = false;
			stack.pop();
		}
	}
}
function colOffset(col){
	return col*75;
}
function rowOffset(row){
	return row*75;
}
function drawStragety(){
	var chessboard = $(".chessboard");
	var stragety = res[cur];
	console.log(stragety);
	for(var i = 0;i < 8;i++){
		var queen = $("<div class='queen queen-"+i+"'></div>");
		chessboard.append(queen);
		queen.css({
			"left": colOffset(stragety[i]),
			"top": rowOffset(i)
		})
	}
}
$(document).ready(function(){
	generateGird();
	initSupportArray();
	solve();
	drawStragety(cur);
	$(".number").text(cur+1);
	$(".lastAnswerBtn").click(function(){
		$(".queen").remove();
		cur = (cur - 1 + 92) % 92;
		$(".number").text(cur+1);
		drawStragety();
		$(".number").text(cur+1);
	});
	$(".nextAnswerBtn").click(function(){
		cur = (cur + 1) % 92;
		$(".number").text(cur+1);
		$(".queen").remove();
		drawStragety();
	});
	$(".numberNAnswer").click(function(){
		var number = $(".number-input").val();
		if(parseInt(number) == number){
			if(number >= 1 && number <= 92){
				cur = number - 1;
				$(".number").text(cur+1);
				$(".queen").remove();
				drawStragety();
			}else{
				alert("超出范围，输入无效！");
				$(".number-input").val("");
				return;
			}
		}else{
			alert("请输入 1 - 92 间的正整数");
			return;
		}
		$(".number-input").val("");
	});
});
$("body").keydown(function(){
	if(event.keyCode == "13"){
		$(".numberNAnswer").click();
	}
})