import React from 'react'

function Message({children,type}) {
    return (
    <div className={`alert alert-${type}`} role="alert">
            {children}
    </div>
    )
}

export default Message;