/* eslint-disable max-len */
/* eslint-disable template-curly-spacing */
/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable object-curly-spacing */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable array-bracket-spacing */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef } from 'react'
import { getQuestions, getAnswer } from './botAPI'
import { scrollDown } from '../../scrollDown'

export const Bot = ({ handleBot }) => {
    // ***** BOT DATA *****
    const [ userName, setUserName ] = useState(null)

    const [ messages, setMessages ] = useState([
        {
            id: 1,
            name: 'Bot',
            message: 'Hey explorer! Do you want to learn more about the red planet?'
        },
        {
            id: 2,
            name: 'Bot',
            message: 'Let me know your name first.'
        }
    ])
    const [ questions, setQuestions ] = useState([])
    // **********

    // toggle questions window
    const [ questionsWindow, setQuestionsWindow ] = useState(false)

    // scroll down messages window ref
    const messagesWindow = useRef()

    // toggle chatbox
    const [ chatBox, setChatBox ] = useState(true)
    const handleChatbox = e => {
        e.preventDefault()
        const lastMsgID = messages[messages.length - 1].id

        if (e.target.username.value.length) {
            setUserName(e.target.username.value)
            setChatBox(!chatBox)
            setMessages([...messages, {
                id: lastMsgID + 1,
                name: 'Bot',
                message: `Nice to meet you ${e.target.username.value}! Now choose any of the questions you want to get an answer for.`
            }])

            // scroll down on new message
            scrollDown(messagesWindow)

            // get questions from API
            getQuestions()
                .then(ques => {
                    setQuestions(ques)
                    setQuestionsWindow(true)
                })
                .catch(err => console.error(err))
        } else {
            setMessages([...messages.map(msg => msg), {
                id: lastMsgID + 1,
                name: 'Bot',
                message: `I don't know your name yet...`
            }])
            // scroll down on new message
            scrollDown(messagesWindow)
        }
    }

    const askQuestion = selectQues => {
        const lastMsgID = messages[messages.length - 1].id
     
        getAnswer(selectQues.id)
            .then(ans => {
                setMessages([...messages, {
                    id: lastMsgID + 1,
                    name: userName,
                    message: selectQues.question
                }, {
                    id: lastMsgID + 2,
                    name: 'Bot',
                    message: ans.answer
                }])
                // scroll down on new message
                scrollDown(messagesWindow) 
            })
            .catch(err => console.error(err))
    }

    return (
        <div className='bot'>
            <div className="bot__close"
                onClick={handleBot}
            >
                <i className="fas fa-chevron-circle-left"></i>
            </div>
            <div className={`bot__questions ${ questionsWindow ? 'active' : '' }`}>
                <div className="bot__questions-head">
                    <i className="far fa-question-circle"></i>
                    <p>Questions</p>
                </div>
                <div className="bot__questions-body">
                    {
                        questions.length ? questions.map(ques => (
                            <p className="bot__questions-question" 
                                key={ques.id}
                                onClick={askQuestion.bind(this, ques)}
                            >
                                { `${ques.id}. ${ques.question}` }
                            </p>
                        )) : ''
                    }
                </div>
            </div>
            <div className={`bot__body ${chatBox ? 'active' : ''}`}>
                <div className="bot__body-history" ref={messagesWindow}>
                    {
                        messages.map(mssg => {
                            return (
                                mssg.name === 'Bot' ? (
                                    <div key={mssg.id} className="bot__history-message mssg--bot">
                                        <p className="bot__message-sendername">{ mssg.name }</p>
                                        <p className="bot__message-text">{ mssg.message }</p>
                                    </div>
                                ) : (
                                    <div key={mssg.id} className="bot__history-message mssg--user">
                                        <p className="bot__message-sendername">{ mssg.name }</p>
                                        <p className="bot__message-text">{ mssg.message }</p>
                                    </div>
                                )
                            )
                        })
                    }
                </div>
                
                <form className="bot__body-chatbox"
                    onSubmit={handleChatbox}
                >
                    <input type="text" 
                        placeholder="Type in your name"
                        name="username"
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
