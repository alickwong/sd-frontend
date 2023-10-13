import React, {useState, useEffect, Suspense, lazy} from 'react'
import {Tabs} from 'components/ui'
import {AdaptableCard, Container} from 'components/shared'
import {useNavigate, useLocation} from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
// import { apiGetAccountSettingData } from 'services/AccountServices'

const FileUpload = lazy(() => import('./components/FileUpload'))

const {TabNav, TabList} = Tabs

const settingsMenu = {
  automatic1111: {label: 'Automatic1111', path: '/instance/file/upload'},
  // password: { label: 'Password', path: 'password' },
  // notification: { label: 'Notification', path: 'notification' },
  // integration: { label: 'Integration', path: 'integration' },
  // billing: { label: 'Billing', path: 'billing' },
}

const Settings = () => {
  const [currentTab, setCurrentTab] = useState('profile')
  const [data, setData] = useState({
    automatic1111: {
      auto11FileType: '',
      url: ''
    }
  })

  const navigate = useNavigate()

  const location = useLocation()

  const path = location.pathname.substring(
    location.pathname.lastIndexOf('/') + 1
  )

  const onTabChange = (val) => {
    setCurrentTab(val)
    navigate(`/instance/file/upload/${val}`)
  }

  const fetchData = async () => {
    // const response = await apiGetAccountSettingData()
    // setData(response.data)
  }

  useEffect(() => {
    setCurrentTab(path)
    if (isEmpty(data)) {
      // fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <AdaptableCard>
        <Tabs value={currentTab} onChange={(val) => onTabChange(val)}>
          <TabList>
            {Object.keys(settingsMenu).map((key) => (
              <TabNav key={key} value={key}>
                {settingsMenu[key].label}
              </TabNav>
            ))}
          </TabList>
        </Tabs>
        <div className="px-4 py-6">
          <Suspense fallback={<></>}>
            {currentTab === 'automatic1111' && (
              <FileUpload data={data.automatic1111}/>
            )}
            {currentTab === 'password' && (
              <FileUpload data={data.profile}/>
            )}
            {currentTab === 'notification' && (
              <FileUpload data={data.profile}/>
            )}
            {currentTab === 'integration' && <FileUpload/>}
            {currentTab === 'billing' && <FileUpload/>}
          </Suspense>
        </div>
      </AdaptableCard>
    </Container>
  )
}

export default Settings
