import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  Stack,
  Radio,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

export const Modals = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleSend = () => {}; //TODO
  const [selectedOption, setSelectedOption] = useState("普通"); // 初期値を「普通」に設定
  const [reason, setReason] = useState(""); // 理由
  const [solution, setSolution] = useState(""); // 改善方法
  const initialRef = useRef(null); // Input の ref
  const finalRef = useRef(null);

  return (
    <>
      <Button onClick={onOpen} color="green">
        新規登録
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>新規作成</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormLabel fontSize={"large"}>状態の選択</FormLabel>
            <RadioGroup
              onChange={setSelectedOption}
              value={selectedOption}
              defaultValue="普通"
            >
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
            <Button colorScheme="blue" mr={3} onClick={() => handleSend()}>
              送信
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
