
//用户名表单验证
//用户名为6-30，由字母，数字，下划线，不能以下划线开头和结尾
var newname = $("#newname");
var newpwd = $("#newpwd");
var signBtn = $("#signBtn");
var oInput = $(".signForm>input");
var signForm = $(".signForm");
var nameReqLi = $("#nameReq>li");
var pwdReqLi = $("#pwdReq>li");
var codeReqLi = $("#codeReq>li");
//给所有的input一个失去焦点的事件
oInput.blur(function(){
    //用户名验证
    if ($(this).attr("id") == "newname"){
        var nameValue = $(this).val();
        var regName = /^[a-zA-Z\d]\w{1,13}[a-zA-Z\d]$/;
        if (regName.test(nameValue)) {
            nameReqLi.hide();
            nameReqLi.eq(2).show();
        }else{
            nameReqLi.hide();
            nameReqLi.eq(1).show();
        }
    }
    //密码验证
    if ($(this).attr("id") == "newpwd"){
        var pwdValue = $(this).val();
        var regPwd = /^([a-zA-Z0-9]|\d)[a-z0-9_-]{5,17}$/;
        if (regPwd.test(pwdValue)){
            pwdReqLi.hide();
            pwdReqLi.eq(2).show();
        }else{
            pwdReqLi.hide();
            pwdReqLi.eq(1).show();
        }
    }
    //二维码验证
    if ($(this).attr("id") == "verCode") {
        var codeValue = $(this).val();
        var randCode = $(".randCode").html().toLowerCase();
        console.log(randCode);
        if (codeValue == randCode) {
            codeReqLi.hide();
            codeReqLi.eq(1).show();
        } else {
            codeReqLi.hide();
            codeReqLi.eq(0).show();
        }
    }
})


//邮箱验证
var getMail = $(".getMail");
var slideList = $("#slideList");
var mailReqLi = $("#mailReq>li");

$('#mailbox').on({
	'input':function(){
			var tarVal = $(this).val();
			slideList.show();
			if(tarVal.indexOf("@") == -1){//如果里面没有@符号
				getMail.text(tarVal);
			}else{
				var endVal = tarVal.substring(0,tarVal.indexOf("@"));		
				getMail.text(endVal);
			}
	},
	'blur':function(){
			slideList.hide(600);
			var mailReq = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
			if(mailReq.test($(this).val())){
				mailReqLi.hide();
				mailReqLi.eq(2).show();
			}else{
				mailReqLi.hide();
				mailReqLi.eq(1).show();
			}
	}
})

$('#slideList>li').on('click',function(){
	 // console.log(this.innerText);
	 $('#mailbox').val(this.innerText);

	 var mailReq = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
	 console.log(this.innerText);
	 if(mailReq.test(this.innerText)){
	 	mailReqLi.hide();
	 	mailReqLi.eq(2).show();
	 }else{
	 	mailReqLi.hide();
	 	mailReqLi.eq(1).show();
	 }
 })



//随机验证码
function getRandNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function verification(num) {
    if (num < 0) {
        return;
    }
    var verif = new String();
    for (var i = 0; i < num; i++) {
        var randNum = getRandNum(48, 122);
        var ch = String.fromCharCode(randNum);
        //确保验证码是由数字（48-57），大写（65-90），小写字母（97-122）组成
        if (randNum >= 48 && randNum <= 57 || randNum >= 65 && randNum <= 90 || randNum >= 97 && randNum <= 122) {
            verif += ch;
        } else {
            i--;
        }
    }
    return verif;
}

var randCode = $(".randCode");
var getRand = verification(6);
randCode.html(getRand);


//直接登录,php与后台数据库数据进行比对
var username = $("#username");
var userpwd = $("#userpwd");
var logoBtn = $("#logo-web");

logoBtn.click(function(){
    $.ajax({
        url:"js/ajaxAphp/logindata.php",
        type:"POST",
        data:{
            username:username.val(),
            userpwd:userpwd.val()
        },
        success: function(res){
            var result = JSON.parse(res);
            console.log(result);//[{success: "1", username: "123"}]
            if(result == 2){
            	alert("账号不存在,请注册");
    			username.val("");
    			userpwd.val("");	
            }else if(result == 0){
            	alert("密码有误,请重新登录");
    			userpwd.val("");
            }else if(result[0].success == 1){
            	var uName = result[0].username;
            	$.cookie("userName",uName,{path: "/", expires: 1})
            	location.href = "index_vivo.html";
            }
        }
    })
})

//账号注册
var check = $("#check");
var mustCk = $("#mustCk>li");
var verCode = $("#verCode");
var mailbox = $("#mailbox");
// console.log(check.prop("checked"))
signBtn.click(function(){
    if (newname.val() == "" ){
        nameReqLi.hide();
        nameReqLi.eq(3).show();
    } else if(mailbox.val() == ""){
    	mailReqLi.hide();
        mailReqLi.eq(3).show();
    }else if (newpwd.val() == ""){
        pwdReqLi.hide();
        pwdReqLi.eq(3).show();
    } else if (verCode.val() == ""){
        codeReqLi.hide();
        codeReqLi.eq(2).show();
    } else if (check.prop("checked") == false){
//      console.log(check.prop("checked"));
        mustCk.show();
    }else{
		mustCk.hide();
    	console.log(mailbox.val());
        $.ajax({
            type:"POST",
            url:"js/ajaxAphp/signdata.php",
            data:{
                newname:newname.val(),
                newpwd:newpwd.val(),
                mailbox:mailbox.val()
            },
            success:function(res){
                if(res == "1"){
                    alert("注册成功,请登录");
                    location.href = "logoin.html"
                }else{
                    alert("注册失败,请重新注册");
    //				loginBox.hide();
    //  			signBox.show();
                }
            }
        });
    }
})