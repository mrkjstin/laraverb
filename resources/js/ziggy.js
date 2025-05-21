const Ziggy = {"url":"http:\/\/localhost","port":null,"defaults":{},"routes":{"login.index":{"uri":"\/","methods":["GET","HEAD"]},"fire":{"uri":"fire","methods":["GET","HEAD"]},"water":{"uri":"water","methods":["GET","HEAD"]},"dashboard.index":{"uri":"dashboard","methods":["GET","HEAD"]},"storage.local":{"uri":"storage\/{path}","methods":["GET","HEAD"],"wheres":{"path":".*"},"parameters":["path"]}}};
if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
  Object.assign(Ziggy.routes, window.Ziggy.routes);
}
export { Ziggy };
