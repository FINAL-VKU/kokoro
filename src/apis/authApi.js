import {postJSONWithoutAuth} from "./fetch";


export const login = (email, password) => {
    return fetch(`https://grandemy.peacom.co/mobile/sign-in`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({email, password}),
    })
}
export const logoutWeb = () => {
    return fetch(`/mobile/log-out`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({}),
    })
}
export const getUserByToken = () => {
    return fetch('/mobi/information') // Thay đổi URL thành API bạn muốn gọi
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Chuyển đổi dữ liệu phản hồi sang JSON
        })
        .then(data => {
            console.log(data); // Xử lý dữ liệu nhận được
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
export const authApis = {
    login: (email, password) =>
        postJSONWithoutAuth(`https://grandemy.peacom.co/mobile/sign-in`, {
            email,
            password,
        }),
}
