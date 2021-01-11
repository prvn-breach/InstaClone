export const setFileUrl = (path) => {
    if (path && !path.includes("http://localhost:5000")) {
        return "http://localhost:5000/"+path;
    }
    return path;
}