const DEV = 'http://localhost:4500/';
// const PROD = 'https://journey-to-mars-server.herokuapp.com/';

export const getQuestions = (): Promise<Array<object>> => {
    return new Promise((resolve, reject) => {
        fetch(`${DEV}bot/questions`)
            .then(res => resolve(res.json()))
            .catch(err => reject(err.json()));
    });
};

export const getAnswer = (id: number): Promise<object> => {
    return new Promise((reslove, reject) => {
        fetch(`${DEV}bot/answer/${id}`)
            .then(res => reslove(res.json()))
            .catch(err => reject(err.json()));
    });
};