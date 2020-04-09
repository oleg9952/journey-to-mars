class PubSub {
    instance: object;
    exists: boolean;
    subscribers: object;

    constructor() {
        if (PubSub.exists) return PubSub.instance;
        PubSub.instance = this;
        PubSub.exists = true;

        this.subscribers = {};
    }

    subscribe(event: string, callback: object) {
        if (!this.subscribers[event]) {
            this.subscribers[event] = [];
        }
        this.subscribers[event].push(callback);
        return this;
    }
    unsubscribe(event, callback) {
        if (!this.subscribers[event]) return;
        this.subscribers[event] = this.subscribers[event].filter(sub => sub !== callback);
        return this;
    }
    publish(event, data) {
        if (!this.subscribers[event]) return;
        this.subscribers[event].forEach(callback => {
            callback(data)
        })
        return this;
    }
}

export const pubSub = new PubSub();