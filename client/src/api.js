export const apiFetch = async(url,options = {}, logout) => {
    const response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });

    if(response.status === 401) {
        logout();
        window.location.href = "/";
        return null;
    }

    return response;
};