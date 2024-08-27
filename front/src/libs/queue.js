class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(element) {
        this.items.push(element);
    }

    dequeue() {
        if (this.isEmpty()) {
            return "Queue is empty";
        }
        return this.items.shift();
    }

    front() {
        if (this.isEmpty()) {
            return "Queue is empty";
        }
        return this.items[0];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    size() {
        return this.items.length;
    }

    printQueue() {
        return this.items.join(" ");
    }
}

export default Queue;

// 큐 사용 예시
// let queue = new Queue();
// queue.enqueue(1);
// queue.enqueue(2);
// queue.enqueue(3);
// console.log(queue.printQueue());  // 출력: "1 2 3"
// console.log(queue.dequeue());     // 출력: 1
// console.log(queue.front());       // 출력: 2
// console.log(queue.printQueue());  // 출력: "2 3"
// 큐를 그냥 리스트로 출력하면
