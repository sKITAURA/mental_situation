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
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th isNumeric>日付</Th>
              <Th>メンタルの状態</Th>
              <Th>理由</Th>
              <Th>改善方法</Th>
              <Th>編集・削除</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
              <Td>25.4</Td>
              <Td>
                <Button colorScheme="blue" size="sm" onClilck="">
                  編集
                </Button>
              </Td>
              <Td>
                <Button colorScheme="red" size="sm" onClilck="">
                  削除
                </Button>
              </Td>
            </Tr>
            <Tr>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
              <Td isNumeric>30.48</Td>
              <Td>30.48</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td isNumeric>0.91444</Td>
              <Td>0.91444</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
export default Tables;
