/* eslint-disable padded-blocks */
/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable object-curly-spacing */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable array-bracket-spacing */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState, useRef, useEffect } from 'react'
import io from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid'
import { scrollDown } from '../../scrollDown'
import { getUserFromStorage } from '../../../../../javascript/user'

const socket =  io.connect('http://localhost:4500/')

let debounce = null
let countDown = null

export const LiveChat = ({ handleLiveChat }) => {
    const [ adminTyping, setAdminTyping ] = useState(false)

    const [ userId ] = useState(uuidv4())
    const [ userName, setUserName ] = useState(null)
    const [ history, setHistory ] = useState([
        {
            userId: 1,
            userName: 'Admin',
            message: 'Welcome to Journey To Mars SUPPORT. How can I help you?'
        }
    ])

    const historyWindow = useRef()

    const sendNewMessage = e => {
        e.preventDefault()
        const chatbox = e.currentTarget

        if (!chatbox.message.value.length) return
    
        socket.emit('messaging', userId, {
            userId: userId,
            userName: userName,
            message: chatbox.message.value
        })

        chatbox.reset()
    }

    const handleUserName = e => {
        e.preventDefault()
        const { target } = e;
        setUserName(target.username.value)
        target.reset()
    }

    const getUser = () => {
        const user = getUserFromStorage()
        if (!user) return setUserName(null)
        setUserName(user.firstname)
    }

    useEffect(() => {
        scrollDown(historyWindow)
    }, [history, adminTyping])

    // ----- socket.io ----- //
    // sending typing event
    const typing = ({ currentTarget }) => {
        const input = currentTarget.value.length
        if (!input) return
        clearTimeout(debounce)
        debounce = null
        // reducing the amount of requests
        debounce = setTimeout(() => {
            socket.emit('typing', userId)
            clearTimeout(debounce)
            debounce = null
        }, 500);
    }
    // --------------

    useEffect(() => {
        getUser()

        socket.on('getHistory', (chat) => {
            if (!chat) return
            setHistory([...history, ...chat.history])
            setAdminTyping(false)
            clearTimeout(countDown)
            countDown = null
        })

        // receive typing from admin
        socket.on('typing', () => {
            clearTimeout(countDown)
            countDown = null
            setAdminTyping(true)
            countDown = setTimeout(() => {
                setAdminTyping(false)
                clearTimeout(countDown)
                countDown = null
            }, 4000);
        })

        return () => {
            socket.emit('customerLeftChat', userId)
        }
    }, [])

    useEffect(() => {
        if (!userName) return
        socket.emit('newCustomerInTheChat', {
            userId,
            userName
        })
    }, [userName])
 
    return (
        <div className='livechat'>
            <div className="livechat__close"
                onClick={handleLiveChat}
            >
                <i className="fas fa-chevron-circle-left"></i>
            </div>
            <form className={`livechat__username ${!userName ? 'active' : ''}`}
                onSubmit={handleUserName}
            >
                <input 
                    type="text"
                    name="username"
                    placeholder="Type in your name..."
                    autoComplete="off"
                />
            </form>
            <div className="livechat__body">
                <div className="livechat__body-history"
                    ref={historyWindow}
                >
                    {
                        history.map((mssg, index) => {
                            return mssg.userId !== userId ? (
                                <div className="bot__history-message mssg--bot"
                                    key={index}
                                >
                                    <p className="bot__message-sendername">{ mssg.userName }</p>
                                    <p className="bot__message-text">{ mssg.message }</p>
                                </div>
                            ) : (
                                <div className="bot__history-message mssg--user"
                                    key={index}
                                >
                                    <p className="bot__message-sendername">{ mssg.userName }</p>
                                    <p className="bot__message-text">{ mssg.message }</p>
                                </div>
                            )
                        })
                    }
                    <p className={`livechat__history-activity ${adminTyping ? 'active' : ''}`}>
                        Admin is typing...
                    </p>
                </div>

                <form className="livechat__body-chatbox"
                    onSubmit={sendNewMessage}
                >
                    <input type="text" 
                        placeholder="Type in your message..."
                        name="message"
                        autoComplete="off"
                        onChange={typing}
                    />
                    <button type="submit">
                        <i className="fab fa-telegram-plane"></i>
                    </button>
                </form>
            </div>
        </div>
    )
}
