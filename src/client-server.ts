'use strict'

const TYPE_SERVER = 'server';
const TYPE_CLIENT = 'client';

export default class ClientServer {

    apiCalls: object = {};
    messageId: number = 1;
    type: string;

    constructor() {
        window.addEventListener('message', this.onMessage.bind(this));

        this.type = Math.random() > 0.5 ? TYPE_CLIENT : TYPE_SERVER;

        this.callApi('register', this.type)
            .catch(console.error)
    }

    callApi(message, data = null) {
        return new Promise((resolve, reject) => {
            const mid = this.generateMessageId();
            top.postMessage({ message, data, mid }, '*');
            this.apiCalls[mid] = { resolve, reject };
        });
    }

    onMessage(event) {
        const { data: { message, mid, result } } = event;
        console.log('-> ClientServer', message, mid, result);

        if (this.apiCalls[mid]) {
            this.apiCalls[mid].resolve(result)
        }
    }

    generateMessageId() {
        return '@id' + this.messageId++;
    }

    /**
     * Метод вызывается когда регистрируется новый сервер.
     */
    onServerRegistered() {
        console.log('onServerRegistered');
    }

}
