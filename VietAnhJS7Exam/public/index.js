fetch("http://127.0.0.1:3000/api/v1/todos")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    let title = document.getElementsByClassName("todo-list")[0];
  });
