
window.onload = function(){
	new getCookieInfo();
}
//获取商场页的信息
function getCookieInfo() {
	this.container = $(".container");
	this.init();
}
$.extend(getCookieInfo.prototype,{
	init:function () {
			if(!localStorage.getItem("getDetailCookie")){
				this.getJson();//从购物车跳转到详情页
			}else{
				this.getCookie();//从首页跳转到详情页
			}
			
			
    },
    //从列表页跳转到详情页
	getCookie:function () {
		this.cookieInfo = localStorage.getItem("getDetailCookie");
		this.cookieObj = JSON.parse(this.cookieInfo);
		console.log(this.cookieObj);
		//图片路径处理
		this.getImg = this.cookieObj.getIMg;//"img/hot-img2.png"
		this.imgSrc = this.getImg.substring(0,this.getImg.indexOf("."));//"img/hot-img2"
//		console.log(this.imgSrc);
		
		var htmlStr = "";
          htmlStr += ` <div class="proImgLeft">
							<ul class="bigImgWrap">
								<li style="display: block;"><img src="${this.imgSrc +'-L1.png'}" alt=""></li>
								<li><img src="${this.imgSrc+'-L2.png'}" alt=""></li>
								<li><img src="${this.imgSrc+'-L3.png'}" alt=""></li>
							</ul>
							<ul class="smallImgWrap">
								<li><a href="javascript:void(0)"><img src="${this.imgSrc+'-s1.png'}" alt=""><i style="width: 28px;"></i></a></li>
								<li><a href="javascript:void(0)"><img src="${this.imgSrc+'-s2.png'}" alt=""><i></i></a></li>
								<li><a href="javascript:void(0)"><img src="${this.imgSrc+'-s3.png'}" alt=""><i></i></a></li>
							</ul>
						</div>
						<div class="proDescRight">
							<h3 class="ProName" pNameId = "${this.cookieObj.getNameId}">${this.cookieObj.getNames}</h3>
							<p class="proDesc"><span>【现货开售；享3期免息】</span>6.26新一代全面屏，64GB大内存，AI智慧双摄，骁龙660AIE处理器，Jovi智能助手（付款订单将于7天内发出）</p>
							<div class="priceWrap clearfix">
								<p><span class="proPrice">${this.cookieObj.getPrice}</span></p>
								<p><span class="J-code-icon">1898</span><span>购买即送1898积分</span></p>
							</div>
							<div class="proColor">
								<p>选择颜色</p>
								<ul class="checkColor clearfix">
									<li class="colorCheck">
										<span></span>
										<span class="colorName" pid="1">魅夜紫</span>
									</li>
									<li>
										<span></span>
										<span class="colorName" pid="2">极致红</span>
									</li>
									<li>
										<span></span>
										<span class="colorName" pid="3">瓷釉蓝</span>
									</li>
								</ul>
							</div>
							<div class="proNumWrap">
								<p>数量</p>
								<p class="numWrap">
									<span class="reduceNum"></span>
									<input type="text" readonly="readonly" class="numInput" value="1" />
									<span class="addNum"></span>
								</p>
							</div>
							<div class="proButtonWrap">
								<a href="javascript:void(0)" class="addShopCar">加入购物车</a>
								<a href="javascript:void(0)">立即购买</a>
							</div>
						</div>`

        this.container.html(htmlStr);
        main();//调用下面的动效
   },
   //从购物车跳转到详情页,这里用json的形式获取数据
   getJson:function(){
   			var _this = this;
   			var currHref = location.href;
   			var infoArr = currHref.split("?")[1].split("&");
   			var nameId =  infoArr[0].split("=")[1];
   			var colorId =  infoArr[1].split("=")[1];
   			console.log(nameId,colorId);
   			var pro = new Promise(function(succ,file){
   				$.ajax({
   					type:"post",
   					url:"js/cookie/proDateAll.json",
   					success:function(res){
   						succ(res);
   					}
   				});
   			});
   			pro.then(function(res){
   				console.log(res);
   				var infoArr = res;
   				var html = "";
   				var currArr = [];
   				for(var i = 0; i < infoArr.length; i++){
   					if(infoArr[i].pNameId == nameId){
   						for(var j = 0; j < infoArr[i].proId.length; j++ ){
   							if(infoArr[i].proId[j] == colorId){
   								currArr.push(infoArr[i]);
   							}
   						}
   					}
   				}
   				console.log(currArr);
   				//图片路径处理
				var getImg = currArr[0].proImg;//"img/hot-img2.png"
				var imgSrc = getImg.substring(0,getImg.indexOf("."));//"img/hot-img2"
   				//
   				html += ` <div class="proImgLeft">
							<ul class="bigImgWrap">
								<li style="display: block;"><img src="${imgSrc+'-L1.png'}" alt=""></li>
								<li><img src="${imgSrc+'-L2.png'}" alt=""></li>
								<li><img src="${imgSrc+'-L3.png'}" alt=""></li>
							</ul>
							<ul class="smallImgWrap">
								<li><a href="javascript:void(0)"><img src="${imgSrc+'-s1.png'}" alt=""><i style="width: 28px;"></i></a></li>
								<li><a href="javascript:void(0)"><img src="${imgSrc+'-s2.png'}" alt=""><i></i></a></li>
								<li><a href="javascript:void(0)"><img src="${imgSrc+'-s3.png'}" alt=""><i></i></a></li>
							</ul>
						</div>
						<div class="proDescRight">
							<h3 class="ProName" pNameId = "${currArr[0].pNameId}">${currArr[0].proNameVal}</h3>
							<p class="proDesc"><span>【现货开售；享3期免息】</span>6.26新一代全面屏，64GB大内存，AI智慧双摄，骁龙660AIE处理器，Jovi智能助手（付款订单将于7天内发出）</p>
							<div class="priceWrap clearfix">
								<p><span class="proPrice">${currArr[0].proPriceVal}</span></p>
								<p><span class="J-code-icon">1898</span><span>购买即送1898积分</span></p>
							</div>
							<div class="proColor">
								<p>选择颜色</p>
								<ul class="checkColor clearfix">
									<li class="colorCheck">
										<span></span>
										<span class="colorName" pid="1">魅夜紫</span>
									</li>
									<li>
										<span></span>
										<span class="colorName" pid="2">极致红</span>
									</li>
									<li>
										<span></span>
										<span class="colorName" pid="3">瓷釉蓝</span>
									</li>
								</ul>
							</div>
							<div class="proNumWrap">
								<p>数量</p>
								<p class="numWrap">
									<span class="reduceNum"></span>
									<input type="text" class="numInput" value="1" />
									<span class="addNum"></span>
								</p>
							</div>
							<div class="proButtonWrap">
								<a href="javascript:void(0)" class="addShopCar">加入购物车</a>
								<a href="javascript:void(0)">立即购买</a>
							</div>
						</div>`
   				
   				_this.container.html(html);
   				main();//调用下面的动效
   			})
   }
   //

})


