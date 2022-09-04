function getDfsMaxNodes (grid) {
  
  var nodes = []
  var maxGrass = 0                //最多能烧的草坪数量
  if(grid.length){
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 1) {
        var visited = new Array(grid.length)
          .fill(0)
          .map(() => new Array(grid[0].length).fill(0))
        var tmp = []
        var dfsTmp = dfs(visited, tmp, grid, i, j)  //记录此次深度优先遍历点的个数
        if (maxGrass < dfsTmp) {
          
          maxGrass = dfsTmp        //更新记录
          nodes = JSON.parse(JSON.stringify(tmp))
          console.log(nodes)
          tmp = []
        }
      }
    }
    }
   console.log(nodes)  
  }
  return nodes 
}
function dfs (visited, nodes, grid, i, j) {
    if(grid.length){
    if (
      i < 0 ||
      i >= grid.length ||
      j < 0 ||
      j >= grid[0].length ||
      grid[i][j] === 0 ||
      visited[i][j] === 1
    )
    {
      return 0 //递归出口边界
    }
    visited[i][j] = 1 //避免重复计算
      nodes.push([i, j])
      console.log(nodes)
    var area = 1
    area += dfs(visited, nodes, grid, i + 1, j) //上面的1
    area += dfs(visited, nodes, grid, i - 1, j) //下面的1
    area += dfs(visited, nodes, grid, i, j + 1) //左面的1
    area += dfs(visited, nodes, grid, i, j - 1) //右面的1
    return area
    }
}

module.exports = { getDfsMaxNodes }
