const setLoginContents = () => getLocalData('login') && window.location.replace('/order.html');

$(document).ready(function(e) {
    setLoginContents();

    $('#loginForm').submit((e) => {
        e.preventDefault();
        let userName = $('#username').val();
        let password = $('#password').val();
        if (userName === password) {
            $.ajax({
                type: "POST",
                url: loginUrl,
                data: {
                    userName: userName,
                    password: password
                },
                success: (success) => {
                    setLocalData('login', true);
                    alert('Login Successful!');
                    window.location.href = './order.html'

                }
            });
        } else {
            alert('Please enter the valid credential!');
        }


    })

});