function main(){

//图片切换
var smallImgLi = $(".smallImgWrap>li");
var smallImgLine = $(".smallImgWrap>li i");
var bigImgLi = $(".bigImgWrap>li");
smallImgLi.mouseenter(function(){
    var index = $(this).index();
    smallImgLine.stop(true,true).animate({width:0},400);
    $(this).find("i").stop(true,true).animate({width:28},400);
    bigImgLi.stop(true,true).fadeOut(500);
    bigImgLi.eq(index).stop(true,true).fadeIn(500);
})

//内容导航切换
var contentNavLi = $(".contentNav>li");
var contentNavLiunder = $(".contentNav>li>span");
var contentImgLi = $(".contentImg>li");
contentNavLi.click(function(){
    var index = $(this).index();
    contentNavLi.removeClass("hover");
    contentNavLiunder.removeClass("underline");
    $(this).addClass("hover");
    $(this).find("span").addClass("underline");

    contentImgLi.eq(index).show().siblings().hide();
})

//颜色现在添加类名及样式
var checkColor = $(".checkColor>li");
checkColor.click(function(){
	$(this).addClass("colorCheck").siblings().removeClass("colorCheck");
})

//点击数量的加减
var reduceNum = $(".reduceNum");
var addNum = $(".addNum");
var numInput = $(".numInput");
reduceNum.click(function(){
	var chNumRe = numInput.val();
	if (chNumRe <= 1){
            chNumRe = 1;
        } else {
            chNumRe--;
        }
        numInput.val(chNumRe);//数量
})
addNum.click(function(){
	var chNumAdd = numInput.val();
	if (chNumAdd >=100 ){
            chNumAdd = 100;
        } else {
            chNumAdd++;
        }
        numInput.val(chNumAdd);//数量
})



//点击加入购车时候获取信息
function GetPageInfo(){
	this.container = $(".container");
	this.uname = $.cookie("userName");
	this.currentCookie = JSON.parse(localStorage.getItem("getDetailCookie"));
	this.proCookie = JSON.parse(localStorage.getItem(this.uname+"proCookie"));
	this.totalNum = $(".totalNum");
	this.init();
}
$.extend(GetPageInfo.prototype,{
	init:function(){
			this.addClick();
	},
	addClick:function(){
				var _this = this;
				this.container.on("click",function(event){
					var target = $(event.target);
					if(target.attr("class") == "addShopCar"){
						_this.getProInfo(target);//获取当前页面数据
						_this.saveCookie();//点击加入购物车,保存cookie
						_this.shopCarNnmChange();//购物车数量变化
					}
				})
	},
	getProInfo:function(target){
				this.imgSrc = this.currentCookie.getIMg;//路径
				this.proName = this.currentCookie.getNames;//名称
				this.proNameId = this.currentCookie.getNameId;//型号id
				this.proPrice = this.currentCookie.getPrice;//单件
				this.proReduce = this.currentCookie.getReduce;//优惠价
				this.proColorName = target.parents(".container").find(".colorCheck").find(".colorName").text();
				this.proColorId = target.parents(".container").find(".colorCheck").find(".colorName").attr("pid");
				this.proNums = target.parents(".container").find(".numInput").val();
		
	},
	saveCookie:function(){
				this.objToCookie = {
					proImg:this.imgSrc,//产品路径
					proNameVal:this.proName,//产品名称
					pNameId:this.proNameId,//产品型号id
					proColorVal:this.proColorName,//颜色值
					proId:this.proColorId,//产品颜色id
					proNum:parseInt(this.proNums),//产品数量
					proPriceVal:this.proPrice,//单件
					proDiscountVal:this.proReduce//优惠价
				};

				console.log(this.objToCookie);
				console.log(this.proCookie);
				//判断当前产品在cookie中是否存在
				var flag = 0;
				for(var i = 0; i < this.proCookie.length; i++){
					if(this.proCookie[i].pNameId == this.objToCookie.pNameId && this.proCookie[i].proId == this.objToCookie.proId){
						this.proCookie[i].proNum += this.objToCookie.proNum;
						flag = 1;
					}
				}
				if(flag == 0){
					this.proCookie.push(this.objToCookie);
				}
		//		$.cookie("proCookie", JSON.stringify(this.proCookie), {path: "/", expires: 7});
				localStorage.setItem(this.uname+"proCookie",JSON.stringify(this.proCookie));
	},
	//购物车数量改变
	shopCarNnmChange:function(){
					var sumN = 0;
					if(this.proCookie){
						//循环已经存在的cookie
						for(var i=0; i < this.proCookie.length; i++){
							sumN += this.proCookie[i].proNum;
			//				console.log(this.proCookie[i])
						}
						this.totalNum.text(sumN);
					}
					else{
						this.totalNum.text(0);
					}
	}
})
new GetPageInfo();

//评论留言
function Evaluate(){
	this.writeEva = $(".writeEva");
    this.evaWrap = $(".cloneDiv");

    this.subBtn = $(".writeEva button");
    this.txtArea = $(".writeEva textarea");
    
    this.uname = $.cookie("userName");
    console.log(this.uname);

    this.init();
}
$.extend(Evaluate.prototype,{
	init:function () {
        this.submitBut();
        this.clickStar();
    },
	//提交按钮点击事件
	submitBut:function () {
				var _this = this;
				this.subBtn.click(function () {
					var content = _this.txtArea.val();
					if(content == ""){
						return "";
					}
					var rowsEva = _this.evaWrap.clone(true);
                    rowsEva.find(".evaluate").html(content);
                    _this.writeEva.after(rowsEva);
                    _this.txtArea.val("");
//                  var evaNums = $(".evaNums");
//                 console.log(evaNums)
//                  if(!localStorage.getItem(_this.uname +"Eva")){
//                  	var brr = [];
//                  	brr.push(evaNums);
//                  	console.log(brr)
//                  	localStorage.setItem(_this.uname +"Eva",JSON.parse(brr));
//                  }else{
//                  	var getEva = localStorage.getItem(_this.uname +"Eva");
//                  	var evaArr = JSON.parse(getEva);
//                  	evaArr.push(rowsEva);
//                  	localStorage.setItem(_this.uname +"Eva",JSON.parse(evaArr));
//                  }
				})
    },
	//星星的点击事件
	clickStar:function () {
				var _this = this;
				var sStar = "★" ;
				var kStar = "☆"
				this.star = $(".evaluate-right .top ul li");
        		this.star.mouseenter(function () {
					$(this).html(sStar).prevAll().html(sStar).end().nextAll().html(kStar);
                }).mouseleave(function () {
                    _this.star.html(kStar);
                    $(".ck").html(sStar).prevAll().html(sStar);
                }).click(function () {
					$(this).addClass("ck").siblings().removeClass("ck");
                })
    }
})

new Evaluate();


}