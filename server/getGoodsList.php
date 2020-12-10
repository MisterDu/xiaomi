<?php

$one = $_GET['cat_one'];
$two = $_GET['cat_two'];
$three = $_GET['cat_three'];
$method = $_GET['sort_method'];
$type = $_GET['sort_type'];
$current = $_GET['current'];
$pagesize = $_GET['pagesize'];

$sql = "SELECT * FROM `goods`";
if($one != 'all') $sql .= " WHERE `cat_one_id`='$one'";
if($two != 'all') $sql .= " AND `cat_two_id`='$two'";
if($three != 'all') $sql .= " AND `cat_three_id`='$three'";
if($method == '综合') $sql .= " ORDER BY `goods_id` $type";
if($method == '价格') $sql .= " ORDER BY `goods_price` $type";

$start = ($current - 1) * $pagesize;
$sql .= " LIMIT $start, $pagesize";

$link = mysqli_connect('127.0.0.1', 'root', 'root', 'bk2004');
$res = mysqli_query($link,$sql);
$data = mysqli_fetch_all($res,MYSQLI_ASSOC);

echo json_encode(array(
  "message" => "获取商品列表成功",
  "current" => $current,
  "code" => 1,
  "list" => $data,
  "sql" => $sql,
))






?>