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
const Modals = ({ isOpen, onClose, isEditMode, initialData, onDataUpdate }) => {
  const [selectedOption, setSelectedOption] = useState("普通");
  const [reason, setReason] = useState("");
  const [solution, setSolution] = useState("");
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      if (isEditMode && initialData) {
        // eslint-disable-next-line react/prop-types
        setSelectedOption(initialData.state);
        // eslint-disable-next-line react/prop-types
        setReason(initialData.reason);
        // eslint-disable-next-line react/prop-types
        setSolution(initialData.solution);
      } else {
        setSelectedOption("普通");
        setReason("");
        setSolution("");
      }
    }
  }, [isOpen, isEditMode, initialData]);

  const handleSend = async () => {
    const data = {
      state: selectedOption,
      reason: reason,
      solution: solution,
    };

    try {
      let response;
      // eslint-disable-next-line react/prop-types
      if (isEditMode && initialData && initialData.id) {
        response = await axios.post(
          // eslint-disable-next-line react/prop-types
          `http://localhost:81/api/update_mental_data/${initialData.id}`,
          data
        );
        console.log("更新成功", response.data);
      } else {
        response = await axios.post(
          "http://localhost:81/api/new_mental_data/",
          data
        );
        console.log("作成成功", response.data);
      }

      // 更新または作成が成功した場合に新しいデータを反映
      onDataUpdate(response.data);
      onClose();
    } catch (error) {
      console.log("送信失敗", error);
    }
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
