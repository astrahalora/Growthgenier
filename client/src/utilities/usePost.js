export function usePost(body) {
    return fetch("http://127.0.0.1:5000/api/growth", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(body)
    }).then(res => res.json());
}