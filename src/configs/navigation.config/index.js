import {
  NAV_ITEM_TYPE_TITLE,
  NAV_ITEM_TYPE_COLLAPSE,
  NAV_ITEM_TYPE_ITEM,
} from 'constants/navigation.constant'
import React from "react";
import {ADMIN, USER} from 'constants/roles.constant'
import {INSTANCE_PREFIX_PATH} from 'constants/route.constant'


const navigationConfig = [
  {
    key: 'instance',
    path: '',
    title: 'Instance',
    translateKey: 'nav.instance',
    icon: 'project',
    type: NAV_ITEM_TYPE_COLLAPSE,
    authority: [ADMIN, USER],
    subMenu: [
      {
        key: 'instance.list',
        path: `${INSTANCE_PREFIX_PATH}/list`,
        title: 'Instance List',
        translateKey: 'nav.instance.list',
        icon: '',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN, USER],
        subMenu: [],
      },
      // {
      //   key: 'instance.file.upload',
      //   path: `${INSTANCE_PREFIX_PATH}/file/upload/automatic1111`,
      //   title: 'File Upload',
      //   translateKey: 'nav.instance.file.upload',
      //   icon: '',
      //   type: NAV_ITEM_TYPE_ITEM,
      //   authority: [ADMIN, USER],
      //   subMenu: [],
      // },
    ],
  }
]

export default navigationConfig
