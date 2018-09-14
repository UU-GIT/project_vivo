<?php
		header("Access-Control-Allow-Origin:*");
    header("Content-type:text/html;charset=utf-8");
       $newname = $_POST["newname"];
       $newpwd = $_POST["newpwd"];
	   $mailbox = $_POST["mailbox"];
	   
       $db = mysqli_connect('localhost',"root","root","vivo");
       mysqli_query($db,"set names utf8");
       $sql = "insert into userinfo (username,useremail,userpwd) values ('$newname','$mailbox','$newpwd')";
       $result = mysqli_query($db,$sql);
       
	   echo $result;

?>