export default class Api {
    constructor({baseUrl, headers}) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }
}
