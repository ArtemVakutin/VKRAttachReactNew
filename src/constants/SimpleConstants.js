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

export const CONFIG_TYPES = [
    {
        value: "DEPARTMENT",
        label: "Кафедра"
    },
    {
        value: "FACULTY",
        label: "Специальность (направление подготовки)"
    },
    {
        value: "YEAR",
        label: "Год набора"
    },
    {
        value: "RANK",
        label: "Звание обучающегося"
    },
    {
        value: "LECTURER_RANK",
        label: "Звание преподавателя"
    },
    {
        value: "RANK_TYPE",
        label: "Вид звания"
    },
    {
        value: "ACADEMIC_DEGREE",
        label: "Ученая степень"
    },
    {
        value: "ACADEMIC_TITLE",
        label: "Ученое звание"
    },
    {
        value: "LECTURER_POSITION",
        label: "Должность преподавателя"
    },
    {
        value: "USER_POSITION",
        label: "Должность обучающегося"
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


