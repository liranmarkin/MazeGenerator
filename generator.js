var app = angular.module("maze",[]);

app.controller("mazeController",function(){
	this.graph = [];
	this.walls = [];
	this.visited = [];
	this.solution = [];
	this.n = 10; //maze size
	
	this.initMaze = function(){
		var n = this.n;
		this.graph = [];
		this.visited = new Array(n*n);
		this.solution = new Array(n*n);
		for(var i = 0;i<n*n;i++){
			this.graph.push([]);
			this.walls.push([]);
			if(i%n != n-1){
				this.graph[i].push(i+1);
				this.graph[i+1].push(i);
			}
			if(i/n != n-1){
				this.graph[i].push(i+n);
				this.graph[i+n].push(i);
			}
		}
		for(var i = 0;i<n*n;i++){
			this.graph[i].sort(function() {return .5 - Math.random();}); // shuffle neighboors of every cell
		} 
		this.solution[n*n-1] = 1;
		generateMaze(0); // 0 is startCell
	};
	
	function generateMaze(u){
		this.visited[u] = 1;
		for(var v in this.graph[u]){
			if(this.visited[u] == 0){
				generateMaze(v);
				if(this.solution[v] == 1){
					this.solution[u] = 1;
				}
			}
			else{
				this.walls[u].push(v);
				this.walls[v].push(u);
			}
		}
		
	}
});
