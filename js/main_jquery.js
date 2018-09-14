//=======背景图片的定位======
var bannerImgW = $(".banner-img");
var bannerImg = $(".banner-img li img");
// console.log(bannerImgW, mainW);
var imgLeft = (bannerImg.width() - $(window).innerWidth())/2;
bannerImg.css({
    left: -imgLeft
});

//============右上角个人显示卡动画=============
var person = $("#person");
var personList = $(".person-list")
var personLi = $(".person-list>li");
person.mouseenter(function () {
    personList.stop(true).fadeIn(400);
}).mouseleave(function () {
    personList.stop(true).fadeOut(400);
    
})
if($.cookie('userName')){
		$('.getUserName').html($.cookie('userName'));
}else{
		$('.getUserName').html('请登录~');
}

//=============头部导航动画============
var menuWrap = $(".menu-wrap");
var menuList = $(".menu-wrap ul");
var hasList = $(".header-nav .hasList");
var headerCon = $(".headerCon");
//var headerNavLi = $(".header-nav>li");
hasList.mouseenter(function(){
    var index = $(this).index();

    menuWrap.stop(true).show().animate({height:245},400);
    menuList.eq(index).stop(true).show().animate({ height: 200, opacity: 1},800)
                                 .siblings().animate({height:0,opacity:0},200).hide();
//  headerCon.css("zIndex",10);
})
$('.menu-box').mouseleave(function(){
	menuWrap.stop(true).animate({height:0});
})
//menuWrap.mouseleave(function(){
//  $(this).animate({height:0});
//})
//============每张卡片鼠标移入显示加入购物车动画===========
var box = $(".box");
var prodinfo = $(".prodinfo");
var colorWrap = $(".color-wrap");

box.hover(function(){
    $(this).find(".color-wrap").stop(true).fadeIn(500);
    $(this).find(".prodinfo").stop(true).fadeOut(500);
    // console.log(this)
},function(){
    $(this).find(".color-wrap").stop(true).fadeOut(500);
    $(this).find(".prodinfo").stop(true).fadeIn(500);
})

//=============选项卡切换=============
//私有化变量
function bannerTab(tabObj) {
    this.sideNav = tabObj.sideNav;
    this.sideLi = tabObj.sideLi;//所有tabli的组合
    this.catalog = tabObj.catalog;//所有内容的组合
    this.index = 0;
    this.init();
}
//初始化方法
bannerTab.prototype.init = function(){
    this.tabLiHover();
}
//侧边导航鼠标移入
bannerTab.prototype.tabLiHover = function(){
    var _this = this;

    this.sideLi.hover(function(){
        $(this).addClass("hover").siblings().removeClass("hover");
        _this.index = $(this).index();
        // console.log(_this.index);
        _this.catalog.eq(_this.index).show();
    },function(){
        _this.catalog.hide();
        _this.sideLi.removeClass("hover");
    })
}

var tabObj = {
    sideNav: $(".side-nav"),
    sideLi:  $(".side-nav>li"),
    catalog: $(".catalog")
}
new bannerTab(tabObj);

