export const getQuestions = (): Promise<Array<object>> => {
    return new Promise((resolve, reject) => {
        fetch('https://journey-to-mars-server.herokuapp.com/bot/questions')
            .then(res => resolve(res.json()))
            .catch(err => reject(err.json()));
    });
};

export const getAnswer = (id: number): Promise<object> => {
    return new Promise((reslove, reject) => {
        fetch(`https://journey-to-mars-server.herokuapp.com/bot/answer/${id}`)
            .then(res => reslove(res.json()))
            .catch(err => reject(err.json()));
    });
};