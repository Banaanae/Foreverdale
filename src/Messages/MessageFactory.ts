import fs from 'fs/promises';
import path from 'path';

interface Packet {
  id: number;
}

interface PacketConstructor {
  new (): Packet;
}

export default class MessageFactory {
  private packets = new Map<number, PacketConstructor>();

  async init() {
    const dir = path.join(__dirname, 'Messages/Client');
    const files = await fs.readdir(dir);

    for (const file of files) {
      if (!file.endsWith('.ts')) continue;

      try {
        const mod = await import(path.join(dir, file));
        const Packet: PacketConstructor = mod.default ?? mod;

        const instance = new Packet();
        this.packets.set(instance.id, Packet);
      } catch (err) {
        console.error(`[SERVER] Packet load error: ${file}`, err);
      }
    }
  }

  handle(id: number) {
    return this.packets.get(id);
  }

  getPackets() {
    return [...this.packets.keys()];
  }
}