//===============背景轮播动画===============
function bannerWheel(bannerObj) {
    this.bannerImg = bannerObj.bannerImg;
    this.imgLi = bannerObj.imgLi;//图片列表
    this.thumbList = bannerObj.thumbList;
    this.thumbLi = bannerObj.thumbLi;//下方按钮列表
    this.thumbLiP = bannerObj.thumbLiP;
    this.thumbLiSpan = bannerObj.thumbLiSpan;
    this.timer = null;
    this.index = 0;
    this.init();
    // console.log(this.thumbLiP);
}
//初始化方法
bannerWheel.prototype.init = function(){
    this.thumbLiSpan.eq(this.index).stop(true,true).animate({height:3});
    this.thumbLiP.eq(this.index).stop(true,true).animate({width:42},2000);
    this.autoPlay();
    this.moveInOut();
    this.mouseInLine();
}
//自动轮播
bannerWheel.prototype.autoPlay = function(){
    // this.indexChange();
    this.timer = setInterval(function(){
        this.indexChange();
    }.bind(this),3000)
}
//轮播循环index处理
bannerWheel.prototype.indexChange = function(){
    
    if (this.index == this.imgLi.size() - 1) {
        this.index = 0;
    }else{
        this.index++;
    }
    this.animateImg(this.index);
} 
//鼠标移入移出
bannerWheel.prototype.moveInOut = function (){
    var _this = this;
    this.bannerImg.mouseenter(function(){
        clearInterval(_this.timer);
    }).mouseout(function(){
        _this.autoPlay();
    })
}
//鼠标移入图片下方的线条
bannerWheel.prototype.mouseInLine = function(){
    var that = this;
    this.thumbLi.hover(function(){
        var _index = $(this).index();//保存当前的index
        that.animateImg(_index);
        // clearInterval(_this.timer);
        that.index = _index;
    })
}
//图片和图片下方的线条的动画
bannerWheel.prototype.animateImg = function(inNum){
    //图片轮播
    // this.imgLi.eq(inNum).stop(true,true).animate({opacity:1},2000)
    //                     .siblings().stop(true,true).animate({opacity:0},2000);
    
    // this.thumbLi.animate({height:2,top:0});
    // this.thumbLiP.css("width",0);
    // this.thumbLi.eq(inNum).stop(true,true).animate({height:5,top:-3});
    // this.thumbLiP.eq(inNum).stop(true,true).animate({width:42},2000);
              
    //下方线条轮播
    this.imgLi.eq(inNum).stop(true,true).animate({opacity:1},2000)
                        .siblings().stop(true,true).animate({opacity:0},2000);
    
    this.thumbLiSpan.stop(true,true).animate({height:0});
    this.thumbLiP.stop(true,true).animate({width:0});
    
    this.thumbLiSpan.eq(inNum).stop(true,true).animate({height:3});
    this.thumbLiP.eq(inNum).stop(true,true).animate({width:42},2000);
}

var bannerObj = {
    bannerImg: $(".banner-img"),
    imgLi: $(".banner-img>li"),
    thumbList: $(".thumb-list"),
    thumbLi: $(".thumb-list>li"),
    thumbLiP: $(".thumb-list p"),
    thumbLiSpan: $(".thumb-list span")
}
new bannerWheel(bannerObj);


//=========侧边回到顶部动画=======
var toTop = $("#toTop");
var tipLi = $(".fix-list>ul>li");
var prompt = $(".prompt");

tipLi.mouseenter(function(){
    var pindex = $(this).index();
    prompt.hide();
    prompt.eq(pindex).show();
}).mouseleave(function(){
    prompt.hide();
})

$(window).scroll(function(){
    var scrollTopVal = $(window).scrollTop();//滚走的距离
    if (scrollTopVal > 500){
        toTop.show();
    }else{
        toTop.hide();
    }
    toTop.click(function(){
        $("html,body").stop(true).animate({scrollTop:0},1000);
    })
})

//==========搜索框动画=============
var searchBtn = $("#searchBtn");
var searchImg = $(".searchImg");
var headerNav = $(".header-nav");
var searchInput = $(".search-input>input");
var searchClose = $(".search-input>a");
var searchConnect = $(".search-connect");
var searchList = $(".search-connect>dl");

//点击搜索按钮
searchBtn.click(function(){
    headerNav.stop(true).hide(600);//导航隐藏
    searchInput.show(400).focus().next().show(400);//input框和关闭按钮显示
    searchImg.stop(true).animate({right:140},400);//搜索按钮左移
    searchConnect.stop(true).animate({opacity:1,zIndex:50},400);//下拉内容透明度1
    searchList.stop(true).slideDown(1000);//下拉列表展示
    
})
//点击关闭按钮
function searchClick(){
    searchClose.click(function(){
        searchConnect.animate({opacity:0,zIndex:-1});//下拉内容透明
        searchList.slideUp();//下拉列表收起
        searchInput.hide().next().hide();//input框和关闭按钮隐藏
        headerNav.stop(true).fadeIn(400);//导航隐藏
        searchImg.stop(true).animate({right:95},400);//搜索按钮恢复原位
    })
}
searchClick();

//点击其他地方
// $(window).click(function(){
//     searchClick();
// })

//============购物车下方固定=========
// var winH = $(window).innerHeight();
// var cartToolbarH = $(".cart-toolbar-wrap").innerHeight();
// var cartToolbarT = $(".cart-toolbar-wrap").offset().top;
// console.log(cartToolbarH, cartToolbarT);
// if (cartToolbarT > winH - cartToolbarH){

// }

// $(window).scroll(function(){
// 	var scrollTop = $(window).scrollTop();
// })
