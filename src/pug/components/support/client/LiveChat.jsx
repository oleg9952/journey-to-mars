/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable object-curly-spacing */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable array-bracket-spacing */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react'

export const LiveChat = ({ handleLiveChat }) => {
    console.log('livechat')
    return (
        <div className='livechat'>
            <div className="livechat__close"
                onClick={handleLiveChat}
            >
                <i className="fas fa-chevron-circle-left"></i>
            </div>
            <div className="livechat__body">
                <h1>Live Chat</h1>
            </div>
        </div>
    )
}
