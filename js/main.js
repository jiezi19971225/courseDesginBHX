stack={
	data:[],
	top:0,
	push:function(e){
		this.data.length++;
		this.data[++top]=e;
	},
	pop:function(){
		this.top--;
	},
	getTop(){
		return this.data[top];
	}
}
Statu=function(x,y,step){
	this.x=x;
	this.y=y;
	this.step=step;
}

function generateRandomPositon(){
	var rx=Math.ceil(Math.random()*8);
	var ry=Math.ceil(Math.random()*8);
	var beginState=new Statu(rx,ry,0);
	return beginStatu;
}

function solve(){

}
$(document).ready(function(){
	console.log(stack);
	s1=new Statu(1,1,1);
	stack.push(s1);
	console.log(stack);
});