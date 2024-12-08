const socket = require('socket.io'); 
const userModel = require('./src/models/user.model');
const captainModel = require('./src/models/captain.model')

let io; 

function initializeSocket(server){
    io = socket(server, {
        cors: {
            origin: '*', 
            methods: ['GET', 'POST']
        }
    }); 

    io.on('connection', (socket) => {
        console.log(socket.id);
        
        socket.on('join', async (data) => {
            const { userId , userType } = data; 

            console.log("coming from backend: ", userId, userType); 

            if(userType === 'user'){
                await userModel.findByIdAndUpdate(userId, {socketId: socket.id}); 
            }
            else{
                await captainModel.findByIdAndUpdate(userId, {socketId: socket.id}); 
            }
        })

        socket.on('update-captain-location', async(data) => {
            const {captainId, location} = data; 

            if(!location || !captainId || !location.lng || !location.ltd){
                return socket.emit('error', {message: "Invalid data"}); 
            }
            
            await captainModel.findByIdAndUpdate(captainId, {location: {
                ltd: location.ltd, 
                lng: location.lng
            }}); 
        })
        
        io.on('disconnect', () => {
            console.log('disconnecting: ', socket.id )
        });
    });
}


const sendMessageToSocketId = (socketId, message) => {
    if(io){
        io.to(socketId).emit(message.event , message.data); 
        console.log("event emitted: ", message.event); 
    }
    else{
        console.log("Socket not initialised"); 
    }
}
 
module.exports = { initializeSocket, sendMessageToSocketId }