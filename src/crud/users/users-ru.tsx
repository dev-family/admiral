import React from 'react'
import {
    createCRUD,
    TextInput,
    SelectInput,
    FilePictureInput,
    FileField,
    EditorInput,
    ArrayInput,
    TimePickerInput,
    BooleanInput,
    DraggerInput,
    DatePickerInput,
    AjaxSelectInput,
    SlugInput,
} from '../../../admiral'
import api from '../../api'

const onImageUpload = (file: Blob) => {
    return api.editorImageUpload('editorUpload', { file })
}

export const path = '/crud-users/ru'
export const resource = 'users'

export const UsersCRUD = createCRUD({
    path,
    resource,
    locale: {
        actions: {
            submit: 'Сохранить',
            back: 'Назад',
            tableColumn: 'Действия',
            paginationTotal: (total) => `Всего ${total}`,
        },
        pagination: {
            items_per_page: '/ стр.',
            jump_to: 'Перейти',
            jump_to_confirm: 'подтвердить',
            page: 'Страница',
            prev_page: 'Назад',
            next_page: 'Вперед',
            prev_5: 'Предыдущие 5',
            next_5: 'Следующие 5',
            prev_3: 'Предыдущие 3',
            next_3: 'Следующие 3',
        },
        form: {
            fields: { array: { add: 'Добавить', remove: 'Удалить' } },
        },
    },
    index: {
        title: 'Пользователи',
        newButtonText: 'Создать',
        tableColumns: [
            {
                title: 'Фото',
                dataIndex: 'avatar',
                key: 'avatar',
                width: 90,
                render: (value) => <FileField {...value} />,
            },
            {
                title: 'Имя',
                dataIndex: 'name',
                key: 'name',
                width: 200,
                sorter: true,
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'Группа',
                dataIndex: 'group',
                key: 'group',
                render: (value) => (Array.isArray(value) ? value.join(', ') : value),
            },
            {
                title: 'Роль',
                dataIndex: 'role',
                key: 'role',
                width: 150,
                ellipsis: true,
            },
            {
                title: 'Активен',
                dataIndex: 'active',
                key: 'active',
                width: 150,
                render: (value) => (value ? 'Да' : 'Нет'),
            },
        ],
        tableConfig: { dndRows: true },
    },
    filter: {
        topToolbarButtonText: 'Фильтры',
        fields: (
            <>
                <TextInput label="Имя" name="name" placeholder="Name" />
                <AjaxSelectInput
                    label="Должность"
                    name="role"
                    placeholder="Выберите должность"
                    fetchOptions={(field, query) =>
                        api.getAjaxSelectOptions(resource, field, query)
                    }
                />
                <BooleanInput label="Активен?" name="active" />
                <TimePickerInput label="Время" name="time" placeholder="Время" format="HH:mm" />
                <DatePickerInput label="Дата" name="date" placeholder="Дата" />
                <SelectInput
                    label="Группа"
                    name="group"
                    placeholder="Выберите группу"
                    mode="multiple"
                >
                    <SelectInput.Option value="admin">Админ</SelectInput.Option>
                    <SelectInput.Option value="project_manager">
                        Менеджер проекта
                    </SelectInput.Option>
                </SelectInput>
            </>
        ),
    },
    form: {
        create: {
            fields: (
                <>
                    <TextInput label="Id" name="id" placeholder="Id" required />
                    <TextInput label="Имя" name="name" placeholder="Имя" />
                    <SlugInput label="Слаг" name="slug" placeholder="Слаг" from="name" />
                    <TextInput label="Email" name="email" placeholder="Email" required />
                    <TextInput
                        label="Пароль"
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        required
                    />
                    <SelectInput
                        label="Группа"
                        name="group"
                        placeholder="Выберите группу"
                        required
                        mode="multiple"
                    >
                        <SelectInput.Option value="admin">Aдминистрация</SelectInput.Option>
                        <SelectInput.Option value="project_manager">
                            Проектные менеджеры
                        </SelectInput.Option>
                    </SelectInput>
                    <SelectInput
                        label="Должнось"
                        name="role"
                        placeholder="Выберите должность"
                        required
                    >
                        <SelectInput.Option value="accountant">Бухгалтер</SelectInput.Option>
                        <SelectInput.Option value="recruiter">Кадровик</SelectInput.Option>
                    </SelectInput>
                    <FilePictureInput
                        columnSpan={2}
                        label="Фото"
                        name="avatar"
                        accept="image/*"
                        maxCount={1}
                    />
                    <DraggerInput
                        columnSpan={2}
                        label="Изображения"
                        name="images"
                        accept="image/*"
                        multiple
                    />
                    <EditorInput
                        columnSpan={2}
                        label="Описание"
                        name="description"
                        onImageUpload={onImageUpload}
                    />
                    <ArrayInput label="Расписание" name="schedule" required>
                        <SelectInput
                            label="День недели"
                            name="day"
                            placeholder="День недели"
                            required
                        />
                        <TimePickerInput
                            label="Время открытия"
                            name="start_time"
                            placeholder="Время открытия"
                            format="HH:mm"
                        />
                        <TimePickerInput
                            label="Время закрытия"
                            name="end_time"
                            placeholder="Время закрытия"
                            format="HH:mm"
                        />
                        <BooleanInput label="Выходной?" name="day_off" />
                    </ArrayInput>
                    <BooleanInput label="Активен?" name="active" />
                </>
            ),
        },
        edit: {
            fields: (
                <>
                    <TextInput label="Имя" name="name" placeholder="Имя" />
                    <SlugInput label="Слаг" name="slug" placeholder="Слаг" from="name" disabled />
                    <TextInput label="Email" name="email" placeholder="Email" required />
                    <TextInput
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                    />
                    <SelectInput
                        label="Группа"
                        name="group"
                        placeholder="Выберите группу"
                        required
                        mode="multiple"
                    >
                        <SelectInput.Option value="admin">Aдминистрация</SelectInput.Option>
                        <SelectInput.Option value="project_manager">
                            Проектные менеджеры
                        </SelectInput.Option>
                    </SelectInput>
                    <AjaxSelectInput
                        label="Должность"
                        name="role"
                        placeholder="Выберите должность"
                        fetchOptions={(field, query) =>
                            api.getAjaxSelectOptions(resource, field, query)
                        }
                    />
                    <FilePictureInput
                        columnSpan={2}
                        label="Фото"
                        name="avatar"
                        accept="image/*"
                        maxCount={1}
                    />
                    <DraggerInput
                        columnSpan={2}
                        label="Изображения"
                        name="images"
                        accept="image/*"
                        multiple
                    />
                    <EditorInput
                        columnSpan={2}
                        label="Описание"
                        name="description"
                        onImageUpload={onImageUpload}
                    />
                    <ArrayInput label="Расписание" name="schedule" required>
                        <SelectInput label="День недели" name="day" placeholder="День недели" />
                        <TimePickerInput
                            label="Время открытия"
                            name="start_time"
                            placeholder="Время открытия"
                            format="HH:mm"
                        />
                        <TimePickerInput
                            label="Время закрытия"
                            name="end_time"
                            placeholder="Время закрытия"
                            format="HH:mm"
                        />
                        <BooleanInput label="Выходной?" name="day_off" />
                    </ArrayInput>
                    <BooleanInput label="Активен?" name="active" />
                </>
            ),
        },
    },
    create: {
        title: 'Создать нового пользователя',
    },
    update: {
        title: (id: string) => `Редактировать пользователя #${id}`,
        view: 'drawer',
    },
})
