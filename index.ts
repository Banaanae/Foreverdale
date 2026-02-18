import net from 'net' // Modules
import StreamEncrypter from "./src/Titan/Crypto"
import LogicLaserMessageFactory from './src/Messages/LogicLaserMessageFactory'
import MessagesHandler from "./src/Networking/MessagesHandler"
import Queue from "./src/Networking/Queue"
//import PatcherServer from "./Patcher/Server"
import ResourceManager from "./src/Titan/ResourceManager"
import LogicConfig from "./src/Logic/LogicConfig"

LogicConfig.loadConfig()
require("./Utils/Logger");

const server = new net.Server() // Class inits
//const Patcher = new PatcherServer()

let global: any = {}

const PORT = LogicConfig.port

interface Session extends net.Socket {
    remoteAddress: string;
    ip: string;
    id: number;
    log: (text: string) => void
    warn: (text: string) => void
    errLog: (text: string) => void

    crypto: any;
    queue: any;
}

interface MessageHeader {
  len: number;
  id: number;
  version: number;
  bytes: Buffer;
}

global.sessions = new Map(); // Sessions

const clearSession = (sessionId: number) => global.sessions.delete(sessionId) // Clear session

const getLastSessionId = (): number => { // Get last session ID
  const sessionsIds: number[] = Array.from(global.sessions.keys())

  return sessionsIds.length == 0 ? 0 : sessionsIds[sessionsIds.length - 1]
}

const destroySession = (session: Session, logType = "log", reason = "Client disconnected.") => {
  if (!session) return;

  switch (logType) {
    case "log":
      session.log(reason)
      break
    case "warn":
      session.warn(reason)
      break
    case "err":
      session.errLog(reason)
      break
    default:
      session.log(reason)
  }

  session.destroy()
  clearSession(session.id)
}

const getAmountOfIPConnections = (ip: string) => {
  let amount = 0

  global.sessions.forEach((session: Session) => {
    if (session.ip.split(":")[0] == ip) amount++
  })

  return amount
}

global.destroySession = destroySession

ResourceManager.init()
LogicLaserMessageFactory.loadMessages()

server.on('connection', async (session: Session) => {
  let sessionIp = session.remoteAddress.split(':').slice(-1)[0] // todo
  if (LogicConfig.session.maxConnections != 0 && global.sessions.size >= LogicConfig.session.maxConnections || 
    LogicConfig.session.maxConnectionsPerIP != 0 && getAmountOfIPConnections(sessionIp) >= LogicConfig.session.maxConnectionsPerIP) {
    return session.destroy()
  }

  session.setNoDelay(true)
  session.setTimeout(LogicConfig.session.timeoutSeconds * 1000)

  session.ip = sessionIp + `:${session.remotePort}`;

  session.log = (text: string) => console.log(text)
  session.warn = (text: string) => console.log(text)
  session.errLog = (text: string) => console.log(text)

  session.crypto = LogicConfig.crypto.activate ? new StreamEncrypter(LogicConfig.crypto.type) : null

  session.id = getLastSessionId() + 1

  session.queue = new Queue(LogicConfig.queue.maxSize, LogicConfig.disableQueuebugtxtFile)

  global.sessions.set(session.id, session)

  session.log(`A wild connection appeard! (SESSIONID: ${session.id})`)
  
  const MessageHandler = new MessagesHandler(session)

  session.on('data', async (bytes) => {
    session.queue.push(bytes)

    switch (session.queue.state) {
      case session.queue.QUEUE_OVERFILLED:
        if (LogicConfig.queue.enableOverfillingWarning) session.warn(`Queue is overfilled! Queue size: ${session.queue.size()}`)

        if (LogicConfig.queue.disconnectSessionOnOverfilling) {
          return destroySession(session, "warn", "Client disconnected.")
        }
      break;
      case session.queue.QUEUE_PUSHED_MORE_THAN_EXPECTED:
        session.warn(`Queue got more bytes than expected! Expected: ${session.queue.getQueueExpectedSize()} size. Got: ${session.queue.size()} size.`)
      break;
      case session.queue.QUEUE_DETECTED_MERGED_PACKETS:
        session.warn(`Queue detected merged packets!`)
      break;
    }

    if (!session.queue.isBusy()) {
      const queueBytes = session.queue.release()

      if (Array.isArray(queueBytes)) {
        session.log("Handling merged packets...")
        for(let packet of queueBytes) {
          if (LogicConfig.crypto.activate) {
            packet.bytes = session.crypto.decrypt(packet.id, packet.bytes)
          }
          
          await MessageHandler.handle(packet.id, packet.bytes, { })
        }

        return session.log("Merged packets was handled.")
      }
      
      let messageHeader: MessageHeader = {
        id: queueBytes.readUInt16BE(0),
        len: queueBytes.readUIntBE(2, 3),
        version: queueBytes.readUInt16BE(5),
        bytes: queueBytes.slice(7)
      }

      if (LogicConfig.crypto.activate) {
        messageHeader.bytes = session.crypto.decrypt(messageHeader.id, messageHeader.bytes)
      }
  
      await MessageHandler.handle(messageHeader.id, messageHeader.bytes, {})
    }
  })

  session.on('end', async () => {
    return destroySession(session, "log", "Client disconnected.")
  })

  session.on('error', async error => {
    if (error.message.includes("ECONNRESET")) {
      return destroySession(session, "log", "Client disconnected.")
    }

    try {
      destroySession(session, "err", "A wild error!")
      
      return console.error(error)
    } catch (e) { }
  })

  session.on('timeout', async () => {
    return destroySession(session, "warn", "Session timeout was reached.")
  })
})

server.once('listening', () => {
  console.log(`${LogicConfig.serverName} started on ${PORT} port!`)
  //if (LogicConfig.patcher.enabled) {
  //  Patcher.start();
  //}

  /*if (LogicConfig.logger.enableAdminConsole) {
    rl.setPrompt("> ")
    rl.prompt();

    global.rl.on('close', () => {
      Warn('Server stopped!');
      server.close();
      process.exit(0)
    });
  }*/
})

server.listen(PORT)

process.on("uncaughtException", e => console.warn(e.stack));

process.on("unhandledRejection", (e: Error) => console.warn(e.stack));