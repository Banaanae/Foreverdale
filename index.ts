import { server } from "./src/Server.ts";

server.listen(9339, "0.0.0.0", () => {
    console.log("TCP server listening on port 9339");
});
