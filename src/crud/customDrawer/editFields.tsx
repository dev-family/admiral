import React from 'react'
import { BooleanInput, SelectInput, TextInput, FilePictureInput } from '../../../admiral'

export const editFields = (
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
            label="Group (multiselect)"
            name="group"
            placeholder="Choose Group"
            required
            mode="multiple"
        >
            <SelectInput.Option value="admin">Administration</SelectInput.Option>
            <SelectInput.Option value="project_manager">Project managers</SelectInput.Option>
        </SelectInput>
        <SelectInput label="Role" name="role" placeholder="Choose Role" required>
            <SelectInput.Option value="accountant">Accountant</SelectInput.Option>
            <SelectInput.Option value="recruiter">HR Officer</SelectInput.Option>
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
