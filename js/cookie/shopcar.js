

//=======获取页面数据到后台=========
function GetAndSaveInfo(){
	this.box = $(".box");//所有卡片
	this.addcar = $(".addcar");//所有的添加按钮
	this.proColor = $(".color-list>li");//产品颜色
	this.shopHref = $(".shopHref");
	this.totalNum = $(".totalNum");
	this.uname = $.cookie("userName");
	console.log($.cookie("userName"));
	this.init();
}
$.extend(GetAndSaveInfo.prototype,{
	init:function(){
		this.colorAddClass();
		this.boxClick();
		this.arrJsonFn();
		this.shopCarCount();
		this.hideShopCarFn();
	},
	//颜色点击添加class
	colorAddClass:function(){
				  this.proColor.click(function(){
				  	    $(this).attr("class","check").siblings().removeClass("check");
				  })
	},
	//卡片box的点击事件
	boxClick:function(){
			var _this = this;
		    this.box.on("click",function(event){
			    var target = $(event.target);
			     $(this).css("z-index","999");
			     //判断点击的是a加入购物车按钮
			    if(target.attr("class") == "addcar"){
			        _this.getProInfo(target);//调用获取产品信息
			       
			        //加入购物车的抛物线过程
					//addShopCarAnimate(target);
			        
			        _this.shopCarCount();//购物车数量变化
			    }
			    //获取详情页数据
			    if(target.attr("class") == "detailPage"){
			        _this.getDetailInfo(target);
			    } 
			    //获取详情页数据
			    if(target.attr("name") == "chackPage"){
			        _this.getDetailInfo(target);
			    } 
			})
	},
	//获取当前页面数据
	getProInfo:function(target){
				 //获取图片路径
			    var proImg = target.parents(".box").find(".proImg").attr("src");
				 //获取产品名称
			    var proNameVal = target.parent().siblings(".color-text").find(".model-desc").text();
			    //产品颜色的父级
			    var proColorList = target.parent().siblings(".color-list");
			    //获取产品颜色
			    var proColorVal = proColorList.find(".check").attr("name");
			    var proId = proColorList.find(".check").attr("pid");
			    //判断用户是否点击颜色,没有点击就默认第一个
			    if(!proColorVal){
			        var proColorVal = proColorList.find("li").eq(0).attr("name");
			        //获取产品id
			    	var proId = proColorList.find("li").eq(0).attr("pid");
			    }
			    //获取产品型号
			    var pNameId =  target.parent().siblings(".color-text").find(".model-desc").attr("pNameId");
   
			    //获取产品价格
			    var proPriceVal = target.parent().siblings(".color-text").find(".phone-price").text();
			    var proDiscountVal = target.parent().parent().siblings(".prodinfo").find(".reduce-num").text();
			
			    var obj = {
			        proImg:proImg,//产品路径
			        proNameVal:proNameVal,//产品名称
			        pNameId:pNameId,//产品型号id
			        proColorVal:proColorVal,//颜色值
			        proId:proId,//产品颜色id
			        proNum:1,//默认数量为1
			        proPriceVal:proPriceVal,//单件
			        proDiscountVal:proDiscountVal//优惠价
			    }
			    
				this.arrJsonFn(obj);//调用设置cookie函数
				console.log(obj);		
	},
	//设置cookie
	arrJsonFn:function(obj){
			    //判断是否传参数进来
				//判断cookie是否存在
				if(obj){
					
				    if (!localStorage.getItem(this.uname+"proCookie")) {//不存在就直接存入
				    	//console.log(1)
				    	var arrInfo = [];
						arrInfo.push(obj);
						//console.log(arrInfo);
				    	var strJson =JSON.stringify(arrInfo);
				    	//console.log(strJson);
				        localStorage.setItem(this.uname+"proCookie", strJson);
				        //console.log($.cookie("proCookie"));
				        
				    }else{
				        this.getLocalCookieStr = localStorage.getItem(this.uname+"proCookie");//先获取已经存在的cookie
				        this.getLocalCookieArr = JSON.parse(this.getLocalCookieStr);
				        console.log(this.getLocalCookieArr);
						
			            //循环现有的cookie,判断pNameId,proId是否存在
			            var flag = 0;
			            for (var i = 0; i < this.getLocalCookieArr.length; i++) {
			            	if(this.getLocalCookieArr[i].pNameId == obj.pNameId && this.getLocalCookieArr[i].proId == obj.proId){
			            		this.getLocalCookieArr[i].proNum++;
			            		flag = 1;
			            	}
			            } 
			            
			            if(flag == 0){
			        		this.getLocalCookieArr.push(obj);//将传入的对象参数存入
			        		console.log(this.getLocalCookieArr);
			            }
			            localStorage.setItem(this.uname+"proCookie",JSON.stringify(this.getLocalCookieArr));
				    }
				}
	},
	//购物车数量变化
	shopCarCount:function(){
				var sumN = 0;
				var sumPri = 0;
				this.hideNums = $(".result .nums");
				this.rmbSymbol = $(".rmb-symbol");
				if( localStorage.getItem(this.uname+"proCookie") ){
					var cookieStr = localStorage.getItem(this.uname+"proCookie");//先获取已经存在的cookie
			        var cookieArr = JSON.parse(cookieStr);
					for(var i=0; i < cookieArr.length; i++){
						sumN += cookieArr[i].proNum;
						var priStr = cookieArr[i].proPriceVal;
						sumPri += Number(priStr.substr(1)) * cookieArr[i].proNum-Number(cookieArr[i].proDiscountVal);
						console.log(priStr,cookieArr[i].proDiscountVal)
						console.log(sumPri)
						
					}
					this.totalNum.text(sumN);
					this.hideNums.text(sumN);
					this.rmbSymbol.text("¥"+sumPri+".00");
				}else{
					this.totalNum.text(0);
				}
	},
	//为获取详情页数据
	getDetailInfo:function(target){
//				    console.log(target)
//					console.log(target.parents(".box").length)
				    var getNames = target.parents(".box").find(".model-desc").html();
				    var getNameId = target.parents(".box").find(".model-desc").attr("pNameId");
				    var getPrice = target.parents(".box").find(".phone-price").html();
				    var getIMg = target.parents(".box").find(".proImg").attr("src");
				    var getReduce = target.parents(".box").find(".reduce-num").html();
				
				    var obj = {
				        getNames:getNames,
				        getNameId:getNameId,
				        getPrice:getPrice,
				        getIMg:getIMg,
				        getReduce:getReduce
				    }
				    console.log(obj)
				    var strJson = JSON.stringify(obj);
				    //存入新的cookie
				    localStorage.setItem("getDetailCookie",strJson);
				    
	},
	//隐藏的购物车的显示
	hideShopCarFn:function(){
				var _this = this;
				this.prompt = $(".prompt");
				this.hideShopCar = $(".hideShopCar");
				this.contentCar = $(".contentCar");
				this.hideShopWrap = $(".hideShopWrap");
//				console.log(1);
				this.shopHref.click(function(){
					_this.prompt.hide();
					_this.hideShopCar.show();
					_this.getHideCarInfo();
				});
				this.hideShopWrap.mouseleave(function(){
					_this.hideShopCar.hide();
				})
	},
	//获取隐藏的购物车的内容
	getHideCarInfo:function(){
					var getCookieStr = localStorage.getItem(this.uname+"proCookie");
					var CookieToArr = JSON.parse(getCookieStr);
					console.log(CookieToArr);
					var htmlText = "";
					for(var i = 0; i < CookieToArr.length; i++){
						htmlText += `
								<li class="clearfix">
                        			<a href="products.html?pNameId=${CookieToArr[i].pNameId}&proId=${CookieToArr[i].proId}"><img src="${CookieToArr[i].proImg}" class="hideImg"/></a>
                        			<div class="carR">
                        				<a href="products.html?pNameId=${CookieToArr[i].pNameId}&proId=${CookieToArr[i].proId}">${CookieToArr[i].proNameVal}</a>
                        				<p>${CookieToArr[i].proPriceVal}</p>
                        				<p class="f4">颜色:<span class="color">${CookieToArr[i].proColorVal}</span></p>
                        			</div>
                        			<p class="f3">×<span class="proNums">${CookieToArr[i].proNum}</span></p>
                        		</li>
						`;
					}
					this.contentCar.html(htmlText);
					
	},
	//加入购物车的抛物线过程
	addShopCarAnimate:function(target){
					    var smallImg = target.parent().parent().siblings(".smallImg");

					    smallImg.show().animate({
					        width:50,
					        height:50,
					        left:178,
					        top:72
					    });
					
					    var startPoint = {
					        x:178,
					        y:72
						}
					    var endPoint = {
					        x:shopHref.offset().left + shopHref.width()/2,
					        y:shopHref.offset().top
					    }
						console.log(endPoint.x,endPoint.y)
					    var topPoint = {
					        x:shopHref.offset().left-100,
					        y:shopHref.offset().top-260
					    }
					    // console.log(startPoint,endPoint,topPoint);
					    //抛物线公式
					    var a = ((startPoint.y - endPoint.y) * (startPoint.x - topPoint.x) - (startPoint.y - topPoint.y) * (startPoint.x - endPoint.x)) / ((startPoint.x * startPoint.x - endPoint.x * endPoint.x) * (startPoint.x - topPoint.x)-(startPoint.x * startPoint.x - topPoint.x * topPoint.x) * (startPoint.x - endPoint.x));
					    var b = ((endPoint.y - startPoint.y) - a * (endPoint.x * endPoint.x - startPoint.x * startPoint.x)) / (endPoint.x - startPoint.x);
					    var c = startPoint.y - a * startPoint.x * startPoint.x - b * startPoint.x;
					
					    var x = startPoint.x;
					    var y = startPoint.y;
					    var shopTime = setInterval(function(){
					        if(smallImg.offset().left < endPoint.x - smallImg.width()){
					            x+=5;
					            y = a*x*x + b*x + c;
					//			smallImg.stop(true).css({
					//				left:x,
					//				top:y
					//			}) ;
					            smallImg[0].style.left = x + "px";
					            smallImg[0].style.top = y + "px";
					        }else{
					            clearInterval(shopTime);
					            smallImg.stop(true,true).hide().animate({
					                width:168,
					                height:213,
					                left:112,
					                top:0
					            });
					            target.parents(".box").css("z-index",1);
					            var sumPro = this.totalNum.text();//商品初始数量
					            sumPro++;
					            this.totalNum.text(sumPro);
					        }
					    },20)
	}
});
new GetAndSaveInfo();
