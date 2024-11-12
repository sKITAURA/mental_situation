import { useDisclosure, Button } from "@chakra-ui/react";
import Modals from "./modal/modal.component";
import Tables from "./table/table.component";
import { useState, useEffect } from "react";
import axios from "axios";

export const Lists = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentItem, setCurrentItem] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:81/api/mental_data");
        setData(response.data);
      } catch (error) {
        console.error("データの取得に失敗しました:", error);
      }
    };

    fetchData();
  }, []);

  // 新規作成ボタンが押されたとき
  const handleCreate = () => {
    setCurrentItem(null);
    setIsEditMode(false);
    onOpen();
  };

  // 編集ボタンが押されたとき
  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsEditMode(true);
    onOpen();
  };

  // データの追加または更新後に状態を更新
  const handleDataUpdate = (updatedItem) => {
    if (isEditMode) {
      setData((prevData) =>
        prevData.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        )
      );
    } else {
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
        onDataUpdate={handleDataUpdate} // モーダルにデータ更新関数を渡す
      />
      <Tables onEdit={handleEdit} data={data} setData={setData} />
    </div>
  );
};

export default Lists;
