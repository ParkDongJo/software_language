// 배열로 그래프 표현
/*
    1 - 2 - 3
    |   |
    4 - 5
    |
    6
    위와 같은 그래프 구조가 있다고 가졍
*/

let graph = [[0,1,0,1,0,0],
            [1,0,1,0,1,0],
            [0,1,0,0,0,0],
            [1,0,0,0,1,1],
            [0,1,0,1,0,0],
            [0,0,0,1,0,0]
            ]
let visited = new Array(graph.length).fill(false);

function bfs(matrix, visited, start) {
    let queue = [];
    queue.push(start);
    visited[start] = true;

    while (queue.length !== 0) {
        let vertex = queue.shift();
        console.log((vertex+1) +" ");

        for (let i=0; i<matrix.length; i++) {
            if (matrix[vertex][i] == 1 && !visited[i]) {
                queue.push(i);
                visited[i] = true;
            }
        }
    }
}

bfs(graph, visited, 0);


function dfs(matrix, visited, start) {
    let stack = [];
    stack.push(start);
    visited[start] = true;

    while(stack.length !== 0) {
        let vertex = stack.pop();
        console.log((vertex+1) + " ");

        for (let i=0; i<matrix.length; i++) {
            if (matrix[vertex][i] == 1 && !visited[i]) {
                stack.push(i);
                visited[i] = true
            }
        }
    }
}

// dfs(graph, visited, 0);