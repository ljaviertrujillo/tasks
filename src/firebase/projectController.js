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

export const addNewTask = async (projectId, task) => {
    const projectRef = doc(db, 'projects', projectId)
    const taskRef = collection(projectRef, 'tasks')
    const newTask = JSON.parse(JSON.stringify(task))
    await addDoc(taskRef, newTask)
}

export const deleteTask = async (projectId, taskId) => {
    const projectRef = doc(db, 'projects', projectId)
    const taskRef = doc(collection(projectRef, 'tasks'), taskId)
    await deleteDoc(taskRef)
}

export const taskStatus = async (projectId, taskId, status) => {
    const projectRef = doc(db, 'projects', projectId)
    const taskRef = doc(collection(projectRef, 'tasks'), taskId)
    await updateDoc(taskRef, {
        status: status
    })
}

export const addNewSubtask = async (projectId, taskId, subtask) => {
    const newsubtask = JSON.parse(JSON.stringify(subtask));
    const projectRef = doc(db, 'projects', projectId)
    const taskRef = doc(collection(projectRef, 'tasks'), taskId)
    const subtaskRef = collection(taskRef, 'subtasks')
    await addDoc(subtaskRef, newsubtask)
}

export const deleteSubtask = async (projectId, taskId, subtaskId) => {
    const projectRef = doc(db, 'projects', projectId)
    const taskRef = doc(collection(projectRef, 'tasks'), taskId)
    const subtaskRef = doc(collection(taskRef, 'subtasks'), subtaskId)
    await deleteDoc(subtaskRef)
}

export const completedSubtask = async (projectId, taskId ,subtaskId, completed) => {
    const projectRef = doc(db, 'projects', projectId)
    const taskRef = doc(collection(projectRef, 'tasks'), taskId)
    const subtaskRef = doc(collection(taskRef, 'subtasks'), subtaskId)
    await updateDoc(subtaskRef, {
        completed: !completed
    })
}