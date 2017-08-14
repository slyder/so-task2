'use strict'

export default class Mediator {

    serverId: number = 1;
    servers: any[] = [];
    clients: any[] = [];

    constructor() {
        window.addEventListener('message', this.onMessage.bind(this));
    }

    onMessage(event) {
        const { data: { message, mid, data }, source: iframe } = event;
        console.log('-> Mediator', mid, message, data);

        switch (message) {
            case 'register':
                this.onRegisterMessage(iframe, mid, data);
                break;

            default:
                return console.error('invalid message', message);
        }
    }

    sendApiResponse(iframe, mid, result = null) {
        iframe.postMessage({ mid, result }, '*')
    }

    sendMessage(iframe, message, result = null) {
        iframe.postMessage({ message, result }, '*')
    }

    onRegisterMessage(iframe, mid, data) {

        console.log('@@@data');

        switch (data) {
            case 'client':
                this.clients.push(iframe);
                if (this.servers.length > 0) {
                    this.servers.forEach((server) => {
                        this.sendMessage(iframe, 'serverRegistered', server.id);
                    })
                }
                break;

            case 'server':
                this.servers.push(iframe);
                iframe.id = 'sid@' + this.serverId++;
                if (this.clients.length > 0) {
                    this.clients.forEach((client) => {
                        this.sendMessage(client, 'serverRegistered', iframe.id);
                    })
                }
                break;

            default:
                return console.error('invalid client type', data);
        }

        this.sendApiResponse(iframe, mid, true);
    }

}
