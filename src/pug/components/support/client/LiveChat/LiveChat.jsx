/* eslint-disable padded-blocks */
/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable object-curly-spacing */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable array-bracket-spacing */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState, useRef } from 'react'
import { scrollDown } from '../../scrollDown'

export const LiveChat = ({ handleLiveChat }) => {
    const [ userName, setUserName ] = useState(null)
    const [ history, setHistory ] = useState([
        {
            id: 1,
            name: 'Admin',
            message: 'Welcome to Journey To Mars SUPPORT. How can I help you?'
        }
    ])

    const historyWindow = useRef()

    const sendNewMessage = e => {
        e.preventDefault()
        const chatbox = e.currentTarget

        const lasId = history[history.length - 1].id
        setHistory([...history, {
            id: lasId + 1,
            name: 'User',
            message: chatbox.message.value
        }])
        
        scrollDown(historyWindow)

        chatbox.reset()
    }
 
    return (
        <div className='livechat'>
            <div className="livechat__close"
                onClick={handleLiveChat}
            >
                <i className="fas fa-chevron-circle-left"></i>
            </div>
            <div className="livechat__body">
                <div className="livechat__body-history"
                    ref={historyWindow}
                >
                    {
                        history.map(mssg => {
                            return mssg.name === 'Admin' ? (
                                <div className="bot__history-message mssg--bot"
                                    key={mssg.id}
                                >
                                    <p className="bot__message-sendername">{ mssg.name }</p>
                                    <p className="bot__message-text">{ mssg.message }</p>
                                </div>
                            ) : (
                                <div className="bot__history-message mssg--user"
                                    key={mssg.id}
                                >
                                    <p className="bot__message-sendername">{ mssg.name }</p>
                                    <p className="bot__message-text">{ mssg.message }</p>
                                </div>
                            )
                        })
                    }
                </div>

                <form className="livechat__body-chatbox"
                    onSubmit={sendNewMessage}
                >
                    <input type="text" 
                        placeholder="Type in your message..."
                        name="message"
                        autoComplete="off"
                    />
                    <button type="submit">
                        <i className="fab fa-telegram-plane"></i>
                    </button>
                </form>
            </div>
        </div>
    )
}
