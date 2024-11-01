import { useState } from "react";
import { useNavigate } from "react-router-dom"; // リダイレクト用
import axios from "axios"; // axiosのインポート

export const SignInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // ページ遷移に使用する

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // axiosを使用してAPIリクエストで認証を確認する
      const response = await axios.post(
        "http://localhost:81/my_fuel_project/public/api/",

        // "http://localhost:8081/Applications/XAMPP/htdocs/my_fuel_project/fuel/app/classes/controller/api.php",
        {
          username,
          password,
        }
      );

      if (response.status === 200) {
        // 認証が成功したら、次のページへリダイレクト
        navigate("/lists"); // ログイン後に移動するページ
      } else {
        // エラーハンドリング
        setError("ログインに失敗しました。");
      }
    } catch (error) {
      // エラーハンドリング
      if (error.response) {
        // サーバーがステータスコードを返した場合（4xxや5xxのエラー）
        setError(`エラー: ${error.response.data.message}`);
      } else if (error.request) {
        // リクエストがサーバーに送信されたが、レスポンスがない場合
        setError("サーバーからの応答がありません。");
      } else {
        // リクエストの設定中にエラーが発生した場合
        setError("エラーが発生しました。");
      }
    }
  };

  return (
    <div>
      <h2>ログイン</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
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
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
};

export default SignInForm;
