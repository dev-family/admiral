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

export const path = '/crud-users/es'
export const resource = 'users'

export const UsersCRUD = createCRUD({
    path,
    resource,
    index: {
        title: 'Usuarios',
        newButtonText: 'Crear',
        tableColumns: [
            {
                title: 'Foto',
                dataIndex: 'avatar',
                key: 'avatar',
                width: 90,
                render: (value) => <FileField {...value} />,
            },
            {
                title: 'Nombre',
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
                title: 'Grupo',
                dataIndex: 'group',
                key: 'group',
                render: (value) => (Array.isArray(value) ? value.join(', ') : value),
            },
            {
                title: 'Rol',
                dataIndex: 'role',
                key: 'role',
                width: 150,
                ellipsis: true,
            },
            {
                title: 'Activo',
                dataIndex: 'active',
                key: 'active',
                width: 150,
                render: (value) => (value ? 'Sí' : 'No'),
            },
        ],
        tableConfig: { dndRows: true },
    },
    filter: {
        topToolbarButtonText: 'Filtros',
        fields: (
            <>
                <TextInput label="Nombre" name="name" placeholder="Nombre" />
                <AjaxSelectInput
                    label="Puesto"
                    name="role"
                    placeholder="Selecciona un puesto"
                    fetchOptions={(field, query) =>
                        api.getAjaxSelectOptions(resource, field, query)
                    }
                />
                <BooleanInput label="Activo?" name="active" />
                <TimePickerInput label="Hora" name="time" placeholder="Hora" format="HH:mm" />
                <DatePickerInput label="Fecha" name="date" placeholder="Fecha" />
                <SelectInput
                    label="Grupo"
                    name="group"
                    placeholder="Selecciona un grupo"
                    mode="multiple"
                >
                    <SelectInput.Option value="admin">Administrador</SelectInput.Option>
                    <SelectInput.Option value="project_manager">
                        Gerente de proyecto
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
                    <TextInput label="Nombre" name="name" placeholder="Nombre" />
                    <SlugInput label="Slug" name="slug" placeholder="Slug" from="name" />
                    <TextInput label="Email" name="email" placeholder="Email" required />
                    <TextInput
                        label="Contraseña"
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        required
                    />
                    <SelectInput
                        label="Grupo"
                        name="group"
                        placeholder="Selecciona un grupo"
                        required
                        mode="multiple"
                    >
                        <SelectInput.Option value="admin">Administración</SelectInput.Option>
                        <SelectInput.Option value="project_manager">
                            Gerentes de proyecto
                        </SelectInput.Option>
                    </SelectInput>
                    <SelectInput
                        label="Puesto"
                        name="role"
                        placeholder="Selecciona un puesto"
                        required
                    >
                        <SelectInput.Option value="accountant">Contador</SelectInput.Option>
                        <SelectInput.Option value="recruiter">
                            Oficial de Recursos Humanos
                        </SelectInput.Option>
                    </SelectInput>
                    <FilePictureInput
                        columnSpan={2}
                        label="Foto"
                        name="avatar"
                        accept="image/*"
                        maxCount={1}
                    />
                    <DraggerInput
                        columnSpan={2}
                        label="Imágenes"
                        name="images"
                        accept="image/*"
                        multiple
                    />
                    <EditorInput
                        columnSpan={2}
                        label="Descripción"
                        name="description"
                        onImageUpload={onImageUpload}
                    />
                    <ArrayInput label="Horario" name="schedule" required>
                        <SelectInput
                            label="Día de la semana"
                            name="day"
                            placeholder="Día de la semana"
                            required
                        />
                        <TimePickerInput
                            label="Hora de apertura"
                            name="start_time"
                            placeholder="Hora de apertura"
                            format="HH:mm"
                        />
                        <TimePickerInput
                            label="Hora de cierre"
                            name="end_time"
                            placeholder="Hora de cierre"
                            format="HH:mm"
                        />
                        <BooleanInput label="¿Día libre?" name="day_off" />
                    </ArrayInput>
                    <BooleanInput label="Activo?" name="active" />
                </>
            ),
        },
        edit: {
            fields: (
                <>
                    <TextInput label="Nombre" name="name" placeholder="Nombre" />
                    <SlugInput label="Slug" name="slug" placeholder="Slug" from="name" disabled />
                    <TextInput label="Email" name="email" placeholder="Email" required />
                    <TextInput
                        label="Contraseña"
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        required
                    />
                    <SelectInput
                        label="Grupo"
                        name="group"
                        placeholder="Selecciona un grupo"
                        required
                        mode="multiple"
                    >
                        <SelectInput.Option value="admin">Administración</SelectInput.Option>
                        <SelectInput.Option value="project_manager">
                            Gerentes de proyecto
                        </SelectInput.Option>
                    </SelectInput>
                    <AjaxSelectInput
                        label="Puesto"
                        name="role"
                        placeholder="Selecciona un puesto"
                        fetchOptions={(field, query) =>
                            api.getAjaxSelectOptions(resource, field, query)
                        }
                    />
                    <FilePictureInput
                        columnSpan={2}
                        label="Foto"
                        name="avatar"
                        accept="image/*"
                        maxCount={1}
                    />
                    <DraggerInput
                        columnSpan={2}
                        label="Imágenes"
                        name="images"
                        accept="image/*"
                        multiple
                    />
                    <EditorInput
                        columnSpan={2}
                        label="Descripción"
                        name="description"
                        onImageUpload={onImageUpload}
                    />
                    <ArrayInput label="Horario" name="schedule" required>
                        <SelectInput
                            label="Día de la semana"
                            name="day"
                            placeholder="Día de la semana"
                        />
                        <TimePickerInput
                            label="Hora de apertura"
                            name="start_time"
                            placeholder="Hora de apertura"
                            format="HH:mm"
                        />
                        <TimePickerInput
                            label="Hora de cierre"
                            name="end_time"
                            placeholder="Hora de cierre"
                            format="HH:mm"
                        />
                        <BooleanInput label="¿Día libre?" name="day_off" />
                    </ArrayInput>
                    <BooleanInput label="Activo?" name="active" />
                </>
            ),
        },
    },
    create: {
        title: 'Crear nuevo usuario',
    },
    update: {
        title: (id: string) => `Editar usuario #${id}`,
        view: 'drawer',
    },
})
