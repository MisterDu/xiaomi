<?php
//接受数据
$id = $_GET['goods_id'];
$link = mysqli_connect('127.0.0.1', 'root', 'root', 'bk2004');
$sql = "SELECT * FROM `goods` WHERE `goods_id`='$id'";
$res = mysqli_query($link,$sql);
$data = mysqli_fetch_all($res,MYSQLI_ASSOC);
echo json_encode(array(
  "message" => "接受商品信息请求成功",
  "code" => 1,
  "info" => $data[0],

))





?>