//create a socket from io and export it
import {io} from "socket.io-client";
export const socket=io("http://localhost:5000",{
    withCredentials:true
});
// It stores this userId along with the socket.id in a map called onlineusers. This way, the server knows which socket connection belongs to which user.
// It then broadcasts an event update_online_users to all connected clients, sending them the updated list of online user IDs.  