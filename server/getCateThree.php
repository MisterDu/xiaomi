<?php

$one = $_GET['cat_one'];
$two = $_GET['cat_two'];

$link = mysqli_connect('127.0.0.1', 'root', 'root', 'bk2004');
$sql = "SELECT `cat_three_id` FROM `goods` WHERE `cat_one_id`='$one' AND `cat_two_id`='$two' GROUP BY `cat_three_id`";
$res = mysqli_query($link,$sql);
$data = mysqli_fetch_all($res,MYSQLI_ASSOC);

echo json_encode(array(
  "message" => "获取三级菜单成功",
  "code" => 1,
  "list" => $data,
  "sql" => $sql
))





?>