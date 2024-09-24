import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
} from "@chakra-ui/react";
export const Tables = () => {
  return (
    <>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <TableCaption></TableCaption>
          <Thead>
            <Tr>
              <Th>日付</Th>
              <Th>メンタルの状態</Th>
              <Th>理由</Th>
              <Th>改善方法</Th>
              <Th>編集・削除</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>2024/10/01</Td>
              <Td>良い</Td>
              <Td>タスクが多かった</Td>
              <Td>何かをする</Td>
              <Td>
                <Button colorScheme="blue" size="sm" onClilck="">
                  編集
                </Button>
              </Td>
              <Td>
                <Button colorScheme="red" size="sm" onClilck="" ml={-5}>
                  削除
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
export default Tables;
