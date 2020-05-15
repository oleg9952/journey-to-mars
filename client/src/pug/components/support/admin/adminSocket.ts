/* eslint-disable @typescript-eslint/no-unused-vars */
import io from 'socket.io-client';
import { notification } from '../../notification/notification';
import { config } from '../../../../../config';

export const adminSocket = (user: object): any => {
    if (!user) return;
    if (user.type !== 'admin') return;
    const socket: any = io.connect(config.SERV_CONNECT);

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