<?php
$a = array("Jan" => "0", "Feb" => "0", "Mar" => "0", "Apr" => "0", "May" => "487", "Jun" => "0", "Jul" => "0", "Aug" => "0", "Sep" => "0", "Oct" => "0", "Nov" => "0", "Dec" => "0");
$tempArray = "[";
foreach ($a as $key => $value) {
  $tempArray .= "['$key', $value]";
}
$tempArray .= "]";

echo  json_encode($tempArray, true);
