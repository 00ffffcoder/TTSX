
	window.onload = function (){
		
		var slide_pic = document.getElementById("slide_pic");
		var imgList = document.getElementById("imgList");
		var imgArr = imgList.getElementsByTagName("img");
		var nav_con = document.getElementById("nav_con");
		//获取所有a标签
		var allAtags = nav_con.getElementsByTagName("a");
		var index = 0;
		
		//默认在第一张图片时，显示a标签是白色的。这是内联样式，可以覆盖内嵌样式。
		allAtags[index].style.backgroundColor = "#fff";
		
		//设置ul 的宽度，由图片多少决定
		imgList.style.width = 765*imgArr.length + "px";
		
		
		// console.log(nav_con.offsetWidth);
		//设置nav_con相对于父级div可以居中显示，由a标签个数多少决定
		nav_con.style.left = (764 - nav_con.offsetWidth)/2 + "px";
		
		//【功能1：手动模式】 点击哪个超链接，就显示哪张图片。同时那个超链接背景色为白色。
		//为所有超链接先绑定单机响应函数。
		for (var i=0;i<allAtags.length;i++){
			// 但对于for循环，单击响应函数都等循环完才开始执行。执行响应函数前先给每个a元素绑定num属性
			allAtags[i].num = i;

			allAtags[i].onclick = function (){
				//关闭定时器
				clearInterval(timer);
				
				//这里this 指向每个a元素
				// alert(this.num);	
				index = this.num;
				//被选中的a变黑
				setAbgcolor();
				//点击哪个a, 就移动到对应那张图片
				moveLandR(imgList,"left",-765*index,50,30,function (){
					//手动点击切换后，过了一定时间还是可以自动切换
					autoChange();
				});
			};
			
		}
		
		
		//【功能2：自动模式】开启自动切换图片
		autoChange();
		
		//专门定义一个函数，来设置a 标签的颜色。点击哪个a，它的颜色就变白
		function setAbgcolor(){
			//判断当前索引是否到最后一张图片
			if(index >= imgArr.length-1){
				//如果是，就让index回到0
				index = 0;
				//此时显示最后一张图片，而最后一张图和第一张一摸一样，用CSS样式让整个ul瞬间到初始位置
				imgList.style.left = 0;
			}

			//让所有a, 内联样式的背景色为空，因此会显示内嵌样式：红色
			for (var i=0;i<allAtags.length;i++){
				allAtags[i].style.backgroundColor = "";
			}
			//唯独被选中的a才变白
			allAtags[index].style.backgroundColor = "#fff";
		}
		
		var timer;
		//设置一个函数，专门开启自动切换图片
		function autoChange(){					
			timer = setInterval(function () {
				index++;
				//到最后一张图片，让index回到0
				index %= imgArr.length;						
				moveLandR(imgList,"left",-765*index,50,30,function (){			
					setAbgcolor();
				});
			},3000);
		}
	


		function moveLandR(obj,attrStr,target,speed,time,callback){
			clearInterval(obj.timer);
	
			//根据对象当前位置和目标位置，判断移动方向
			var currentValue = parseInt(getStyle(obj,attrStr));
			if (currentValue > target){
				//方向为负方向，速度为负值
				speed = -speed;
			}
			
			//设置obj的定时器
			obj.timer = setInterval(function (){
				var newValue = parseInt(getStyle(obj,attrStr)) + speed;
				
				//移动超过了target，摆正位置
				if ((speed>0 && newValue>target) || (speed<0 && newValue<target)){
					newValue = target;
				}
				obj.style[attrStr] = newValue +"px";
				
				// 走到target像素就停止
				if (newValue === target){
					//停止动画
					clearInterval(obj.timer);
					//开始执行回调函数callback, 参数中有才执行，没添加这个参数就不管
					callback && callback();
				}						
			},time);	
		}

		function getStyle(obj,name){
			//判断window有无此属性
			if (window.getComputedStyle){
				//正常浏览器（IE8以上）才有的方法
				return getComputedStyle(obj,null)[name];
			}else{
				//IE8才有的方法
				return obj.currentStyle[name];
			}
		}
				






	};

