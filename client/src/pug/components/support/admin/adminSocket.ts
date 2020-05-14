/* eslint-disable @typescript-eslint/no-unused-vars */
import io from 'socket.io-client';
import { notification } from '../../notification/notification';

export const adminSocket = (user: object): any => {
    if (!user) return;
    if (user.type !== 'admin') return;
    const socket: any = io.connect('http://localhost:4500/');

    // ADMIN CONNECT
    socket.emit('adminConnect', user.uid);
    // NOTIFY ADMIN ABOUT NEW USER IN THE CHAT
    socket.on('newCustomerInTheChat', (customer: {
        userId: string,
        userName: string
    }) => {
        notification({
            code: 'newCustomerInTheChat',
            message: `${customer.userName} is in the chat now.`
        });
    });

    return socket;
};