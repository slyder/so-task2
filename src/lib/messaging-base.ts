'use strict'

export default class MessagingBase {

    messageHandlers: object = {};
    id: string = null;

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
        // HOWTO: this.registerMessage('message', this.handler.bind(this));
    }

    registerMessage(message, handler) {
        this.messageHandlers[message] = handler;
    }

    onMessage(event) {
        const { data: { message, data }, source: iframe } = event;
        console.log('-> MessageBase', { message, data });

        // просто обработчик события
        if (this.messageHandlers[message]) {
            this.messageHandlers[message]({ iframe, data })
        } else {
            return console.error('invalid message', message);
        }
    }

    sendMessage(iframe, message, data = null) {
        iframe.postMessage({ message, data }, '*')
    }


}
