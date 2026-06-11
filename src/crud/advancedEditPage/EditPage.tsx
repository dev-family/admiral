import { useCallback } from 'react'
import {
    useDataProvider,
    Tabs,
    Page,
    Form,
    BackButton,
    TextInput,
    SelectInput,
    FilePictureInput,
    BooleanInput,
} from '../../../admiral'
import Table from './Table'
import { path, resource } from '.'
import CustomTab from './CustomTab'

export default function EditPage({ id }: { id: string }) {
    const { getUpdateFormData, update } = useDataProvider()

    const fetchInitialData = useCallback(() => {
        return getUpdateFormData(resource, { id })
    }, [])

    const _onSubmit = useCallback((values: any) => {
        return update(resource, { data: values, id })
    }, [])

    const editFormTab = (
        <Form submitData={_onSubmit} fetchInitialData={fetchInitialData} redirect={path}>
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

            <Form.Footer>
                <BackButton basePath={path}>Back</BackButton>
                <Form.Submit>Submit</Form.Submit>
            </Form.Footer>
        </Form>
    )

    return (
        <Page title={`Edit user #${id}`}>
            <Tabs
                defaultActiveKey="1"
                type="card"
                items={[
                    { key: '1', label: 'Edit', children: editFormTab },
                    { key: '2', label: 'Related Items', children: <Table /> },
                    { key: '3', label: 'Custom', children: <CustomTab /> },
                ]}
            />
        </Page>
    )
}
