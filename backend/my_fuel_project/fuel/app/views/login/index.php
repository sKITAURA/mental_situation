<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Login Page</title>
    <script src="https://cdn.jsdelivr.net/npm/knockout@3.5.1/build/knockout.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>

<body>

    <div>
        <h2>Login</h2>
        <form data-bind="submit: login">
            <div>
                <label for="username">Username:</label>
                <input type="text" id="username" data-bind="value: username" required>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" data-bind="value: password" required>
            </div>
            <button type="submit">Login</button>
        </form>
        <p data-bind="text: errorMessage" style="color: red;"></p>
    </div>

    <script>
    function LoginViewModel() {
        var self = this;

        // Knockout observables
        self.username = ko.observable('');
        self.password = ko.observable('');
        self.errorMessage = ko.observable('');

        // ログイン処理
        self.login = function() {
            axios.post('http://localhost:81/login/authenticate', {
                    username: self.username(),
                    password: self.password()
                })
                .then(function(response) {
                    if (response.data.success) {
                        alert('ログイン成功！');
                        // ここでリダイレクトやログイン後の処理を追加
                    } else {
                        self.errorMessage(response.data.error || 'ログインに失敗しました');
                    }
                })
                .catch(function(error) {
                    self.errorMessage('サーバーエラーが発生しました');
                    console.error(error);
                });
        };
    }

    // Knockoutのバインディングを適用
    ko.applyBindings(new LoginViewModel());
    </script>

</body>

</html>