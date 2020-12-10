<?php


$link = mysqli_connect('127.0.0.1', 'root', 'root', 'bk2004');
$sql = 'SELECT `cat_one_id` FROM `goods` GROUP BY `cat_one_id`';
$res = mysqli_query($link,$sql);
$data = mysqli_fetch_all($res,MYSQLI_ASSOC);
mysqli_close($link);
echo json_encode(array(
  "message" => "接受请求成功",
  "code" => 1,
  "list" => $data
));




?>