function dijkstra(graph, start) {
    const distances = {};
    const previousVertices = {};
    const pq = new PriorityQueue();
  
    // Initialize distances and previousVertices
    for (const vertex in graph) {
      distances[vertex] = Infinity;
      previousVertices[vertex] = null;
      pq.enqueue([vertex, Infinity]);
    }
  
    // Set distance of start vertex to 0
    distances[start] = 0;
    pq.enqueue([start, 0]);
  
    while (!pq.isEmpty()) {
      const smallest = pq.dequeue();
      const currentVertex = smallest[0];
      const currentDistance = smallest[1];
  
      if (currentDistance > distances[currentVertex]) {
        continue;
      }
  
      for (const neighbor in graph[currentVertex]) {
        const distanceToNeighbor = currentDistance + graph[currentVertex][neighbor];
  
        if (distanceToNeighbor < distances[neighbor]) {
          distances[neighbor] = distanceToNeighbor;
          previousVertices[neighbor] = currentVertex;
          pq.enqueue([neighbor, distanceToNeighbor]);
        }
      }
    }
  
    return { distances, previousVertices };
  }
  
  class PriorityQueue {
    constructor() {
      this.collection = [];
    }
  
    enqueue(element) {
      if (this.isEmpty()) {
        this.collection.push(element);
      } else {
        let added = false;
        for (let i = 0; i < this.collection.length; i++) {
          if (element[1] < this.collection[i][1]) {
            this.collection.splice(i, 0, element);
            added = true;
            break;
          }
        }
        if (!added) {
          this.collection.push(element);
        }
      }
    }
  
    dequeue() {
      return this.collection.shift();
    }
  
    isEmpty() {
      return this.collection.length === 0;
    }
  }
  
  // Example usage:
  const graph = {
    'A': { 'B': 4, 'C': 2 },
    'B': { 'A': 4, 'C': 5, 'D': 10 },
    'C': { 'A': 2, 'B': 5, 'D': 3 },
    'D': { 'B': 10, 'C': 3 }
  };
  
  console.log(dijkstra(graph, 'A'));