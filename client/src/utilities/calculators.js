const calculateCompletionWidth = (project) => {
    const totalTasks = project.tasks.length;
    if (totalTasks === 0) return 0;

    const completedTasks = project.tasks.filter(task => task.taskStatus).length;
    const completionPercentage = (completedTasks / totalTasks) * 100;

    return Math.floor(completionPercentage);
}

export { calculateCompletionWidth }