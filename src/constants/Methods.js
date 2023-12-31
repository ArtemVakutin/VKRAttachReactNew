import {sfEqual} from "spring-filter-query-builder";
import axios from "axios";
import {GET_LECTURERS_URL, GET_ORDERS_URL, GET_THEMES_URL, GET_USER_URL, GET_USERS_URL} from "./LinkConstants";


export const fetchSimpleUserById = (setUser, setError, id) => {
    const config = {
        params: {
            id,
        }
    }
    axios.get(GET_USER_URL, config).then(response => {
        setUser(response.data)
        setError("")
    }).catch(ex => {
        if (ex.response) {
            console.log(ex.response.data);
            console.log(ex.response.status);
            console.log(ex.response.headers);
            setUser([])
            setError("Пользователей с такими данными не найдено")

        } else if (ex.request) {
            console.log("SERVER IS NOT AVAILABLE");
            setUser([])
            setError("Проверьте ваш выход в сеть")
        } else {
            setUser([])
            setError("Что-то в этом мире пошло не так")
        }
    })
}

export const fetchSimpleUsers = (setUsers, setError=()=>{}, {role = "USER", faculty, yearOfRecruitment}) => {
    let filter = null;
    console.log(role + faculty + yearOfRecruitment)
    role && (filter = createFilters(filter, "role", role));
    faculty && (filter = createFilters(filter, "faculty", faculty));
    yearOfRecruitment && (filter = createFilters(filter, "yearOfRecruitment", yearOfRecruitment));

    const config = {
        params: {
            filter,
        }
    }

    filter && axios.get(GET_USERS_URL, config).then(response => {
        setUsers(response.data)
        setError("")
    }).catch(ex => {
        if (ex.response) {
            console.log(ex.response.data);
            console.log(ex.response.status);
            console.log(ex.response.headers);
            setUsers([])
            setError("Пользователей с такими данными не найдено")

        } else if (ex.request) {
            console.log("SERVER IS NOT AVAILABLE");
            setUsers([])
            setError("Походу интернета тютю")
        } else {
            setUsers([])
            setError("Что-то в этом мире пошло не так")
        }
    })
}

export const fetchThemes = (setThemes, setError=()=>{}, {department, faculty, year}) => {
    const config = {
        params: {
            department,
            faculty,
            year
        }
    }

    department && faculty && year && axios.get(GET_THEMES_URL, config).then(response => {
        setThemes(response.data)
        setError("")
    }).catch(ex => {
        if (ex.response) {
            console.log(ex.response.data);
            console.log(ex.response.status);
            console.log(ex.response.headers);
            setThemes([])
            setError("Тем с такими данными не найдено")

        } else if (ex.request) {
            console.log("SERVER IS NOT AVAILABLE");
            setThemes([])
            setError("Походу интернета тютю")
        } else {
            setThemes([])
            setError("Что-то в этом мире пошло не так")
        }
    })
}

export const fetchLecturers = (setLecturers, setError = Function.prototype, department) => {

    const config = {
        params: {
            department,
        }
    }
    axios.get(GET_LECTURERS_URL, config).then(response => {
        setLecturers(response.data)
        setError("")
    }).catch(ex => {
        if (ex.response) {
            console.log(ex.response.data);
            console.log(ex.response.status);
            console.log(ex.response.headers);
            setLecturers([])
            setError("Научных руководителей с такими данными не найдено")

        } else if (ex.request) {
            console.log("SERVER IS NOT AVAILABLE");
            setLecturers([])
            setError("Сервер не отвечает")
        } else {
            setLecturers([])
            setError("Что-то в этом мире пошло не так, но мы это исправим")
        }
    })
}

//Возвращает заявки по Id юзера.
export const fetchOrdersByUser = (setOrders, setError, userId) => {

    const config = {
        params: {
            userId: userId,
        }
    }

    axios.get(GET_ORDERS_URL, config).then(response => {
        setOrders(response.data)
        setError("")
    }).catch(ex => {
        if (ex.response) {
            console.log(ex.response.data);
            console.log(ex.response.status);
            console.log(ex.response.headers);
            setOrders([])
            setError("Заявок с такими данными не найдено")

        } else if (ex.request) {
            console.log("SERVER IS NOT AVAILABLE");
            setOrders([])
            setError("Сервер не отвечает")
        } else {
            setOrders([])
            setError("Что-то в этом мире пошло не так")
        }
    })
}

export const fetchOrders = (setOrders, setError, {department = null, faculty = null, year = null, status = null, themeId = null}) => {
    let filter = null;

    status && (filter = createFilters(filter, "orderStatus", status));
    faculty && (filter = createFilters(filter, "user.faculty", faculty));
    department && (filter = createFilters(filter, "theme.department", department));
    year && (filter = createFilters(filter, "user.yearOfRecruitment", year));
    themeId && (filter = createFilters(filter, "theme.themeId", themeId))

    console.log(filter + "   в итоге фильтр")

    const config = {
        params: {
            filter,
        }
    }

    axios.get(GET_ORDERS_URL, config).then(response => {
        setOrders(response.data)
        setError("")
    }).catch(ex => {
        if (ex.response) {
            console.log(ex.response.data);
            console.log(ex.response.status);
            console.log(ex.response.headers);
            setOrders([])
            setError("Заявок с такими данными не найдено")

        } else if (ex.request) {
            console.log("SERVER IS NOT AVAILABLE");
            setOrders([])
            setError("Сервер не отвечает")
        } else {
            setOrders([])
            setError("Что-то в этом мире пошло не так")
        }
    })
}



export const createFilters = (filter, selector, value) => {
    console.log("Метод createFilters вызван")
    console.log(filter + "   " + selector + "   " +value)

    if (filter == null) {
        filter = sfEqual(selector, value).toString();
    } else if (filter != null) {
        filter = filter + " AND " + sfEqual(selector, value).toString();
    }

    console.log(filter + "   после метода")
    return filter;

}
