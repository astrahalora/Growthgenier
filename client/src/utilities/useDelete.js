export function useDelete(projectId) {
    fetch(`http://127.0.0.1:5000/api/growth/${projectId}`, {
        method: 'DELETE'
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
    .catch(err => {
      console.error(err.message);
    });
}