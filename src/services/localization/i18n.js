import i18next from "i18next";
import {initReactI18next} from "react-i18next";

const resources = {
    en: {
        translation: {
            widgets: {
                date_time_label: "Date & Time",
                date_label: "Date"
            },
            returned: "Returned",
            edit: "Edit",
            accepted: "Accepted",
            files: {
                choose_files: "Choose files",
                view_file: "View",
                remove_file: "Remove"
            },
            notifications: {
                title: "Notifications",
                unread: "Unread",
                read: "Read",
            },
            submit: "Submit",
            open: "Open",
            appbar: {
                log_out: "Log out",
                tasks: "Tasks",
                notifications: "Notifications"
            },
            task: {
                leave_page: "Are you sure you want to leave this page?",
                returned_message: "This task was returned",
                open_previous: "Open previous",
                release: "Release",
                submit: "Submit",
                saved_message: "Saved",
                divider_text: "Current Task"
            },
            sign_up_page: {
                title: "Register",
                description1: "Click the button (Login or Register)",
                description2: "If you don't have a Google account, please create one.",
                sign_up_button: "Log in with Google",
                phone_number: "Phone",
                otp_code: "Code",
                request_code_button: "Request code",
                submit_code_button: "Submit",
                divider_text: "or Log in with Phone",
                invalid_code_error: "Invalid verification code",
                invalid_phone_number: "Invalid number format",
                unknown_login_with_phone_error: "Unknown error",
            },
            campaigns: {
                user_campaigns: "My campaigns",
                selectable_campaigns: "Available campaigns",
                join: "Join",
                details: "Details",
            },
            list_header: {
                create: "Create",
                grid: "Grid",
                list: "List"
            },
            tasks: {
                title: "Tasks",
                completed: "Completed",
                uncompleted: "Uncompleted",
                available: "Available",
            },
            filter: {
                chain_label: "Chain",
                search_stage_label: "Desired Stage",
                stage_label: "Filter Stage",
                filter_label: "Filter",
                field_label: "Field",
                type_label: "Field's type",
                types: ["Text", "Number", "Date-Time"],
                conditions_label: "Conditions",
                value_label: "Value",
                value_description: "If field's type is Date-Time, please write in format year-month-day. Example: 2022-04-03",
                operator_label: "Operators",
                operators: ["Equal", "Not equal", "Less", "Greater", "Less or Equal", "Greater or Equal"],
                search_button: "Search"
            }
        },
    },
    ru: {
        translation: {
            widgets: {
                date_time_label: "Дата и Время",
                date_label: "Дата"
            },
            returned: "Возвращено",
            edit: "Редактировать",
            accepted: "Получен",
            files: {
                choose_files: "Выбрать файлы",
                view_file: "Посмотреть файл",
                remove_file: "Удалить"
            },
            notifications: {
                title: "Уведомления",
                unread: "Непрочитанные",
                read: "Прочитанные",
            },
            submit: "Отправить",
            open: "Открыть",
            appbar: {
                log_out: "Выход",
                tasks: "Задания",
                notifications: "Уведомления"
            },
            task: {
                leave_page: "Вы уверены, что хотите покинуть эту страницу?",
                returned_message: "Это задание было возвращено!",
                open_previous: "Открыть предыдущее задание",
                release: "Освободить задание",
                submit: "Отправить",
                saved_message: "Данные сохранены",
                divider_text: "Текущая форма"
            },
            sign_up_page: {
                title: "Регистрация",
                description1: "Нажмите на кнопку (Вход или Регистрация).",
                description2: "Если у вас нет аккаунта Google, то создайте его.",
                sign_up_button: "Войти через аккаунт Google",
                phone_number: "Телефон",
                otp_code: "Код",
                request_code_button: "Получить код",
                submit_code_button: "Отправить",
                divider_text: "или войдите с помощью телефона",
                invalid_code_error: "Неправильный код верификации",
                invalid_phone_number: "Неправильный формат",
                unknown_login_with_phone_error: "Неизвестная ошибка",
            },
            campaigns: {
                user_campaigns: "Мои кампании",
                selectable_campaigns: "Доступные кампании",
                join: "Присоединиться",
                details: "Подробнее",
            },
            list_header: {
                create: "Создать",
                grid: "Сетка",
                list: "Список"
            },
            tasks: {
                title: "Задания",
                completed: "Завершенные",
                uncompleted: "Невыполненные",
                available: "Доступные",
            },
            filter: {
                chain_label: "Цепочка",
                search_stage_label: "Искомый Cтейдж",
                stage_label: "Фильтрующий Стейдж",
                filter_label: "Фильтр",
                field_label: "Поле",
                type_label: "Тип поля",
                types: ["Текст", "Число", "Дата-Время"],
                conditions_label: "Условия",
                value_label: "Значение",
                value_description: "Если тип поля Дата-Время, пожалуйста заполняйте в формате год-месяц-день. Пример: 2022-04-03",
                operator_label: "Оператор",
                operators: ["Равно", "Не равно", "Меньше", "Больше", "Меньше или Равно", "Больше или Равно"],
                search_button: "Поиск"
            }
        },
    },
};

i18next
    .use(initReactI18next)
    .init({
        resources,
        lng: "ru",
        supportedLngs: ["en", "ru"],
        interpolation: {
            escapeValue: false,
        },
    });

export default i18next;