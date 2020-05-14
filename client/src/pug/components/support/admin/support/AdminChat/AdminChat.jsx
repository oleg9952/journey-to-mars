/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable object-curly-spacing */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable array-bracket-spacing */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useRef, useState, useEffect } from 'react'
import { getUserFromStorage } from '../../../../../../javascript/user'
import { scrollDown } from '../../../scrollDown'
import { notification } from '../../../../notification/notification'

const user = getUserFromStorage()

let countDown = null
let debounce = null

export const AdminChat = ({ handleChatSelection, selectedChat, socket }) => {
    // ----- HISTORY
    const [ mssgHistory, setMssgHistory ] = useState([])
    const [ typing, setTyping ] = useState(false)
    const [ custLive, setCustLive ] = useState(true)
    const [ archived, setArchived ] = useState(false)

    const chatHistoryRef = useRef()
    const handleNewMessage = e => {
        e.preventDefault()
        const form = e.currentTarget

        if (!form.message.value.length) return

        socket.emit('messaging', selectedChat.chatId, {
            userId: user.uid,
            userName: 'Admin',
            message: form.message.value
        })

        form.reset()
    }

    const [ toggleActive, setToggleActive ] = useState(false)
    
    const chatWindowRef = useRef()
    const handleChatClose = e => {
        if (chatWindowRef.current !== e.target) return
        setToggleActive(false)
        socket.emit('adminLeaveChat', selectedChat.chatId)
        setTimeout(() => {
            handleChatSelection(null)
        }, 500);
    }

    useEffect(() => {
        setToggleActive(true)
    }, [])

    // ----- Archive chat -----
    const arciveChat = () => {
        socket.emit('archiveChat', selectedChat.chatId)
    }

    // ----- Scroll -----
    useEffect(() => {
        scrollDown(chatHistoryRef)
    }, [mssgHistory, typing])

    const startTyping = ({ currentTarget }) => {
        const input = currentTarget.value.length
        if (!input) return
        clearTimeout(debounce)
        debounce = null
        // reducing the amount of requests
        debounce = setTimeout(() => {
            socket.emit('typing', selectedChat.chatId)
            clearTimeout(debounce)
            debounce = null
        }, 500);
    }

    const chatBoxRef = useRef()
    useEffect(() => {
        const { current } = chatBoxRef
        current.value = null
    }, [custLive])

    // ----- socket.io ----- //
    useEffect(() => {
        // if archived prevent socket events
        if (selectedChat.history) {
            setMssgHistory(selectedChat.history)
            setArchived(true)
            return
        }

        socket.emit('getHistory', selectedChat.chatId)
        socket.on('getHistory', (chat) => {
            if (!chat) return
            setMssgHistory(chat.history)
            setTyping(false)
            clearTimeout(countDown)
            countDown = null
        })

        // receive typing from customer
        socket.on('typing', () => {
            clearTimeout(countDown)
            countDown = null
            setTyping(true)
            countDown = setTimeout(() => {
                setTyping(false)
                clearTimeout(countDown)
                countDown = null
            }, 4000);
        })

        socket.on('customerLeftChat', () => {
            setCustLive(false)
        })

        socket.on('archiveDone', (userName) => {
            notification({
                code: 'archive',
                message: `Chat with ${userName} has been archived.`
            })
        })

        return () => {
            console.log('chat closed')
        }
    }, [])

    return (
        <div className={`adminchat ${toggleActive ? 'active' : ''}`}
            ref={chatWindowRef}
            onClick={handleChatClose}
        >
            <div className="adminchat__chat">
                <div className="adminchat__chat-head">
                    <i className="fas fa-comment-alt"></i>
                    <p>Chating with { selectedChat.userName }</p>
                    {
                        archived ? '' :
                        !(custLive && selectedChat.online) ? (
                            <div className="adminchat__head-switch">
                                <i className="fas fa-archive" id="archive__chat"
                                    onClick={arciveChat}
                                ></i>
                            </div>
                        ) : ''
                    }
                </div>
                <div className="adminchat__chat-body">
                    <div className="adminchat__body-answers">
                        <h1>Chat Templates</h1>
                        <div className="adminchat__answers-options">
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat mollitia animi cumque amet quis eveniet?</p>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat mollitia animi cumque amet quis eveniet?</p>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat mollitia animi cumque amet quis eveniet?</p>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat mollitia animi cumque amet quis eveniet?</p>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat mollitia animi cumque amet quis eveniet?</p>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat mollitia animi cumque amet quis eveniet?</p>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat mollitia animi cumque amet quis eveniet?</p>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat mollitia animi cumque amet quis eveniet?</p>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat mollitia animi cumque amet quis eveniet?</p>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat mollitia animi cumque amet quis eveniet?</p>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat mollitia animi cumque amet quis eveniet?</p>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat mollitia animi cumque amet quis eveniet?</p>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat mollitia animi cumque amet quis eveniet?</p>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat mollitia animi cumque amet quis eveniet?</p>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat mollitia animi cumque amet quis eveniet?</p>
                        </div>
                    </div>
                    <div className="adminchat__body-chatholder">
                        <div className="chat__messages"
                            ref={chatHistoryRef}
                        >
                            {
                                mssgHistory.length ?
                                mssgHistory.map((mssg, index) => {
                                    return mssg.userId === user.uid ? (
                                        <div className="chat__messages-message message--admin"
                                            key={index}
                                        >
                                            <p className="chat__message-sender">{ mssg.userName }</p>
                                            <p className="chat__message-text">{ mssg.message }</p>
                                        </div>
                                    ) : (
                                        <div className="chat__messages-message message-user"
                                            key={index}
                                        >
                                            <p className="chat__message-sender">{ mssg.userName }</p>
                                            <p className="chat__message-text">{ mssg.message }</p>
                                        </div>
                                    )
                                }) : (
                                    <div className="chat__messages-empty">
                                        No messages yet...
                                    </div>
                                )
                            }
                            <p className={`chat__messages-activity ${typing ? 'active' : ''}`}>
                                { `${selectedChat.userName} is typing...` }
                            </p>
                        </div>
                        <form className="chat__chatbox"
                            onSubmit={handleNewMessage}
                        >
                            <input 
                                type="text" 
                                name="message" 
                                placeholder={(custLive && selectedChat.online) ? 'Type in your message...' : 'Customer has left the chat.'}
                                autoComplete="off"
                                onChange={startTyping}
                                disabled={!(custLive && selectedChat.online)}
                                ref={chatBoxRef}
                            />
                            <button type="submit">
                                <i className="fab fa-telegram-plane"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
