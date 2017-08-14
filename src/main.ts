'use strict'


import ClientServer from './client-server';
import Mediator from './mediator';

const topWindow = (top === window);
if (topWindow) {
    new Mediator();
} else {
    new ClientServer
}
