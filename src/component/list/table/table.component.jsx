import PropTypes from "prop-types";
import axios from "axios";
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
    console.log("削除リクエストを送信します");
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
            <Th>更新日時</Th>
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
              <Td>{item.updated_at}</Td>
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
      updated_at: PropTypes.string.isRequired, // updated_at に変更
      state: PropTypes.string.isRequired,
      reason: PropTypes.string.isRequired,
      solution: PropTypes.string.isRequired,
    })
  ).isRequired,
  setData: PropTypes.func.isRequired,
};

export default Tables;
