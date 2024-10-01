// table.component.tsx
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react";

// eslint-disable-next-line react/prop-types
export const Tables = ({ onEdit }) => {
  const initialData = [
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
  ];

  const handleDelete = async (id) => {
    try {
      console.log(`ID: ${id} を削除します`);

      // サーバーに削除リクエストを送信
      // eslint-disable-next-line no-undef
      await axios.delete(`http://localhost:3000/items/${id}`);

      // フロントエンドの状態を更新して、削除したデータを反映
      // eslint-disable-next-line no-undef
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("削除に失敗しました", error);
    }
  };

  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>日付</Th>
            <Th>メンタルの状態</Th>
            <Th>理由</Th>
            <Th>改善方法</Th>
            <Th>編集</Th>
            <Th>削除</Th>
          </Tr>
        </Thead>
        <Tbody>
          {initialData.map((item) => (
            <Tr key={item.id}>
              <Td>{item.date}</Td>
              <Td>{item.state}</Td>
              <Td>{item.reason}</Td>
              <Td>{item.solution}</Td>
              <Td>
                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={() => onEdit(item)} // 編集ボタンが押されたとき
                >
                  編集
                </Button>
              </Td>
              <Td>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                >
                  削除
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default Tables;
