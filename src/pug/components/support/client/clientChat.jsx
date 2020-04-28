/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable object-curly-spacing */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable array-bracket-spacing */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import { getUserFromStorage } from '../../../../javascript/user'
import { Bot } from './Bot.jsx'
import { LiveChat } from './LiveChat.jsx'

const ClientChat = () => {   
    // toggle chat window 
    const [ chat, setChat ] = useState(false)
    const toggleChat = () => {
        setChat(!chat)
        setTimeout(() => {
            setBot(false)
            setLiveChat(false)
        }, 500);
    }

    // toggle bot window
    const [ bot, setBot ] = useState(false)
    const handleBot = () => setBot(!bot)

    // toggle liveChat window
    const [ liveChat, setLiveChat ] = useState(false)
    const handleLiveChat = () => setLiveChat(!liveChat)

    // if admin true
    const [ client, setClient ] = useState(false)
    // hide openChat btn if user is admin
    useEffect(() => {
        if (getUserFromStorage()) {
            if (getUserFromStorage().type === 'admin') {
                setClient(false)
            } else {
                setClient(true)
            }
        } else {
            setClient(true)
        }
    }, [])

    const hideOptions = {
        opacity: '0',
        visibility: 'hidden'
    }    

    return (
        <div className='clientchat'>

            <div className={`clientchat__chat ${chat ? '' : 'hide'}`}
                style={bot || liveChat ? {height: '450px'} : {height: '200px'}}
            >
                <div className="clientchat__chat-head">
                    <i className="far fa-life-ring"></i>
                    <p>Support</p>
                </div>
                <div className="clientchat__chat-body">
                    <div className="clientchat__body-options"
                        style={bot || liveChat ? hideOptions : null}
                    >
                        <div className="clientchat__options-option"
                            onClick={handleBot}
                        >
                            <i className="fas fa-robot"></i>
                            <p>Open Bot</p>
                        </div>
                        <div className="clientchat__options-option"
                            onClick={handleLiveChat}
                        >
                            <i className="fab fa-telegram-plane"></i>
                            <p>Open Live Chat</p>
                        </div>
                    </div>
                    
                    { bot ? <Bot handleBot={handleBot} /> : '' }
                    { liveChat ? <LiveChat handleLiveChat={handleLiveChat} /> : '' }

                </div>
            </div>


            {
                client ? (
                    <>
                        <div className={`clientchat__btn ${chat ? 'hide' : ''}`} onClick={toggleChat}>
                            <i className="fas fa-comment-dots"></i>
                        </div>
                        <div className={`clientchat__btn ${!chat ? 'hide' : ''}`} onClick={toggleChat}>
                            <i className="fas fa-times-circle"></i>
                        </div>
                    </>
                ) : ''
            }
            
        </div>
    )
}

export default render(<ClientChat />, document.getElementById('client-chat'))