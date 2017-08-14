'use strict'

export default class MessagingBase {

    messageHandlers: object = {};

    /**
     * Массив актуальных запросов. Объект содержит resolve/reject промиса запроса.
     * @type {{}}
     */
    apiCalls: object = {};
    messageId: number = 1;


    constructor() {
        this.registerMessageHandling();
        this.registerMessages();
    }

    registerMessageHandling() {
        window.addEventListener('message', this.onMessage.bind(this));
    }

    /**
     * Абстрактный метод для подключения обработчиков событий.
     */
    registerMessages() {
        // this.registerMessage('message', this.handler.bind(this));
    }

    registerMessage(message, handler) {
        this.messageHandlers[message] = handler;
    }

    onMessage(event) {
        const { data: { message, mid, data }, source: iframe } = event;
        console.log('-> MessageBase', { mid, message, data });

        // вызов с ожиданием
        if (mid && this.apiCalls[mid]) {
            return this.apiCalls[mid].resolve(data)
        }

        // просто обработчик события
        if (this.messageHandlers[message]) {
            this.messageHandlers[message](iframe, mid, data)
        } else {
            return console.error('invalid message', message);
        }

    }

    callApi(target, message, data = null) {
        console.log('callApi', { target, message, data });

        return new Promise((resolve, reject) => {
            const mid = this.generateMessageId();
            target.postMessage({ message, data, mid }, '*');
            this.apiCalls[mid] = { resolve, reject };
        }).catch(console.error)
    }

    generateMessageId() {
        return '@id' + this.messageId++;
    }

    sendApiResponse(iframe, mid, data = null) {
        iframe.postMessage({ mid, data }, '*')
    }

    sendMessage(iframe, message, data = null) {
        iframe.postMessage({ message, data }, '*')
    }


}
