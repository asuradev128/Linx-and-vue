import { authHeader } from "@/helpers";

export const analysticService = {
    getAll,
    getAnalystic,
    create,
    update,
    delete: _delete
};

function getAll(){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/analystics`, requestOptions).then(handleResponse);
}
function getAnalystic(id) {
    const requestOptions ={
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`/api/analystics/${id}`, requestOptions).then(handleResponse);
}

function create(analystic){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ analystic: analystic })
    };

    return fetch(`/api/analystics`, requestOptions).then(handleResponse);
}

function update(id, analystic){
    const requestOptions = {
        method: 'PATCH',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ analystic: analystic })
    };
    return fetch(`/api/analystics/${id}`, requestOptions).then(handleResponse);
}

function _delete(id){
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(`/api/analystics/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if(!response.ok) {
            if(response.status === 401) {
                _delete();
                location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}