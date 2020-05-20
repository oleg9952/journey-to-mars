const { io } = require('../server')
const Chat = require('./chatModel')
const { 
    createChat,
    getChats,
    getHistory,
    addMessage,
    leaveChat,
    removeChat
 } = require('./activeChats')
 
let adminId = 'iyBskpuGRmRM5JS6ItuOhHXOdri1'
let adminOnline = false

module.exports.chat = (socket) => {
    // Admin connect
    socket.on('adminConnect', (uid) => {
        if (adminId !== uid) return
        adminOnline = true
        console.log(`Admin online status: ${adminOnline}`,)
    })
    socket.on('adminDisconnect', () => {
        adminOnline = false
        console.log(`Admin online status: ${adminOnline}`)
    })
    socket.on('adminJoinChat', (chatId) => {
        socket.join(chatId)
        console.log(`Admin joined chat: ${chatId}`)
    })
    socket.on('adminLeaveChat', (chatId) => {
        socket.leave(chatId)
        console.log(`Admin left chat: ${chatId}`)
    })

    socket.on('newCustomerInTheChat', ({ userId, userName }) => {
        // if (!adminOnline) return
        // notify admin about new customer
        io.emit('newCustomerInTheChat', { userId, userName })
        // create new active chat
        createChat(userId, userName)
        // join cust to his room
        socket.join(userId)
        // if admin is in admin panel send new chat
        io.emit('getActiveChats', getChats())
        console.log(`New user in the chat - ${userId}`)
    })
    
    socket.on('getActiveChats', () => {
        if (!adminOnline) return
        // send admin active chats when he opens the admin panel
        io.emit('getActiveChats', getChats())
    })
    socket.on('getArchivedChats', () => {
        if (!adminOnline) return
        // send admin archived chats when he opens the admin panel
        Chat.find({}, (err, data) => {
            if (err) {
                console.log(`Error geting chants from MongoDB: ${err}`)
            } else {
                io.emit('getArchivedChats', data)
            }
        })
    })

    socket.on('getHistory', (chatId) => {
        // get all messages in the chat
        io.in(chatId).emit('getHistory', getHistory(chatId))
    })

    socket.on('messaging', (chatId, mssg) => {
        addMessage(chatId, mssg)
        // send updated mssg history
        io.in(chatId).emit('getHistory', getHistory(chatId))
    })

    socket.on('typing', (chatId) => {
        socket.to(chatId).emit('typing')
    })

    socket.on('customerLeftChat', (chatId) => {
        socket.leave(chatId)
        leaveChat(chatId)
        io.emit('getActiveChats', getChats())
        socket.to(chatId).emit('customerLeftChat')
    })

    socket.on('archiveChat', (chatId) => {
        const del = removeChat(chatId)
        if (!del) return
        const arch = new Chat({
            chatId: del.chatId,
            userName: del.userName,
            online: del.online,
            history: del.history
        })

        arch.save()
            .then(() => {
                // update active chats
                io.emit('getActiveChats', getChats())
                // update archived chats
                Chat.find({}, (err, data) => {
                    if (err) {
                        console.log(`Error geting chants from MongoDB: ${err}`)
                    } else {
                        io.emit('getArchivedChats', data)
                    }
                })
                // notification about chat archivation
                io.emit('archiveDone', del.userName)
            })
            .catch(err => console.error(err))    
    })
}