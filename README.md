
# Задача

Дана страница содержащая 2 iframe. Внутри iframe есть класс, который в случайном порядке принимает решение кем он является: клиентом или серверов. 
Нужно реализовать TCP handshake (3 steps) протокол между двумя iframe на странице. 
Для проектирования решения следует использовать паттерн медиатор, фасад.

# Установка

```$xslt
git clone https://github.com/slyder/so-task2
npm i && npm run server
open http://localhost:8081/
```


# Результат решения и вывода в консоль

Решение выполнено на базе указанного ядра. И на TypeScript. 
Задание написано очень обобщенно и может быть выполнено в различных вариантах. 
В дальшейнем можно еще больше унифицировать методы передачи данных. 
Так же методы общения перевести на async/await или promise что сделается их более удобными.


Файлы решения:
```$xslt
- src/main.ts - общий файл входа для индексной страницы или для ифрейма... скрипт определяет типа документа и запускает соот-щий объект,
- src/lib/messaging-base.ts - базовый класс для медиатора или клиент-серверного класса, содержит методы обработки и отправки сообщений,
- src/lib/mediator.ts - класс, медиатор, который является ядром для общения сообщениями, а так же регистрирует наличие активных клиентов и серверов,
- src/lib/client-server.ts - класс выполняющий роль клиента или сервера в случайной пропорции... если это сервер, то он ожидает подключения и ничего не делает... если это клиент, то он ожидает появление сервера и далее выполняет с ним процедуру хенд-шейка.
```


Результат выполнения кода:
```$xslt
14:05:16.921 mediator.ts:16 register {client: Window, id: "top", type: "mediator"}
14:05:17.283 messaging-base.ts:30 -> MessageBase {message: "register", data: {…}}
14:05:17.284 mediator.ts:16 register {client: Window, id: "client-server_5952", type: "client"}
14:05:17.400 messaging-base.ts:30 -> MessageBase {message: "register", data: {…}}
14:05:17.401 mediator.ts:16 register {client: Window, id: "client-server_837", type: "server"}
14:05:17.416 messaging-base.ts:30 -> MessageBase {message: "serverRegistered", data: "client-server_837"}
14:05:17.420 client-server.ts:32 onServerRegistered client-server_837
14:05:17.427 messaging-base.ts:30 -> MessageBase {message: "sendById", data: {…}}
14:05:17.429 mediator.ts:51 onSendMessageMessage client-server_5952 -> client-server_837 : SYN
14:05:17.437 messaging-base.ts:30 -> MessageBase {message: "SYN", data: "client-server_5952"}
14:05:17.441 client-server.ts:41 onSynMessage from client-server_5952
14:05:17.446 messaging-base.ts:30 -> MessageBase {message: "sendById", data: {…}}
14:05:17.447 mediator.ts:51 onSendMessageMessage client-server_837 -> client-server_5952 : SYN-ACK
14:05:17.448 messaging-base.ts:30 -> MessageBase {message: "SYN-ACK", data: "client-server_837"}
14:05:17.449 client-server.ts:51 onSynAckMessage from client-server_837
14:05:17.452 messaging-base.ts:30 -> MessageBase {message: "sendById", data: {…}}
14:05:17.452 mediator.ts:51 onSendMessageMessage client-server_5952 -> client-server_837 : ACK
14:05:17.453 messaging-base.ts:30 -> MessageBase {message: "ACK", data: "client-server_5952"}
14:05:17.454 client-server.ts:60 onAckMessage from client-server_5952
14:05:17.455 client-server.ts:63 connection is ESTABLISHED.
```

