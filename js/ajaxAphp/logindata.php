<?php
		header("Access-Control-Allow-Origin:*");
    header("Content-type:text/html;charset=utf-8");
       $username = $_POST["username"];
       $userpwd = $_POST["userpwd"];
	   
       $db = mysqli_connect('localhost',"root","root","vivo");
       mysqli_query($db,"set names utf8");
	   
       $sql = "select * from userinfo where username='$username'";
	   $result = mysqli_query($db,$sql);
	   $arr = mysqli_fetch_array($result);
//	   print_r($arr);
	   /*
	    * [0] => 16
	   	  [userid] => 16
	      [1] => 123456
	      [username] => 123456
	      [2] => 123456@qq.com
	      [useremail] => 123456@qq.com
	      [3] => 123456
	      [userpwd] => 123456
	    * */
       if($username == $arr["username"] || $username == $arr["useremail"]){
           if($userpwd == $arr["userpwd"]){
           		$arrInfo[] = array("success"=>1,"username"=>$username);
                echo json_encode($arrInfo);//登录成功
           }else{
                echo 0;//账号密码有误
           }
       }else{
           echo 2;//账号有误
       }

?>