/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable object-curly-spacing */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable array-bracket-spacing */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { render } from 'react-dom'
import { Support } from './support/Support.jsx'

export const renderComponents = () => {
    render(<Support />, document.getElementById('support'))
}


