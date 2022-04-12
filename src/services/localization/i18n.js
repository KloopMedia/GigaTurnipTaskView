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
                sign_up_button: "Register",
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
                sign_up_button: "Регистрация",
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