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
} from '../../admiral'
import api from '../api'

const onImageUpload = (file: Blob) => {
    return api.editorImageUpload('editorUpload', { file })
}

export const UsersCRUD = createCRUD({
    path: '/crud-users',
    resource: 'users',
    index: {
        title: 'Users CRUD',
        newButtonText: 'Create New User',
        filterButtonText: 'Filter',
        tableOptions: [
            {
                title: 'Avatar',
                dataIndex: 'avatar',
                key: 'avatar',
                width: 90,
                render: (value) => <FileField {...value} />,
            },
            {
                title: 'Name',
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
                title: 'Group',
                dataIndex: 'group',
                key: 'group',
                render: (value) => (Array.isArray(value) ? value.join(', ') : value),
            },
            {
                title: 'Role',
                dataIndex: 'role',
                key: 'role',
                width: 150,
                ellipsis: true,
            },
            {
                title: 'Active',
                dataIndex: 'active',
                key: 'active',
                width: 150,
                render: (value) => (value ? 'Yes' : 'No'),
            },
        ],
    },
    table: { dndRows: true },
    filter: {
        fields: (
            <>
                <TextInput label="Name" name="name" placeholder="Name" />
                <SelectInput label="Role" name="role" placeholder="Choose Role" allowClear />
                <BooleanInput label="Active?" name="active" />
                <TimePickerInput label="Time" name="time" placeholder="Time" format="HH:mm" />
                <DatePickerInput label="Date" name="date" placeholder="Date" />
                <SelectInput label="Group" name="group" placeholder="Choose Group" mode="multiple">
                    <SelectInput.Option value="admin">Admins</SelectInput.Option>
                    <SelectInput.Option value="project_manager">
                        Project Managers
                    </SelectInput.Option>
                </SelectInput>
                <SelectInput label="Role 2" name="role 2" placeholder="Choose Role 2">
                    <SelectInput.Option value="accountant">Accountant</SelectInput.Option>
                    <SelectInput.Option value="recruiter">Recruiter</SelectInput.Option>
                </SelectInput>
            </>
        ),
    },
    form: {
        create: {
            fields: (
                <>
                    <TextInput label="Id" name="id" placeholder="Id" required />
                    <TextInput label="Name" name="name" placeholder="Name" />
                    <TextInput label="Email" name="email" placeholder="Email" required />
                    <TextInput
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                    />
                    <SelectInput
                        label="Group"
                        name="group"
                        placeholder="Choose Group"
                        required
                        mode="multiple"
                    >
                        <SelectInput.Option value="admin">Aдминистрация</SelectInput.Option>
                        <SelectInput.Option value="project_manager">
                            Проектные менеджеры
                        </SelectInput.Option>
                    </SelectInput>
                    <SelectInput label="Role" name="role" placeholder="Choose Role" required>
                        <SelectInput.Option value="accountant">Бухгалтер</SelectInput.Option>
                        <SelectInput.Option value="recruiter">Кадровик</SelectInput.Option>
                    </SelectInput>
                    <FilePictureInput
                        columnSpan={2}
                        label="Avatar"
                        name="avatar"
                        accept="image/*"
                    />
                    <DraggerInput
                        columnSpan={2}
                        label="Images"
                        name="images"
                        accept="image/*"
                        multiple
                    />
                    <EditorInput
                        columnSpan={2}
                        label="Description"
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
                    <BooleanInput label="Active?" name="active" />
                </>
            ),
        },
        edit: {
            fields: (
                <>
                    <TextInput label="Name" name="name" placeholder="Name" />
                    <TextInput label="Email" name="email" placeholder="Email" required />
                    <TextInput
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                    />
                    <SelectInput
                        label="Group"
                        name="group"
                        placeholder="Choose Group"
                        required
                        mode="multiple"
                    >
                        <SelectInput.Option value="admin">Aдминистрация</SelectInput.Option>
                        <SelectInput.Option value="project_manager">
                            Проектные менеджеры
                        </SelectInput.Option>
                    </SelectInput>
                    <SelectInput label="Role" name="role" placeholder="Choose Role" required>
                        <SelectInput.Option value="accountant">Бухгалтер</SelectInput.Option>
                        <SelectInput.Option value="recruiter">Кадровик</SelectInput.Option>
                    </SelectInput>
                    <FilePictureInput
                        columnSpan={2}
                        label="Avatar"
                        name="avatar"
                        accept="image/*"
                    />
                    <DraggerInput
                        columnSpan={2}
                        label="Images"
                        name="images"
                        accept="image/*"
                        multiple
                    />
                    <EditorInput
                        columnSpan={2}
                        label="Description"
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
                    <BooleanInput label="Active?" name="active" />
                </>
            ),
        },
    },
    create: {
        title: 'Create New User',
    },
    update: {
        title: (id: string) => `Edit User #${id}`,
        view: 'drawer',
    },
})
