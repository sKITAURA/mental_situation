import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  Stack,
  Radio,
} from "@chakra-ui/react";
import axios from "axios";
import { useRef, useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
const Modals = ({ isOpen, onClose, isEditMode, initialData }) => {
  const [selectedOption, setSelectedOption] = useState("普通"); // 初期値を「普通」に設定
  const [reason, setReason] = useState(""); // 理由
  const [solution, setSolution] = useState(""); // 改善方法
  const initialRef = useRef(null); // Input の ref
  const finalRef = useRef(null);

  // モーダルが開いたときに初期値をセット
  useEffect(() => {
    if (isOpen) {
      if (isEditMode && initialData) {
        // 編集モードの場合、初期値をセット
        // eslint-disable-next-line react/prop-types
        setSelectedOption(initialData.state);
        // eslint-disable-next-line react/prop-types
        setReason(initialData.reason);
        // eslint-disable-next-line react/prop-types
        setSolution(initialData.solution);
      } else {
        // 新規作成の場合、フィールドをリセット
        setSelectedOption("普通");
        setReason("");
        setSolution("");
      }
    }
  }, [isOpen, isEditMode, initialData]);

  const handleSend = async () => {
    // 送信処理
    const data = {
      state: selectedOption,
      reason: reason,
      solution: solution,
    };

    try {
      // eslint-disable-next-line react/prop-types
      if (isEditMode && initialData && initialData.id) {
        // 編集の場合はPUTリクエスト
        const response = await axios.post(
          // eslint-disable-next-line react/prop-types
          `http://localhost:81/api/update_mental_data/${initialData.id}`,
          data
        );
        console.log("更新成功", response.data);
      } else {
        // 新規作成の場合はPOSTリクエスト
        const response = await axios.post(
          "http://localhost:81/api/new_situation_data/",
          data
        );
        console.log("作成成功", response.data);
      }
    } catch (error) {
      console.log("送信失敗", error);
    }

    onClose(); // モーダルを閉じる
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isEditMode ? "編集" : "新規作成"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormLabel fontSize={"large"}>状態の選択</FormLabel>
          <RadioGroup onChange={setSelectedOption} value={selectedOption}>
            <Stack direction="column" pb={4}>
              <Radio value="非常に良い">非常に良い</Radio>
              <Radio value="良い">良い</Radio>
              <Radio value="普通">普通</Radio>
              <Radio value="悪い">悪い</Radio>
              <Radio value="非常に悪い">非常に悪い</Radio>
            </Stack>
          </RadioGroup>

          <FormControl>
            <FormLabel>メンタルが上下した理由</FormLabel>
            <Input
              ref={initialRef}
              placeholder="理由を書く"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>改善方法</FormLabel>
            <Input
              placeholder="改善方法を書く"
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSend}>
            送信
          </Button>
          <Button onClick={onClose}>キャンセル</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Modals;
