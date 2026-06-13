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
    AjaxSelectInput,
    SlugInput,
    RadioInput,
    DateRangePickerInput,
} from '../../../admiral'
import api from '../../api'

const onImageUpload = (file: Blob) => {
    return api.editorImageUpload('editorUpload', { file })
}

export const path = '/crud-users'
export const resource = 'users'

export const UsersCRUD = createCRUD({
    path,
    resource,
    index: {
        title: 'Users CRUD',
        newButtonText: 'Create New User',
        tableColumns: [
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
        tableConfig: { dndRows: true },
    },
    filter: {
        topToolbarButtonText: 'Filter',
        fields: (
            <>
                <TextInput label="Name" name="name" placeholder="Name" />
                <AjaxSelectInput
                    label="Role"
                    name="role"
                    placeholder="Choose Role"
                    fetchOptions={(field, query) =>
                        api.getAjaxSelectOptions(resource, field, query)
                    }
                />
                <BooleanInput label="Active?" name="active" />
                <TimePickerInput label="Time" name="time" placeholder="Time" format="HH:mm" />
                <DateRangePickerInput label="Date" name="date" />
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
                    <SlugInput label="Slug" name="slug" placeholder="Slug" from="name" />
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
                        <SelectInput.Option value="admin">Administration</SelectInput.Option>
                        <SelectInput.Option value="project_manager">
                            Project managers
                        </SelectInput.Option>
                    </SelectInput>
                    {/* Conditional fields driven by a SELECT: choosing "Phone"
                        reveals (and requires) the phone number; the other options
                        hide it and drop its value from the payload. */}
                    <SelectInput
                        label="Preferred contact"
                        name="contact_method"
                        placeholder="How should we reach out?"
                    >
                        <SelectInput.Option value="email">Email</SelectInput.Option>
                        <SelectInput.Option value="phone">Phone</SelectInput.Option>
                        <SelectInput.Option value="none">Do not contact</SelectInput.Option>
                    </SelectInput>
                    <TextInput
                        label="Phone number"
                        name="phone_number"
                        placeholder="+1 (___) ___-____"
                        visibleWhen={{ field: 'contact_method', is: 'phone' }}
                        requiredWhen={{ field: 'contact_method', is: 'phone' }}
                    />
                    {/* Cascade pair — City sits directly after Country. Changing
                        Country resets City to null and refetches its options for
                        the new country (the 3rd fetchOptions arg carries the scope
                        values, R6/R7). Full-width keeps the pair together. */}
                    <AjaxSelectInput
                        columnSpan={2}
                        label="Country"
                        name="country"
                        placeholder="Choose Country"
                        allowClear
                        fetchOptions={(field, query) =>
                            api.getAjaxSelectOptions(resource, field, query)
                        }
                    />
                    <AjaxSelectInput
                        columnSpan={2}
                        label="City"
                        name="city"
                        placeholder="Choose City"
                        allowClear
                        resetOnChangeOf={['country']}
                        fetchOptions={(field, query, values) =>
                            api.getAjaxSelectOptions(resource, field, query, {
                                country: values?.country,
                            })
                        }
                    />
                    <RadioInput label="Role" name="role" required columnSpan={2} />
                    <FilePictureInput
                        columnSpan={2}
                        label="Avatar"
                        name="avatar"
                        accept="image/*"
                        maxCount={1}
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
                    <ArrayInput label="Schedule" name="schedule" required>
                        <SelectInput
                            label="Day of the week"
                            name="day"
                            placeholder="Day of the week"
                            required
                        />
                        {/* The toggle sits ABOVE the times: revealing/hiding them
                            grows or collapses the row below the toggle instead of
                            shoving the toggle around — no layout jump. */}
                        <BooleanInput label="Day off?" name="day_off" />
                        {/* Row-local rule (function form): the row scope is this
                            schedule row, so toggling its own "Day off?" hides the
                            two time pickers for that row only. */}
                        <TimePickerInput
                            label="Opening time"
                            name="start_time"
                            placeholder="Opening time"
                            format="HH:mm"
                            visibleWhen={(row) => !row.day_off}
                        />
                        {/* Same rule as the JSON DSL, to demonstrate both forms. */}
                        <TimePickerInput
                            label="Closing time"
                            name="end_time"
                            placeholder="Closing time"
                            format="HH:mm"
                            visibleWhen={{ field: 'day_off', not: true }}
                        />
                    </ArrayInput>

                    <BooleanInput label="Active?" name="active" columnSpan={2} />
                </>
            ),
        },
        edit: {
            fields: (
                <>
                    <TextInput label="Name" name="name" placeholder="Name" />
                    <SlugInput label="Slug" name="slug" placeholder="Slug" from="name" disabled />
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
                        <SelectInput.Option value="admin">Administration</SelectInput.Option>
                        <SelectInput.Option value="project_manager">
                            Project managers
                        </SelectInput.Option>
                    </SelectInput>
                    {/* Conditional fields driven by a SELECT (same demo as create):
                        "Phone" reveals + requires the number; others hide it. */}
                    <SelectInput
                        label="Preferred contact"
                        name="contact_method"
                        placeholder="How should we reach out?"
                    >
                        <SelectInput.Option value="email">Email</SelectInput.Option>
                        <SelectInput.Option value="phone">Phone</SelectInput.Option>
                        <SelectInput.Option value="none">Do not contact</SelectInput.Option>
                    </SelectInput>
                    <TextInput
                        label="Phone number"
                        name="phone_number"
                        placeholder="+1 (___) ___-____"
                        visibleWhen={{ field: 'contact_method', is: 'phone' }}
                        requiredWhen={{ field: 'contact_method', is: 'phone' }}
                    />
                    {/* Cascade pair — City sits directly after Country. Changing
                        Country resets City to null and refetches its options for
                        the new country (the 3rd fetchOptions arg carries the scope
                        values, R6/R7). Full-width keeps the pair together. */}
                    <AjaxSelectInput
                        columnSpan={2}
                        label="Country"
                        name="country"
                        placeholder="Choose Country"
                        allowClear
                        fetchOptions={(field, query) =>
                            api.getAjaxSelectOptions(resource, field, query)
                        }
                    />
                    <AjaxSelectInput
                        columnSpan={2}
                        label="City"
                        name="city"
                        placeholder="Choose City"
                        allowClear
                        resetOnChangeOf={['country']}
                        fetchOptions={(field, query, values) =>
                            api.getAjaxSelectOptions(resource, field, query, {
                                country: values?.country,
                            })
                        }
                    />
                    <AjaxSelectInput
                        columnSpan={2}
                        label="Role"
                        name="role"
                        placeholder="Choose Role"
                        fetchOptions={(field, query) =>
                            api.getAjaxSelectOptions(resource, field, query)
                        }
                    />
                    <FilePictureInput
                        columnSpan={2}
                        label="Avatar"
                        name="avatar"
                        accept="image/*"
                        maxCount={1}
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
                    <ArrayInput label="Schedule" name="schedule" required>
                        <SelectInput
                            label="Day of the week"
                            name="day"
                            placeholder="Day of the week"
                        />
                        {/* Toggle above the times so the row grows/collapses below
                            it on reveal — no layout jump. */}
                        <BooleanInput label="Day off?" name="day_off" />
                        {/* Row-local rule (function form): hides this row's time
                            pickers when its own "Day off?" is on. */}
                        <TimePickerInput
                            label="Opening time"
                            name="start_time"
                            placeholder="Opening time"
                            format="HH:mm"
                            visibleWhen={(row) => !row.day_off}
                        />
                        {/* Same rule expressed as the JSON DSL. */}
                        <TimePickerInput
                            label="Closing time"
                            name="end_time"
                            placeholder="Closing time"
                            format="HH:mm"
                            visibleWhen={{ field: 'day_off', not: true }}
                        />
                    </ArrayInput>

                    <BooleanInput label="Active?" name="active" columnSpan={2} />
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
