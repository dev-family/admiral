import React, { Suspense, lazy } from 'react'
import { Spin } from '../Spin'
import type { EditorProps } from './interfaces'

// Loaded lazily so importing the ui/form entries does not pull
// @tinymce/tinymce-react into the consumer bundle until an editor renders.
const LazyEditor = lazy(() => import('./Editor'))

export const Editor = (props: EditorProps) => (
    <Suspense fallback={<Spin />}>
        <LazyEditor {...props} />
    </Suspense>
)
