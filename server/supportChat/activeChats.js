let activeChats = []

module.exports.createChat = (userId, userName) => {
    activeChats = [{
        chatId: userId,
        userName,
        online: true,
        history: []
    }, ...activeChats]
}

module.exports.getChats = () => {
    const result = []
    activeChats.forEach(chat => {
        result.push({
            chatId: chat.chatId,
            userName: chat.userName,
            online: chat.online
        })
    })
    return result
}

module.exports.getHistory = (chatId) => {
    let result = []
    activeChats.forEach(chat => {
        if (chat.chatId === chatId) {
            result = chat
        }
    })
    return result
}

module.exports.addMessage = (chatId, mssg) => {
    activeChats.forEach(chat => {
        if (chat.chatId === chatId) {
            chat.history.push(mssg)
        }
    })
}

module.exports.leaveChat = (chatId) => {
    activeChats.forEach(chat => {
        if (chat.chatId === chatId) {
            chat.online = false
        }
    })
}

module.exports.removeChat = (chatId) => {
    const index = activeChats.findIndex(chat => chat.chatId === chatId)
    if (index !== -1) {
        return activeChats.splice(index, 1)[0]
    }
}