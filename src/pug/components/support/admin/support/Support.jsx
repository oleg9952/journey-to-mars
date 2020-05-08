/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable object-curly-spacing */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable array-bracket-spacing */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { AdminChat } from './AdminChat/AdminChat.jsx'

export const Support = () => {
    const [ sections, setSections ] = useState(true)
    const openChats = () => setSections(true)
    const openQuestions = () => setSections(false)

    const [ chatWindow, setChatWindow ] = useState(false)
    const toggleChatWindow = () => setChatWindow(!chatWindow)

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
                        <div className="suppholder__chats-chat"
                            onClick={toggleChatWindow}
                        >
                            <p>1</p>
                            <p>James Anderson</p>
                            <i className="fas fa-signal"></i>
                        </div>
                        <div className="suppholder__chats-chat"
                            onClick={toggleChatWindow}
                        >
                            <p>2</p>
                            <p>James Anderson</p>
                            <i className="fas fa-signal"></i>
                        </div>
                    </div>
                    <h1 className="suppholder__section-title">Archived</h1>
                    <div className="suppholder__section-chats archived">
                        <div className="suppholder__chats-chat"
                            onClick={toggleChatWindow}
                        >
                            <p>1</p>
                            <p>Alex Brand</p>
                            <i className="fas fa-signal"></i>
                        </div>
                        <div className="suppholder__chats-chat"
                            onClick={toggleChatWindow}
                        >
                            <p>2</p>
                            <p>Alex Brand</p>
                            <i className="fas fa-signal"></i>
                        </div>
                    </div>
                </div>
                <div className={`suppholder__sections-section ${sections ? '' : 'active'}`}>
                    <h1>Questions</h1>
                </div>
            </div>
            {
                chatWindow ?
                <AdminChat 
                    toggleChatWindow={toggleChatWindow}
                /> : ''
            }
            
        </div>
    )
}