// lists.component.jsx
import { useDisclosure, Button } from "@chakra-ui/react";
import Modals from "./modal/modal.component";
import Tables from "./table/table.component";
import { useState } from "react";

export const Lists = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentItem, setCurrentItem] = useState(null); // 編集対象のデータ
  const [isEditMode, setIsEditMode] = useState(false); // 編集モードかどうか
  const [data, setData] = useState([
    {
      id: 1,
      date: "2024/10/01",
      state: "良い",
      reason: "タスクが多かった",
      solution: "何かをする",
    },
    {
      id: 2,
      date: "2024/10/02",
      state: "普通",
      reason: "十分な休息を取った",
      solution: "運動を増やす",
    },
  ]);

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
