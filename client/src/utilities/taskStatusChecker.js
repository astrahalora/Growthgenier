const checkTaskStatus = (taskStatus, element) => {
    if (element === "text") {
        return taskStatus ? "text-decoration-line-through" : null;
    } else {
        return taskStatus ? "bkg-dark-fill" : null;
    }
}

export { checkTaskStatus }