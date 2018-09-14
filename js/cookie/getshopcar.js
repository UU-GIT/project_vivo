
//=========购物车页面数据获取
function GetCookieInfo(){
	this.prodListWrap = $(".prod-list-wrap");
//	this.getCookie = $.cookie("proCookie");//获取cookie
	this.uname = $.cookie("userName");
	this.getCookieInfo = JSON.parse(localStorage.getItem(this.uname+"proCookie"));//转为数组对象
	
	this.init();
	
	console.log(this.getCookieInfo);
}
$.extend(GetCookieInfo.prototype,{
	init:function(){
		 this.getCookieFn();
		 this.pageClick();
		 this.checkedAll();
		 this.deleteSelectFn();
	},
	//获取cookie数据渲染到页面
	getCookieFn:function(){
				this.tabStr = "";
			    for (var i = 0; i < this.getCookieInfo.length; i++) {
			    	var totleReduce = 200 * this.getCookieInfo[i].proNum;
			    	
			    	var initTolPrice = this.getCookieInfo[i].proNum * this.getCookieInfo[i].proPriceVal.substr(1) - totleReduce;
			    	
			        this.tabStr += `<table class="order-table rowTable">
			                        <tr class="prod-line">
			                            <td class="check-col">
			                                <input type="checkbox" name="ck" id="">
			                            </td>
			                            <td class="prod-pic">
			                                <a href="javascript:void(0)">
			                                    <div class="figure">
			                                        <img src="${this.getCookieInfo[i].proImg}" alt="">
			                                    </div>
			                                </a>
			                            </td>
			                            <td class="goods-col">
			                                <a href="products.html?pNameId=${this.getCookieInfo[i].pNameId}&proId=${this.getCookieInfo[i].proId}" class="getName" pNameId="${this.getCookieInfo[i].pNameId}">${this.getCookieInfo[i].proNameVal}</a>
			                                <p class="getColor" proId="${this.getCookieInfo[i].proId}" >颜色：${this.getCookieInfo[i].proColorVal}</p>
			                                <p> 选择手机服务</p>
			                            </td>
			                            <td class="price-col">${this.getCookieInfo[i].proPriceVal}</td>
			                            <td>
			                                <span class="number-box">
			                                    <a href="javascript:void(0)" class="reduce-num">-</a>
			                                    <input type="text" readonly="readonly" class="prod-num" value= "${this.getCookieInfo[i].proNum}" />
			                                    <a href="javascript:void(0)" class="add-num">+</a>
			                                </span>
			                            </td>
			                            <td class="reducePri">-${totleReduce}</td>
			                            <td class="J-Vcoin">${initTolPrice}</td>
			                            <td class="total-price">${initTolPrice}.00</td>
			                            <td>
			                                <p><a href="javascript:void(0)">加入收藏夹</a></p>
			                                <p><a href="javascript:void(0)" class="deletePro">删除</a></p>
			                            </td>
			                        </tr>
			                    </table>`;
			    }
			    this.prodListWrap.html(this.tabStr);//拼接到页面
			
//			    this.bottomTotalPrice();//底部总量计算
	},
	//事件委托页面点击事件
	pageClick:function(){
				var _this = this;
				this.prodListWrap.on("click",function(event){
					var target = $(event.target);
					
					_this.numAndTotle (target);//数量和总金额函数
				    _this.deleteDate(target);//删除函数
				    _this.bottomTotalPrice();//底部总金额和数量
				    
				    
					//循环每个表格
					if(target.attr("name") == "ck"){
						_this.rowTable.each(function(index,item){
					    	if($(item).hasClass("checked")){
					    		_this.checkBox.prop("checked",true);
					    	}else{
					    		_this.checkBox.prop("checked",false);
					    	}
					    })
					}
					
				})
	},
	
	//数量加减和总金额函数
	numAndTotle:function(target){
				var price =  target.parent().parent().siblings(".price-col").text();//$1998.00
			    var priceStr = price.substr(1);//1998

			   //数量-
			    if(target.attr("class") == "reduce-num"){
			    	var redNum = target.next().val();
			        if (redNum <= 1){
			            redNum = 1;
			        } else {
			            redNum--;
			        }
			        target.next().val(redNum);//数量
			        this.cookieNumChange(target,redNum);//重写cookie
			        
			      	target.parents(".prod-line").find(".reducePri").text(-redNum*200);//减少金额
			         
			        var reduce = target.parents(".prod-line").find(".reducePri").text();//减少的金额
			        //总金额的计算
					var totleVal = eval(redNum * priceStr + reduce);//总金额
				    var totleStr = totleVal + ".00";
				    target.parent().parent().siblings(".J-Vcoin").text(totleVal);//积分
				    target.parent().parent().siblings(".total-price").text(totleStr);//总金额
				    
			    }
			    
			    //数量+ 
			    if(target.attr("class") == "add-num"){
			    	var addNum = target.prev().val();
			        if (addNum >= 100){
			            addNum = 100;
			        } else {
			            addNum++;
			        }
			        target.prev().val(addNum);
			       
			        this.cookieNumChange(target,addNum);//重写cookie
			        
			        target.parents(".prod-line").find(".reducePri").text(-addNum*200);//减少金额
			        
			        var reduce = target.parents(".prod-line").find(".reducePri").text();//减少的金额
			         //总金额的计算
			        var totleVal = eval(addNum * priceStr + reduce);//总金额
				    var totleStr = totleVal + ".00";
				    target.parent().parent().siblings(".J-Vcoin").text(totleVal);//积分
				    target.parent().parent().siblings(".total-price").text(totleStr);//总金额
				    
			    }
	},
	//循环cookie数据,与上面数量对应
	cookieNumChange:function(target,Nums){
					this.currNameId = target.parents(".rowTable").find(".getName").attr("pNameId");
			        this.currColorId = target.parents(".rowTable").find(".getColor").attr("proId");
//					console.log(Nums)
					for(var i = 0; i < this.getCookieInfo.length; i++){
						if(this.getCookieInfo[i].pNameId == this.currNameId && this.getCookieInfo[i].proId == this.currColorId){
							this.getCookieInfo[i].proNum = Nums;
							this.getCookieInfo[i].proDiscountVal = Nums*200;
						}
						
					}
					
					localStorage.setItem(this.uname+"proCookie",JSON.stringify(this.getCookieInfo));
	},
	//删除数据函数
	deleteDate:function(target){
			    if(target.attr("class") == "deletePro"){
			        var tabIndex = target.parents(".order-table").index();
			        target.parents(".order-table").remove();
			
			        //同时删除cookie中的数据，并重新写入
			        this.getCookieInfo.splice(tabIndex,1);
			        // console.log(getCookieInfo);
			        var newCookieStr = JSON.stringify(this.getCookieInfo);
//			        $.cookie("proCookie",newCookieStr,{path:"/",expires:1});
			        localStorage.setItem(this.uname+"proCookie",newCookieStr);
    			}
			    
   				this.bottomTotalPrice();//重新计算底部数据
	},
	//底部总金额和数量
	bottomTotalPrice:function(){
//				    this.prodNum = $(".prod-num");//每行总件数
//				    this.totalPrice = $(".total-price");//每行总金额
				    this.price = $(".price");//底部总金额
				    this.reducePri = $(".reducePri");//每行优惠金额
				    this.descTotle = $(".desc-totle");//底部括号里金额变化
				    this.bottomTotal = $(".num");//底部总件数
				    this.descReduce = $(".desc-reduce");//底部括号里，优惠金额
				    
				    this.inputChecked = $(".checked");
				    
				    //===将所有选中的table下的金额循环相加
				    var rowsTotlePrice = this.inputChecked.find(".total-price");
				    var sumPir = 0;
				    rowsTotlePrice.each(function (index,item) {
				        sumPir = eval( sumPir + "+" +$(item).text());
				    })
				    var sumStr = "¥" + sumPir;
				    this.price .text(sumStr);//底部总金额
				    this.descTotle.text(sumStr);//括号里数字变化
				
				    //===将所有的数量循环相加
				    var rowsTotleNum = this.inputChecked.find(".prod-num");
				    var sumNum = 0;
				    rowsTotleNum.each(function (index,item) {
				        sumNum = eval(sumNum + "+" + $(item).val());//这里是input，要用val()
				    })
				    this.bottomTotal.text(sumNum);//总件数共计
				
				    //===底部括号里，优惠金额
				    var rowsTotleRedu = this.inputChecked.find(".reducePri");
				    var sumReduce = 0;
				    rowsTotleRedu.each(function (index,item) {
				        sumReduce = eval( sumReduce + "+" +$(item).text());
				    })
				    var sumReduceStr = "¥" + sumReduce;
				    this.descReduce.text(sumReduceStr);//总金额
				    
	},
	//全选操作
	checkedAll:function() {
				var _this = this;
				this.table = $('.order-table')
			    this.inputAll = $("input[name='ck']");
			    this.checkBox = $(".checkbox"); //上下全选框
			    
			    $("input[type='checkbox']").prop("checked","checked");
			    $(".rowTable").addClass("checked");
			    _this.bottomTotalPrice();//重新计算底部数据
			    
			    this.checkBox.click(function () {
			        var flag = $(this).prop("checked");
			        _this.inputAll.prop("checked",flag);
			        if(flag){
			        	_this.table.addClass("checked");
			        }else{
			        	_this.table.removeClass("checked")
			        }
			        _this.bottomTotalPrice();//重新计算底部数据
			    });
			    
			    // 当被选中时 该行 order-table 添加 checked 类
			    this.table.on('click',function(){
			    	if ($(event.target).attr('name') == 'ck') {
			    		$(this).toggleClass('checked')
			    	}
			    })
			    
	},
	//删除选中商品操作
	deleteSelectFn:function(){
					var _this = this;
					this.deleteSelect = $(".deleteSelect");
				    this.rowTable = $(".rowTable");
				    this.selectInput = $("input[seclect='yes']");
				    this.checkAll1 = $(".checkAll1");
				    this.checkAll2 = $(".checkAll2");
					this.getOrderTab = null;
					
					this.deleteSelect.on("click",function () {
//						var target = $(event.target);
				        //如果选中的是单行（非全选）
				        
//				        console.log(_this.inputChecked);		        
				        _this.inputChecked.each(function(index,item){

							var rowsName = $(item).find(".getName").attr("pnameid");
			        		var rowsColor = $(item).find(".getColor").attr("proid");
			        		console.log(rowsName,rowsColor);
			        		
			        		for(var i = 0; i < _this.getCookieInfo.length; i++){
			        			
								if(_this.getCookieInfo[i].pNameId == rowsName && _this.getCookieInfo[i].proId == rowsColor){
									_this.getCookieInfo.splice(i,1);
								}
							}
			        		localStorage.setItem(this.uname+"proCookie",JSON.stringify(_this.getCookieInfo));
							$(item).remove();
				        })
				   
				        _this.bottomTotalPrice();//重新计算底部数据
				   })
	}
})

new GetCookieInfo();






