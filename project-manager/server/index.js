const Ws = require('ws');

((Ws) => {
  const server = new Ws.Server({ port: 8000 });

  function init() {
    console.log('Server started on port 8000');
  }

  function bindEvents() { 
    server.on('open', handleOpen);
    server.on('close', handleClose);
    server.on('error', handleError);
    server.on('connection', handleConnection);
  }

  function handleOpen() {
    console.log('BE: WebSocket open');
  }

  function handleClose() {
    console.log('BE: WebSocket closed');
  }

  function handleError() {
    console.log('BE: WebSocket error');
  }

  function handleConnection(ws) {
    console.log('BE: WebSocket connected');
    ws.on('message', handleMessage);
  }

  function handleMessage(msg) {
    console.log('BE: WebSocket received message: ' + msg);
    const msgString = msg.toString();
    server.clients.forEach((client) => {
      client.send(msgString)
    });
  }

  bindEvents();  // 先绑定事件
  init();        // 然后初始化
})(Ws);
