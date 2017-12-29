stack={
	data:[],
	top:0,
	push:function(e){
		data[++top]=e;
	},
	pop:function(){
		top--;
	},
	getTop(){
		return data[top];
	}
}