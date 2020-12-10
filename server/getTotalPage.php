<?php
$one = $_GET['cat_one'];
$two = $_GET['cat_two'];
$three = $_GET['cat_three'];
$pagesize = $_GET['pagesize'];

$sql = "SELECT * FROM `goods`";
if($one != 'all') $sql .= " WHERE `cat_one_id`='$one'";
if($two != 'all') $sql .= " AND `cat_two_id`='$two'";
if($three != 'all') $sql .= " AND `cat_three_id`='$three'";
$link = mysqli_connect('localhost', 'root', 'root', 'bk2004');
$res = mysqli_query($link,$sql);

$data = mysqli_fetch_all($res,MYSQLI_ASSOC);

$total = ceil(count($data) / $pagesize);

echo json_encode(array(
  "message" => "接受请求成功",
  "code" => 1,
  "total" => $total,
  "sql" => $sql

));





?>