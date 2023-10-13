import React from 'react'
import authRoute from './authRoute'
import {ADMIN, USER} from "../../constants/roles.constant";

export const publicRoutes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'instance.list',
        path: '/instance/list',
        component: React.lazy(() => import('views/instance/InstanceRecord')),
        authority: [ADMIN, USER],
    },
    {
        key: 'instance.file.upload',
        path: '/instance/file/upload/:tab',
        component: React.lazy(() => import('views/instance/FileUpload')),
        authority: [ADMIN, USER],
        meta: {
            header: 'Settings',
            headerContainer: true,
        },
    }
]
