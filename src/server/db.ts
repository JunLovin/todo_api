const tasks = [
    {
        id: 1,
        title: 'Tarea 1',
        description: 'Descripción de la tarea 1 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi dignissimos dicta maxime maiores earum excepturi sequi explicabo dolor eaque delectus, minus dolorum impedit atque qui eligendi corporis aliquam, nisi quis?',
        completed: false
    },
]

const createTask = (title:string, description:string) => {
    const newTask = {
        id: tasks.length + 1,
        title,
        description,
        completed: false
    }
    tasks.push(newTask)
    return newTask
}

const findTask = (id:number) => {
    return tasks.find(task => task.id === id)
}

const deleteTask = (id:number) => {
    const index = tasks.findIndex(task => task.id === id)
    if (index === -1) return null
    const deletedTask = tasks.splice(index, 1)
    return deletedTask[0]
}

const updateTask = (id:number, title:string, description: string) => {
    const index = tasks.findIndex(task => task.id === id)
    if (index === -1) return null
    const updatedTask = {
        id: id,
        title: title,
        description: description,
        completed: false,
    }
    tasks[index] = updatedTask
    return tasks
}

export { tasks, createTask, findTask, deleteTask, updateTask }