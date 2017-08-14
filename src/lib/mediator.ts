'use strict'

import MessaingBase from './messaging-base';

export default class Mediator extends MessaingBase {

    serverId: number = 1;
    servers: any[] = [];
    clients: any[] = [];

    constructor() {
        super();
    }

    registerMessages() {
        this.registerMessage('register', this.onRegisterMessage.bind(this));
        this.registerMessage('sendMessage', this.onSendMessageMessage.bind(this));
    }

    onRegisterMessage(iframe, mid, data) {
        switch (data) {
            case 'client':
                // this.clients.push(iframe);
                // if (this.servers.length > 0) {
                //     console.log('111')
                //     this.servers.forEach((server) => {
                //         this.sendMessage(iframe, 'serverRegistered', server.id);
                //     })
                // }
                break;

            case 'server':
                this.servers.push(iframe);
                this.callApi(iframe, 'test', {});
                console.log('tttt');
                // iframe.id = 'sid@' + this.serverId++;
                // if (this.clients.length > 0) {
                //     console.log('222')
                //     this.clients.forEach((client) => {
                //         this.sendMessage(client, 'serverRegistered', iframe.id);
                //     })
                // }
                break;

            default:
                return console.error('invalid client type', data);
        }

        this.sendApiResponse(iframe, mid, true);
    }

    onSendMessageMessage(iframe, mid, messageData) {
        console.log('onSendMessageMessage', messageData);

        const { sendToServer, message, data } = messageData;
        const server = this.servers.find((s) => s.id === sendToServer);

        this.callApi(server, message, data)
            .catch(console.error);
    }

}
