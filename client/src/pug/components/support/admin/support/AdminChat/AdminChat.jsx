/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable object-curly-spacing */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable array-bracket-spacing */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useRef, useState, useEffect } from 'react'

export const AdminChat = ({ toggleChatWindow }) => {
    const [ toggleActive, setToggleActive ] = useState(false)
    
    const chatWindowRef = useRef()
    const handleChatClose = e => {
        if (chatWindowRef.current !== e.target) return
        setToggleActive(false)
        setTimeout(() => {
            toggleChatWindow()
        }, 500);
    }

    useEffect(() => {
        setToggleActive(true)
    }, [])

    return (
        <div className={`adminchat ${toggleActive ? 'active' : ''}`}
            ref={chatWindowRef}
            onClick={handleChatClose}
        >
            <div className="adminchat__chat">
                <div className="adminchat__chat-head">
                    <i className="fas fa-comment-alt"></i>
                    <p>Chating with James</p>
                    <div className="adminchat__head-switch">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
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
                        <div className="chat__messages">
                            <div className="chat__messages-message message-user">
                                <p className="chat__message-sender">James</p>
                                <p className="chat__message-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis excepturi culpa magnam recusandae itaque perferendis.</p>
                            </div>
                            <div className="chat__messages-message message-user">
                                <p className="chat__message-sender">James</p>
                                <p className="chat__message-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis excepturi culpa magnam recusandae itaque perferendis.</p>
                            </div>
                            <div className="chat__messages-message message--admin">
                                <p className="chat__message-sender">Admin</p>
                                <p className="chat__message-text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis excepturi culpa magnam recusandae itaque perferendis.</p>
                            </div>
                        </div>
                        <form className="chat__chatbox">
                            <input 
                                type="text" 
                                name="message" 
                                placeholder="Type in your message..."
                                autoComplete="off"
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
