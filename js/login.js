window.onload = function(){
	var form = document.getElementById("submit_form");
	var userName = form.children[0];
	var pwd = form.children[1];

	function isInputOk(name,str){
		var re = /[^A-z0-9]+/g.test(name.value);

		if (re){
			alert("您输入的 "+str+" 不是由字母和数字组成！");
			name.value ='';
			name.style.borderColor="red";
		}else if(name.value.length<6 || name.value.length>20){
			alert("您输入的 "+str+" 字符数不在6-20位内！");
			name.value ='';	
			name.style.borderColor="red";
		}else {
			return true;
		}
	}


	document.getElementById("sub_btn").onclick =function (){

		var result01 = isInputOk(userName,"用户名");
		var result02 = isInputOk(pwd,"密码");

		if (result01 && result02){
			var isLogin = confirm("欢迎您，"+userName.value+"！今天也是充满希望的一天！");
			//确认后，进入主页面
			if (isLogin){
			form.action="TTSX-Index.html";
			}
		};


	};

};