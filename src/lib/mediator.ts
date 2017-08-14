'use strict'

import MessagingBase from './messaging-base';

export default class Mediator extends MessagingBase {

    clients: any[] = [];

    constructor() {
        super();

        this.registerClient(top, 'top', 'mediator');
    }

    registerClient(client, id, type) {
        console.log('register', {client, id, type});
        this.clients.push({client, id, type});
    }

    registerMessages() {
        this.registerMessage('register', this.onRegisterMessage.bind(this));
        this.registerMessage('sendById', this.onSendByIdMessage.bind(this));
    }

    onRegisterMessage({ iframe, data }) {
        switch (data.type) {
            case 'client':
                this.clients
                    .filter(c => c.type === 'server')
                    .forEach((c) => {
                        this.sendMessage(iframe, 'serverRegistered', c.id);
                    });
                break;

            case 'server':
                this.clients
                    .filter(c => c.type === 'client')
                    .forEach((c) => {
                        this.sendMessage(c.client, 'serverRegistered', data.id);
                    });
                break;

            default:
                return console.error('invalid client type', data);
        }

        this.registerClient(iframe, data.id, data.type);
    }

    onSendByIdMessage({ data: { sendTo, sendFrom, message } } ) {
        console.log('onSendMessageMessage', sendFrom, '->', sendTo, ':', message);
        const clientData = this.clients.find((c) => c.id === sendTo);
        this.sendMessage(clientData.client, message, sendFrom);
    }

}
