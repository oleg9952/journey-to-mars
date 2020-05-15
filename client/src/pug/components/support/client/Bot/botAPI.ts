import { config } from '../../../../../../config';

export const getQuestions = (): Promise<Array<object>> => {
    return new Promise((resolve, reject) => {
        fetch(`${config.SERV_CONNECT}bot/questions`)
            .then(res => resolve(res.json()))
            .catch(err => reject(err.json()));
    });
};

export const getAnswer = (id: number): Promise<object> => {
    return new Promise((reslove, reject) => {
        fetch(`${config.SERV_CONNECT}bot/answer/${id}`)
            .then(res => reslove(res.json()))
            .catch(err => reject(err.json()));
    });
};