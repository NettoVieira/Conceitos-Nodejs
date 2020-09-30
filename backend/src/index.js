const express = require('express');
const {uuid} = require('uuidv4');

const app = express();

app.use(express.json());

/**
 * Métodos HTTP
 * 
 * GET: Utilizado quando queremos buscar informações do backend.
 * PUT: Utilizado quando eu quero altear alguma informação através de uma API.
 * PATCH: Quando eu quero alterar uma informação especifica no backend.
 * POST: Quando queremos criar uma informação no backend.
 * DELTE: Quando queremos deletar uma informação no backend.
*/

/**
 * Tipos de parametros
 * 
 * Query Params: principalmente para filtros e paginação /projects?title=react
 * Route Params: identificar recursos na hora de atualizar ou deletar
 * Request body: conteudo na hora de criar ou editar um recurso (JSON)
 */

 const projects = [];

app.get('/projects', (req, res) =>{
  const { title } = req.query;

  const result = title ? projects.filter(project => project.title.includes(title)) : projects;

  return res.json(result);
});

app.post('/projects', (req, res) => {
  const {title, owner} = req.body;

  const project = {id: uuid(), title, owner};

  projects.push(project);

  return res.json([ project ]);  
});

app.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const {title, owner} = req.body;

  const projectIndex = projects.findIndex(project => project.id === id); 

  if (projectIndex < 0) {
    return res.status(400).json({ error: 'Project not found.' })
  };

  const project = {
    id,
    title,
    owner
  };

  projects[projectIndex] = project;

  return res.json(project);  
});

app.delete('/projects/:id', (req, res) => {
  const { id } = req.params; 

  const projectIndex = projects.findIndex(project => project.id === id); 

  if (projectIndex < 0) {
    return res.status(400).json({ error: 'Project not found.' })
  };

  projects.splice(projectIndex, 1);


  return res.status(204).send();  
});


app.listen(3333, () => {
  console.log("🚀 the server is running on port 3333")
});

