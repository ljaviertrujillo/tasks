const GET_PROJECTS = "GET_PROJECTS";
const GET_TASKS = 'GET_TASKS'
const GET_SUBTASKS = 'GET_SUBTASKS'
const EDIT_PROJECT = "EDIT_PROJECT";
const EDIT_TASK = "EDIT_TASK";
const EDIT_SUBTASK = "EDIT_SUBTASK";
const FAVORITE_PROJECT = "FAVORITE_PROJECT";
const TASK_STATE = "TASK_STATE";
const FETCH_ERROR = 'FETCH_ERROR'

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_PROJECTS:
      return {
          loading: false,
          projects: action.payload,
          error: null
      };
    case FAVORITE_PROJECT:
      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project.id === action.payload) {
            return { ...project, favorite: !project.favorite };
          } else {
            return project;
          }
        }),
      };
    case TASK_STATE:
      return {
        ...state,
        projects: state.projects.map(project => {
          const {tasks} = project
          if(project.id === action.payload.projectId){
            return {
              ...project,
              tasks: tasks.map(task => {
                if(task.id === action.payload.taskId){
                  return {
                    ...task,
                    status: action.payload.status
                  }
                } else{
                  return task
                }
              })
            }
          } else{
            return project
          };
        })
      };
    case FETCH_ERROR:
      return {
          loading: false,
          projects: [],
          error: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
