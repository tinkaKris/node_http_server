import fs from 'node:fs/promises'

const createHtmlTemplate = (htmlInjection) => `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTTP server</title>
</head>

<body style="font-family: Arial, Helvetica, sans-serif;">

  <div style="width: min(100% - 40px, 992px); margin-inline: auto;">
    ${htmlInjection}
  </div>

</body>

</html>`

const rootHtmlTemplate = createHtmlTemplate('<h1>Hello from HTTP server</h1><a href="/form">Forms</a>&nbsp;&nbsp;<a href="/todos">Todos</a>')

const notFoundTemplate = createHtmlTemplate('<h1>404 Not Found</h1>')

let formTemplate

const loadFormTemplate = async () => {
  try {
    formTemplate = await fs.readFile('./template/form.html', 'utf-8')
  } catch (err) {
    console.error('File read error:', err)
  }
}

loadFormTemplate().catch(console.log)

const generateTodosTemplate = () => {
  const headerHtml = '<h1>Todos List</h1>'

  const todosHtml = todos.map(todo => {
    return `
    <div style="margin-bottom: 10px; padding: 10px; border: 1px solid #ccc;">
      <h2>${todo.title}</h2>
      <p>ID: ${todo.id}</p>
      <p>User ID: ${todo.userId}</p>
      <p>Completed: ${todo.completed ? 'Yes' : 'No'}</p>
    </div>
    `
  }).join('')


  const buttonHtml = `<button onclick="location.href = '/form'" type="button">Add new todo</button>`

  return createHtmlTemplate(`${headerHtml}${todosHtml}${buttonHtml}`)
}

const todos = [
  {
    'userId': 1,
    'id': 1,
    'title': 'delectus aut autem',
    'completed': false
  },
  {
    'userId': 1,
    'id': 2,
    'title': 'quis ut nam facilis et officia qui',
    'completed': false
  },
  {
    'userId': 1,
    'id': 3,
    'title': 'fugiat veniam minus',
    'completed': false
  },
  {
    'userId': 1,
    'id': 4,
    'title': 'et porro tempora',
    'completed': true
  },
  {
    'userId': 1,
    'id': 5,
    'title': 'laboriosam mollitia et enim quasi adipisci quia provident illum',
    'completed': false
  }
]

export { rootHtmlTemplate, notFoundTemplate, formTemplate, todos, generateTodosTemplate }
