import { useDisclosure, Button } from "@chakra-ui/react";
import Modals from "./modal/modal.component";
import Tables from "./table/table.component";
import { useState, useEffect } from "react";
import axios from "axios"; // axiosを使用してリクエストを行う

export const Lists = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentItem, setCurrentItem] = useState(null); // 編集対象のデータ
  const [isEditMode, setIsEditMode] = useState(false); // 編集モードかどうか
  const [data, setData] = useState([]); // 初期値を空配列に変更

  useEffect(() => {
    const fetchData = async () => {
      try {
        // FuelPHPサーバーからデータをGETリクエストで取得
        const response = await axios.get("http://localhost:81/api/get_data"); // FuelPHPのAPIエンドポイントに合わせてURLを設定
        setData(response.data); // 取得したデータをステートにセット
      } catch (error) {
        console.error("データの取得に失敗しました:", error);
      }
    };

    fetchData(); // データの取得関数を呼び出し
  }, []); // 初回レンダー時のみ実行するために空の依存配列を設定

  // 新規作成ボタンが押されたとき
  const handleCreate = () => {
    setCurrentItem(null); // 新規作成なのでデータは空
    setIsEditMode(false); // 編集モードをオフ
    onOpen(); // モーダルを開く
  };

  // 編集ボタンが押されたとき
  const handleEdit = (item) => {
    setCurrentItem(item); // 編集対象のデータをセット
    setIsEditMode(true); // 編集モードをオン
    onOpen(); // モーダルを開く
  };

  // データの追加または更新後に状態を更新
  const handleDataUpdate = (updatedItem) => {
    if (isEditMode) {
      // 編集モードの場合はデータを更新
      setData((prevData) =>
        prevData.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        )
      );
    } else {
      // 新規作成の場合はデータを追加
      setData((prevData) => [...prevData, updatedItem]);
    }
  };

  return (
    <div>
      <Button onClick={handleCreate}>新規作成</Button>
      <Modals
        isOpen={isOpen}
        onClose={onClose}
        isEditMode={isEditMode}
        initialData={currentItem}
        onDataUpdate={handleDataUpdate} // 追加
      />
      <Tables onEdit={handleEdit} data={data} setData={setData} />
    </div>
  );
};

export default Lists;
