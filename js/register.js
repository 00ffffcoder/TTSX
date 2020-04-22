window.onload = function(){
	var form = document.getElementById("submit_form");
	var userName = document.getElementById("username");
	var pwd = document.getElementById("pwd");
	var repwd = document.getElementById("repwd");
	var email = document.getElementById("email");



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

			if (pwd.value!==repwd.value){
				alert("密码不一致，请确认！");
				repwd.value='';
				repwd.style.borderColor="red";
			}else {
				var isRegister = confirm("请记住您的用户名是："+userName.value+"，您的密码是："+pwd.value+
				"\n您的邮箱是："+email.value);
				if (isRegister){
				form.action="TTSX-Login.html";
				}
			}
		
		}

	};
};