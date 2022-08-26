import React from 'react'
import { BooleanInput, SelectInput, TextInput, FilePictureInput } from '../../../admiral'

export const createFields = (
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
            label="Group (multiselect)"
            name="group"
            placeholder="Choose Group"
            required
            mode="multiple"
        >
            <SelectInput.Option value="admin">Aдминистрация</SelectInput.Option>
            <SelectInput.Option value="project_manager">Проектные менеджеры</SelectInput.Option>
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
            maxCount={1}
        />
        <BooleanInput label="Active?" name="active" />
    </>
)
