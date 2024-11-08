// table.component.tsx

import PropTypes from "prop-types"; // PropTypes をインポート
import axios from "axios"; // axios をインポート
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

export const Tables = ({ onEdit, data, setData }) => {
  console.log(data);
  const handleDelete = async (id) => {
    console.log("削除リクエストを送信します"); // デバッグログ追加
    try {
      await axios.post(
        `http://localhost:81/api/delete_mental_data/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
          {data.map((item) => (
            <Tr key={item.id}>
              <Td>{item.date}</Td>
              <Td>{item.state}</Td>
              <Td>{item.reason}</Td>
              <Td>{item.solution}</Td>
              <Td>
                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={() => onEdit(item)}
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

Tables.propTypes = {
  onEdit: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      reason: PropTypes.string.isRequired,
      solution: PropTypes.string.isRequired,
    })
  ).isRequired,
  setData: PropTypes.func.isRequired,
};

export default Tables;
