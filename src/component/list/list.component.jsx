// lists.component.tsx
import { useDisclosure, Button } from "@chakra-ui/react";
import Modals from "./modal/modal.component";
import Tables from "./table/table.component";
import { useState } from "react";

export const Lists = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentItem, setCurrentItem] = useState(null); // 編集対象のデータ
  const [isEditMode, setIsEditMode] = useState(false); // 編集モードかどうか

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

  return (
    <div>
      <Button onClick={handleCreate}>新規作成</Button>
      <Modals
        isOpen={isOpen}
        onClose={onClose}
        isEditMode={isEditMode}
        initialData={currentItem}
      />
      <Tables onEdit={handleEdit} />
    </div>
  );
};

export default Lists;
