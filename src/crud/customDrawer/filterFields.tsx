import React from 'react'
import { BooleanInput, SelectInput, TextInput } from '../../../admiral'

export const filterFields = (
    <>
        <TextInput label="Name" name="name" placeholder="Name" />
        <SelectInput
            label="Group (multiselect)"
            name="group"
            placeholder="Choose Group"
            mode="multiple"
        >
            <SelectInput.Option value="admin">Admins</SelectInput.Option>
            <SelectInput.Option value="project_manager">Project Managers</SelectInput.Option>
        </SelectInput>
        <SelectInput label="Role" name="role" placeholder="Choose Role" allowClear>
            <SelectInput.Option value="accountant">Accountant</SelectInput.Option>
            <SelectInput.Option value="recruiter">Recruiter</SelectInput.Option>
        </SelectInput>
        <BooleanInput label="Active?" name="active" />
    </>
)
