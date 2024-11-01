<?php
// データベース接続情報
$servername = "localhost"; // サーバー名（リモートの場合はホスト名を変更）
$username = "your_username"; // MySQLのユーザー名
$password = "your_password"; // MySQLのパスワード
$dbname = "mental_data"; // データベース名

// データベース接続の作成
$conn = new mysqli($servername, $username, $password, $dbname);

// 接続の確認
if ($conn->connect_error) {
    die("接続に失敗しました: " . $conn->connect_error);
}
echo "データベースに接続しました。<br>";

// データの取得
$sql = "SELECT * FROM `situation-table`";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // データを表示
    while($row = $result->fetch_assoc()) {
        echo "日付: " . $row["date"] . " - 状況: " . $row["situation"] . " - 理由: " . $row["reason"] . " - 改善方法: " . $row["solution"] . "<br>";
    }
} else {
    echo "データが見つかりませんでした。";
}

// 接続を閉じる
$conn->close();
?>