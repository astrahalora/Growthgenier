export function filterOutById(projects, projectId) {
    return [...projects].filter(item => item._id !== projectId); 
}