'use strict'

import MessaingBase from './messaging-base';

const TYPE_SERVER = 'server';
const TYPE_CLIENT = 'client';

export default class ClientServer extends MessaingBase {

    type: string;

    constructor() {
        super();
        this.type = Math.random() > 0.5 ? TYPE_CLIENT : TYPE_SERVER;
        this.callApi(top,'register', this.type)
            .catch(console.error);
    }

    registerMessages() {
        this.registerMessage('serverRegistered', this.onServerRegistered.bind(this));
        this.registerMessage('SYN', this.onSynMessage.bind(this));
        this.registerMessage('test', this.onTestMessage.bind(this));
    }

    /**
     * Метод вызывается когда регистрируется новый сервер.
     */
    onServerRegistered(mediator, mid, serverName) {
        console.log('onServerRegistered', { mediator, mid, serverName });

        this
            .callApi(top, 'sendMessage', {
                'sendToServer': serverName,
                'message': 'SYN'
            })
            .catch(console.error);
    }

    onSynMessage(mediator, mid, serverName) {
        console.log('onSynMessage', mediator, mid, serverName);
    }

    onTestMessage() {
        console.log('!!!test message');
    }

}
