import React, { useEffect, useState } from 'react'
import update from 'lodash/update'
import dynamic from 'next/dynamic'

const ChatNoSSR = dynamic(() => import('../components/Message'), { ssr: false })

const Chat = () => {
  let [libraryImported, setLibraryImported] = useState(false)

  useEffect(() => {
    if (window && typeof window !== 'undefined') {
      update(window, 'CometChat', () => require('@cometchat-pro/chat').CometChat)
      setLibraryImported(true)
    }
  }, [])

  return libraryImported ? <ChatNoSSR /> : <p>Loading....</p>
}

export default Chat
