'use strict'


import ClientServer from './lib/client-server';
import Mediator from './lib/mediator';

const topWindow = (top === window);
if (topWindow) {
    new Mediator();
} else {
    new ClientServer
}
