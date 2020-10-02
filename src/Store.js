import React from "react";
import io from "socket.io-client"
export const CTX = React.createContext();

//need user, msg, topic
//state topic {msg} , {msg} , {msg} we do not want to lose messages

const initState = {
    Global:[
        {from: 'Miguel', msg: 'Hello'},
        {from: 'Ant', msg: 'Hello'},
        {from: 'Hojin', msg: 'Hello'},
    ],
    topic2:[
        {from: 'Miguel', msg: 'Hello'},
        {from: 'Miguel', msg: 'Hello'},
        {from: 'Miguel', msg: 'Hello'},

    ]
}
function reducer(state, action) {

    const { from, msg, topic } = action.payload;

    switch (action.type) {
        case 'RECIEVE_MESSAGE':
            return {
                ...state,
                [topic]: [
                    ...state[topic],
                    {from,msg}
                    ]
            }
        default:
            return state
    }
}

let socket;


function sendChatAction(value){

    socket.emit('chat-msg', value);

}


export default function Store(props) {

    if (!socket){
        socket = io(':3001')
    }

    const [allChats] = React.useReducer(reducer, initState)




    return (
        <CTX.Provider value={{allChats, sendChatAction}}>

            {props.children}

        </CTX.Provider>
    )
}


