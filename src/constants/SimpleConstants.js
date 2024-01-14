export const DOMAIN_ENTITIES = ["departments", "faculties", "years", "ranks", "academictitles", "academicdegrees", "ranktypes"];
export const SIMPLE_GLOBAL_ERROR = ["В настоящий момент сервер не отвечает, перезагрузите страницу позднее"];

export const REQUEST_STATUS = [
    {
        value:"UNDER_CONSIDERATION",
        label: "На рассмотрении",
    },
    {
        value:"REFUSED",
        label: "Отказано",
    },
    {
        value:"ACCEPTED",
        label: "Одобрено",
    }
]

export const ROLES = [
    {
        value: "USER",
        label: "USER"
    },
    {
        value: "MODERATOR",
        label: "MODERATOR"
    },
    {
        value: "ADMIN",
        label: "ADMIN"
    },

]

const role = new Map();
role.set("USER", "USER");
role.set("MODERATOR", "MODERATOR");
role.set("ADMIN", "ADMIN");

export const SIGN_IN_CONFIG = {
    withCredentials: true,
    headers: {Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"}
}

export const LINKS_BY_ROLE = [
    {
        roleName: "NONE",
        to: "/auth",
        text: "Войти"
    },
    {
        roleName: "NONE",
        to: "/auth/registration",
        text: "Зарегистрироваться"
    },
    {
        roleName: "USER",
        to: "/user",
        text: "Заявки"
    },
    {
        roleName: "USER",
        to: "/user/docs",
        text: "Документы"
    },
    {
        roleName: "MODERATOR",
        to: "/moderator",
        text: "Заявки"
    },
    {
        roleName: "MODERATOR",
        to: "/moderator/docs",
        text: "Документы"
    },
    {
        roleName: "MODERATOR",
        to: "/moderator/lecturers",
        text: "Научные руководители"
    },
    {
        roleName: "MODERATOR",
        to: "/moderator/themes",
        text: "Темы"
    },
    {
        roleName: "ADMIN",
        to: "/admin",
        text: "Заявки"
    },
    {
        roleName: "ADMIN",
        to: "/admin/users",
        text: "Пользователи"
    },
    {
        roleName: "ADMIN",
        to: "/admin/themes",
        text: "Темы ВКР"
    },
    {
        roleName: "ADMIN",
        to: "/admin/lecturers",
        text: "Преподаватели"
    },
    {
        roleName: "ADMIN",
        to: "/admin/addfiles",
        text: "Добавить данные"
    },
    {
        roleName: "ADMIN",
        to: "/admin/getfiles",
        text: "Получить документы"
    }
]
