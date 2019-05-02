import Dumper from './json-dumper.js';

chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "knockknock");

  port.onMessage.addListener(function(msg) {
      const dump = new Dumper();
      const content = dump.generateDump(msg.body);
      port.postMessage({
        body: content
      });
  });
});

