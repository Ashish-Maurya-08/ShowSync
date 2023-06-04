import axios from "axios";


const userData = localStorage.getItem("data");
let userId, token;
if (userData) {
    ({ userId, token } = JSON.parse(userData));
}

function CheckToken() {
    const userData = localStorage.getItem("data");
    if (userData) {
        ({ userId, token } = JSON.parse(userData));
    }
    else {
        return false;
    }
    api = axios.create({
        baseURL: "https://show-sync-backend.vercel.app/",
        headers: {
            "authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Allow-Control-Allow-Origin": "*",

        },
  
    })
    return true;
}


let api = axios.create({
    baseURL: "https://show-sync-backend.vercel.app/",
    headers: {
        "authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Allow-Control-Allow-Origin": "*",
    }
})

export async function GetList(id) {
    if (!CheckToken()) {
        return false;
    };

    const payload = {
        userId: id
    }
    const res = await api.post(`/list`, payload)
    .catch((err) => {
        if(err.response.status===401){
            return false;
        }
        alert(err.response.data.message);
        return err.status;
    })
    return res.data;
}

export async function getUser(id) {
    const res = await api.post(`/list/user`, { userId: id })
        .catch((err) => {
            return err.response.status;
        })
    return res;
}

export async function getFriends() {
    if (!CheckToken()) {
        return false;
    };
    const res = await api.post(`/friends`, { userId: userId })
    console.log(res);
    return res.data;
}

export async function AddtoList(type, id, mtype) {
    if (!CheckToken()) {
        return false;
    };
    const payload = {
        userId: userId,
        type: type,
        movieId: id,
        mtype: mtype
    }

    const res = await api.post(`/list/add`, payload)
        .catch((err) => {
            if (err.response.status === 401) {
                return false;
            }
            alert(err.response.data.message);
            return err.status;
        })
    return res.status;
}

export async function removeFromList(type, id, mtype) {
    if (!CheckToken()) {
        return false;
    };
    const payload = {
        userId: userId,
        type: type,
        movieId: id,
        mtype: mtype
    }
    const res = await api.post(`/list/remove`, payload)
        .catch((err) => {
            if (err.response.status === 401) {
                return false;
            }
            alert(err.response.data.message);
            return err.status;
        })
    return res.status;

}

export async function setWatched(id, type) {
    if (!CheckToken()) {
        return false;
    };
    const payload = {
        userId: userId,
        movieId: id,
        mtype: type
    }
    const res = await api.post(`/list/update`, payload)
        .catch((err) => {
            if (err.response.status === 401) {
                return false;
            }
            alert(err.response.data.message);
            return err.status;
        })
    return res.status;
}


export async function getDetail(id) {
    const res = await api.post(`/auth/user`, { id: id })
        .catch((err) => {
            alert(err.response.data.message);
            return false;
        })
    return res.data;
}




export async function verifyUser() {
    if (!CheckToken()) {
        console.log(CheckToken());
        return false;
    };
    try {
        const res = await api.post(`/auth/verify`)
        return res;
    }
    catch (err) {
        console.log(err);
        return false;
    }
} 