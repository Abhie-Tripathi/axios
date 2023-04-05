// Axios Global
 axios.defaults.headers.common["X-Auth-Token"] = "adhfopdajofjapgfloasgfoashogfadsoh"

// GET REQUEST
function getTodos() {
  axios.get("https://jsonplaceholder.typicode.com/todos", { params: { id: 2 } }).then((data) => showOutput(data))

}

// POST REQUEST
function addTodo() {
  axios.post("https://jsonplaceholder.typicode.com/todos", {
    firstname: "Abhinav",
    lastname: "Tripathi"
  }).then((data) => showOutput(data))
}

// PUT/PATCH REQUEST
function updateTodo() {
  axios.put("https://jsonplaceholder.typicode.com/todos/1", {
    Updated: "True",
    info: "the put request works fine"
  }).then((data) => showOutput(data))
}

// DELETE REQUEST
function removeTodo() {
  axios.delete("https://jsonplaceholder.typicode.com/todos/1").then((data) => showOutput(data))
}

// SIMULTANEOUS DATA
function getData() {
  axios.all([axios.get("https://jsonplaceholder.typicode.com/todos"),
  axios.get("https://jsonplaceholder.typicode.com/posts")])
    .then((data) => console.log(data))
}

// CUSTOM HEADERS
function customHeaders() {
  axios.get("https://jsonplaceholder.typicode.com/todos", {headers:{"what": "new",
  Authorization: "token"}}).then((data) => showOutput(data))
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    method: "post",
    url:"https://jsonplaceholder.typicode.com/todos",
    data: {
      title : "hello man"
    },
    transformResponse: axios.defaults.transformResponse.concat(data=>{
      data.title = data.title.toUpperCase();
      return data;
    })
  }
axios(options).then(res => showOutput(res))
}

// ERROR HANDLING
function errorHandling() {
  axios.get("https://jsonplaceholder.typicode.com/todoss", { params: { id: 2 } })
  .then((data) => showOutput(data))
  .catch((err) => {
    console.log(err.response.data);
    console.log(err.response.status);
    console.log(err.response.headers);
  if(err.response.status == 404){
    alert("Page Not Found")}
  else console.log(err.message)
  })
}

// CANCEL TOKEN
function cancelToken() {
  const source = axios.CancelToken.source();
  axios.get("https://jsonplaceholder.typicode.com/todos", { cancelToken: source.token })
  .then((data) => showOutput(data))
  .catch(thrown => {
    if(axios.isCancel(thrown)){
      console.log("Request canceled",thrown.message);
    }
  })
  if(true){
    source.cancel("Request Cancelled");
  }
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(config => {
  console.log(`${config.method} request sent to ${config.url} at ${new Date()}`)
  return config
})

// AXIOS INSTANCES
const axiosinstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
})

axiosinstance.get("/comments").then(res => showOutput(res))

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
