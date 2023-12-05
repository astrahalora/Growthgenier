export function usePatch(projectId, payload) {
    return fetch(`http://127.0.0.1:5000/api/growth/${projectId}`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
}