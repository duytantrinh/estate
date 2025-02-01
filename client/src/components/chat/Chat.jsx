import {useContext, useEffect, useRef, useState} from "react"
import "./Chat.scss"
import {AuthContext} from "../../context/AuthContext"
import apiRequest from "../../lib/apiRequest"
import {format} from "timeago.js"
import {SocketContext} from "../../context/SocketContext"
import {useNotificationStore} from "../../lib/notificationStore"

const Chat = ({chats}) => {
  const [chat, setChat] = useState(null)
  const {currentUser} = useContext(AuthContext)

  // for socket
  const {socket} = useContext(SocketContext)

  const decrease = useNotificationStore((state) => state.decrease)

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest("/chats/" + id)

      if (!res.data.seenBy.includes(currentUser.id)) {
        decrease()
      }

      setChat({...res.data, receiver})
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const text = formData.get("text")
    if (!text) return

    try {
      const res = await apiRequest.post("/messages/" + chat.id, {text})

      // update a new message for chat
      setChat((prev) => ({...prev, messages: [...prev.messages, res.data]}))

      //reste input
      e.target.reset()

      // send mess to socket server
      socket.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: res.data,
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const read = async () => {
      try {
        await apiRequest.put("/chats/read/" + chat.id)
      } catch (err) {
        console.log(err)
      }
    }

    if (socket && chat) {
      socket.on("getMessage", (data) => {
        if (chat.id === data.chatId) {
          setChat((prev) => ({...prev, messages: [...prev.messages, data]}))
          read()
        }
      })
    }

    return () => {
      socket.off("getMessage")
    }
  }, [socket, chat])

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {chats?.map((c) => (
          <div
            className="message"
            key={c.id}
            style={{
              backgroundColor:
                c.seenBy.includes(currentUser.id) || chat?.id === c.id
                  ? "white"
                  : "#559ef6",
            }}
            onClick={() => handleOpenChat(c.id, c.receiver)}
          >
            <img
              src={c.receiver.avatar || "/noavatar.jpg"}
              alt="avatar receiver"
            />
            <span>{c.receiver.username}</span>
            <p>{c.lastMessage}</p>
          </div>
        ))}
      </div>

      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img
                src={chat.receiver.avatar || "/noavatar.jpg"}
                alt="user image"
              />
              {chat.receiver.username}
            </div>
            <span className="close" onClick={() => setChat(null)}>
              X
            </span>
          </div>

          <div className="center">
            {chat.messages.map((message, i) => (
              <div
                className="chatMessage"
                key={i}
                style={{
                  alignSelf:
                    message.userId === currentUser.id
                      ? "flex-end"
                      : "flex-start",
                  textAlign:
                    message.userId === currentUser.id ? "right" : "left",
                  backgroundColor:
                    message.userId === currentUser.id ? "white" : "#f9cf7c",
                }}
              >
                <p>{message.text}</p>
                <span>{format(message.createdAt)}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text"></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Chat
