'use strict'

import MessagingBase from './messaging-base';

const TYPE_SERVER = 'server';
const TYPE_CLIENT = 'client';

export default class ClientServer extends MessagingBase {

    type: string;
    synWith: string = null;

    constructor() {
        super();

        this.id = 'client-server_' + Math.round(Math.random() * 10000);
        this.type = Math.random() > 0.5 ? TYPE_CLIENT : TYPE_SERVER;
        this.sendMessage(top, 'register', { id: this.id, type: this.type });
    }

    registerMessages() {
        this.registerMessage('serverRegistered', this.onServerRegistered.bind(this));
        this.registerMessage('SYN', this.onSynMessage.bind(this));
        this.registerMessage('SYN-ACK', this.onSynAckMessage.bind(this));
        this.registerMessage('ACK', this.onAckMessage.bind(this));
    }

    /**
     * Метод вызывается когда регистрируется новый сервер.
     */
    onServerRegistered({ data: serverId }) {
        console.log('onServerRegistered', serverId);
        this.sendMessage(top, 'sendById', {
            message: 'SYN',
            sendTo: serverId,
            sendFrom: this.id
        });
    }

    onSynMessage({ data: synFrom }) {
        console.log('onSynMessage from', synFrom);
        this.synWith = synFrom;
        this.sendMessage(top, 'sendById', {
            message: 'SYN-ACK',
            sendTo: synFrom,
            sendFrom: this.id
        });
    }

    onSynAckMessage({ data: synAckFrom }) {
        console.log('onSynAckMessage from', synAckFrom);
        this.sendMessage(top, 'sendById', {
            message: 'ACK',
            sendTo: synAckFrom,
            sendFrom: this.id
        });
    }

    onAckMessage({ data: ackFrom }) {
        console.log('onAckMessage from', ackFrom);

        if (this.synWith === ackFrom) {
            console.log('connection is ESTABLISHED.');
        }
    }

}
