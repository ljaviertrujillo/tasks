const GET_PROJECTS = "GET_PROJECTS";
const PROJECT_FORM = 'PROJECT_FORM';
const TASK_FORM = 'TASK_FORM';
const SUBTASK_FORM = 'SUBTASK_FORM';
const MEMBER_FORM = 'MEMBER_FORM';
const RESET_FORMS = 'RESET_FORMS';
const TASKS_VIEW = 'TASKS_VIEW';
const RESET_VIEW = 'RESET_VIEW';
const FAVORITE_PROJECT = "FAVORITE_PROJECT";
const TASK_STATE = "TASK_STATE";
const EXPAND_TASK = 'EXPAND_TASK';
const FETCH_ERROR = 'FETCH_ERROR';

const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state,
          loading: false,
          projects: action.payload,
          error: null
      };
    case PROJECT_FORM:
      return {
        ...state,
        projectForm: !state.projectForm
      }
    case TASK_FORM:
      return {
        ...state,
        taskForm: !state.taskForm
      }
    case SUBTASK_FORM:
      return {
        ...state,
        subtaskForm: !state.subtaskForm
      }
    case MEMBER_FORM:
      return {
        ...state,
        memberForm: !state.memberForm
      }
    case RESET_FORMS:
      return{
        ...state,
        projectForm: false,
        taskForm: false,
        memberForm: false,
      }
    case TASKS_VIEW:
      return {
        ...state,
        tasksView: action.payload
      }
    case RESET_VIEW:
      return{
        ...state,
        tasksView: 'board'
      }
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
        ...state,
          loading: false,
          projects: [],
          error: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
