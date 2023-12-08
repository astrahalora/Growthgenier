export function filterOutById(projects) {
    return [...projects].filter(item => item._id !== projectId); 
}