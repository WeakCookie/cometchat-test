import { useEffect, useState } from 'react'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'
import { toast } from 'react-toastify'
import { Spinner } from 'reactstrap'
import styles from './styles.module.scss'
import { CometChatUI } from "../../pages/CometChatWorkspace/src/components/index"

export const COMETCHAT_CONST = {
  COMETCHAT_AUTH_KEY: '',
  COMETCHAT_REGION: 'us',
  COMETCHAT_APP_ID: '',
  USER_ID: ''
}


const Chat = () => {
  const [user, setUser] = useState<any>(undefined)
  let CometChat
  if (window && typeof window !== 'undefined') {
    CometChat = get(window, 'CometChat')
  }

  useEffect(() => {
    init()
  }, [])

  async function init() {
    try {
      await CometChat.init(
        COMETCHAT_CONST.COMETCHAT_APP_ID,
        new CometChat.AppSettingsBuilder()
          .setRegion(COMETCHAT_CONST.COMETCHAT_REGION)
          .subscribePresenceForAllUsers()
          .build()
      )
      if (CometChat.setSource) {
        CometChat.setSource('ui-kit', 'web', 'reactjs')
      }
      login()
    } catch (error) {
      toast.error(`Error when connect to CometChat: ${error}`)
    }
  }

  async function login() {
    try {
      const loggedInUser = await CometChat.login(COMETCHAT_CONST.USER_ID, COMETCHAT_CONST.COMETCHAT_AUTH_KEY)
      setUser(loggedInUser)
    } catch (error) {
      toast.error(`Error when login to CometChat: ${get(error, 'message')}`)
    }
  }


  return (
    <div>
      {user ? (
        <div style={{ width: '70vw', height: '90vh' }}>
          <CometChatUI />
        </div>
      ) : (
        <div className={styles.spinner}>
          <Spinner size="xl" />
        </div>
      )}
    </div>
  )
}

export default observer(Chat)
