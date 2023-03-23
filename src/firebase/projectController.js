import { db } from './index';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';

export const addNewProject = async project => {
    const newProject = JSON.parse(JSON.stringify(project))
    await addDoc(collection(db, 'projects'), newProject)
}

export const getProjects = async () => {
    const querySnapshot = await getDocs(collection(db, 'projects'))
    const projects = querySnapshot.docs.map(async (doc) => {
        const projectData = doc.data()
        const projectId = doc.id
        const tasksQuerySnapshot = await getDocs(collection(db, 'projects', projectId, 'tasks'))
        const tasks = tasksQuerySnapshot.docs.map(async(taskDoc) => {
            const taskData = taskDoc.data()
            const taskId = taskDoc.id
            const subtaskQuerySnapshot = await getDocs (collection(db, 'projects', projectId, 'tasks', taskId, 'subtasks'))
            const subtasks = subtaskQuerySnapshot.docs.map(subtaskDoc => ({
                ...subtaskDoc.data(), id: subtaskDoc.id
            }))
            return {
                ...taskData, subtasks, id: taskId
            }
        })
        const tasksData = await Promise.all(tasks);
        return {...projectData, tasks: tasksData, id:projectId}
    })
    const projectsData = await Promise.all(projects)
    return projectsData
}

export const deleteProject = async id => {
    await deleteDoc(doc(db, 'projects', id))
}

export const favoriteProject = async (id, favorite) => {
    await updateDoc(doc(db, 'projects', id), {
        favorite: !favorite
    })
}

export const addNewTask = async (task) => {
    const projectRef = doc(db, 'projects', task.projectId)
    const taskRef = collection(projectRef, 'tasks')
    const newTask = JSON.parse(JSON.stringify(task))
    await addDoc(taskRef, newTask)
}

export const deleteTask = async (task) => {
    const projectRef = doc(db, 'projects', task.projectId)
    const taskRef = doc(collection(projectRef, 'tasks'), task.id)
    await deleteDoc(taskRef)
}

export const taskStatus = async (task, status) => {
    const projectRef = doc(db, 'projects', task.projectId)
    const taskRef = doc(collection(projectRef, 'tasks'), task.id)
    await updateDoc(taskRef, {
        status: status
    })
}

export const addNewSubtask = async (subtask) => {
    const newsubtask = JSON.parse(JSON.stringify(subtask));
    const projectRef = doc(db, 'projects', subtask.projectId)
    const taskRef = doc(collection(projectRef, 'tasks'), subtask.taskId)
    const subtaskRef = collection(taskRef, 'subtasks')
    await addDoc(subtaskRef, newsubtask)
}

export const deleteSubtask = async (subtask) => {
    const projectRef = doc(db, 'projects', subtask.projectId)
    const taskRef = doc(collection(projectRef, 'tasks'), subtask.taskId)
    const subtaskRef = doc(collection(taskRef, 'subtasks'), subtask.id)
    await deleteDoc(subtaskRef)
}

export const completedSubtask = async (subtask) => {
    const projectRef = doc(db, 'projects', subtask.projectId)
    const taskRef = doc(collection(projectRef, 'tasks'), subtask.taskId)
    const subtaskRef = doc(collection(taskRef, 'subtasks'), subtask.id)
    await updateDoc(subtaskRef, {
        completed: !subtask.completed
    })
}