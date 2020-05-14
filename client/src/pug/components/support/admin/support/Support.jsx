/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable object-curly-spacing */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable array-bracket-spacing */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react'
import { AdminChat } from './AdminChat/AdminChat.jsx'
import { adminSocket } from '../adminSocket.ts'
import { getUserFromStorage } from '../../../../../javascript/user.ts'

const user = getUserFromStorage()
const socket = adminSocket(user)

export const Support = () => {
    // DATA
    const [ activeChats, setActiveChats ] = useState([])
    const [ archivedChats, setArchivedChats ] = useState([])
    const [ selectedChat, setSelectedChat ] = useState(null)
    const handleChatSelection = chat => {
        setSelectedChat(chat)
        if (!chat) return
        socket.emit('adminJoinChat', chat.chatId)
    }
    // ----------

    const [ sections, setSections ] = useState(true)
    const openChats = () => setSections(true)
    const openQuestions = () => setSections(false)

    // ----- socket.io ----- //
    useEffect(() => {
        socket.emit('getActiveChats')
        socket.on('getActiveChats', (chats) => {
            setActiveChats(chats)
        })

        socket.emit('getArchivedChats')
        socket.on('getArchivedChats', (chats) => {
            setArchivedChats(chats)
        })
    }, [])

    return (
        <div className="suppholder">
            <h1 className="suppholder__title">Support</h1>
            <div className="suppholder__nav">
                <div className={`suppholder__nav-btn ${sections ? 'active' : ''}`}
                    onClick={openChats}
                >
                    <i className="fas fa-comment-dots"></i>
                    <p>Chats</p>
                </div>
                <div className={`suppholder__nav-btn ${sections ? '' : 'active'}`}
                    onClick={openQuestions}
                >
                    <i className="fas fa-question-circle"></i>
                    <p>Questions</p>
                </div>
            </div>

            <div className="suppholder__sections">
                <div className={`suppholder__sections-section ${sections ? 'active' : ''}`}>
                    <h1 className="suppholder__section-title">Active</h1>
                    <div className="suppholder__section-chats">
                        {
                            activeChats.length ?
                            activeChats.map((chat, index) => (
                                <div className="suppholder__chats-chat"
                                    key={chat.chatId}
                                    onClick={handleChatSelection.bind(this, chat)}
                                >
                                    <p>{ index + 1 }</p>
                                    <p>{ chat.userName }</p>
                                    <i className="fas fa-signal"></i>
                                </div>
                            )) : 'No active chats yet...'
                        } 
                    </div>
                    <h1 className="suppholder__section-title">Archived</h1>
                    <div className="suppholder__section-chats archived">
                        {
                            archivedChats.length ?
                            archivedChats.map((chat, index) => (
                                <div className="suppholder__chats-chat"
                                    key={chat.chatId}
                                    onClick={handleChatSelection.bind(this, chat)}
                                >
                                    <p>{ index + 1 }</p>
                                    <p>{ chat.userName }</p>
                                    <i className="fas fa-signal"></i>
                                </div>
                            )) : 'No archived chats yet...'
                        }
                    </div>
                </div>
                <div className={`suppholder__sections-section ${sections ? '' : 'active'}`}>
                    <h1>Questions</h1>
                </div>
            </div>
            {
                selectedChat ?
                <AdminChat 
                    handleChatSelection={handleChatSelection}
                    selectedChat={selectedChat}
                    socket={socket}
                /> : ''
            }
            
        </div>
    )
}