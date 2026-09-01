
const API_URL = import.meta.env.VITE_API_URL;

console.log("API URL:", API_URL);

export const apiFetch = async (url, options = {}, logout) => {
    const response = await fetch(`${API_URL}${url}`, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });

    if (response.status === 401) {
        logout();
        window.location.href = "/";
        return null;
    }

    return response;
};
// const API_URL = import.meta.env.VITE_API_URL;

// export const apiFetch = async (url, options = {}, logout) => {
//     const response = await fetch(`${API_URL}${url}`, {
//         ...options,
//         headers: {
//             ...options.headers,
//             Authorization: `Bearer ${localStorage.getItem("token")}`
//         }
//     });

//     if (response.status === 401) {
//         logout();
//         window.location.href = "/";
//         return null;
//     }

//     return response;
// };