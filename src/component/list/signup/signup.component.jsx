import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // リダイレクト用

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // APIにPOSTリクエストを送信して、アカウントを作成
      const response = await axios.post(
        "http://localhost:81/my_fuel_project/public/api/register",

        // "http://localhost:8081/Applications/XAMPP/htdocs/my_fuel_project/fuel/app/classes/controller/api.php",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        navigate("/login");
      } else {
        setError("アカウント作成に失敗しました。");
      }
    } catch (error) {
      if (error.response) {
        setError(`エラー: ${error.response.data.message}`);
      } else if (error.request) {
        setError("サーバーからの応答がありません。");
      } else {
        setError("エラーが発生しました。");
      }
    }
  };

  return (
    <div>
      <h2>アカウント作成</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSignup}>
        <div>
          <label>ユーザー名:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>パスワード:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">アカウント作成</button>
      </form>
    </div>
  );
};

export default SignUpForm;
