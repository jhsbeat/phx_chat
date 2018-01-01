// // Brunch automatically concatenates all files in your
// // watched paths. Those paths can be configured at
// // config.paths.watched in "brunch-config.js".
// //
// // However, those files will only be executed if
// // explicitly imported. The only exception are files
// // in vendor, which are never wrapped in imports and
// // therefore are always executed.
//
// // Import dependencies
// //
// // If you no longer want to use a dependency, remember
// // to also remove its path from "config.paths.watched".
// import "phoenix_html"
//
// // Import local files
// //
// // Local files can be imported directly using relative
// // paths "./socket" or full ones "web/static/js/socket".
//
// // import socket from "./socket"
// import {Socket, Presence} from "phoenix"
//
// let socket = new Socket("/socket", {
//   params: { user_id: window.location.search.split("=")[1] }
// })
//
// function renderOnlineUsers(presences) {
//   let response = "";
//
//   Presence.list(presences, (id, {metas: [first, ...rest]}) => {
//     let count = rest.length + 1
//     response += `<br>${id} (count: ${count})</br>`
//   });
//
//   document.querySelector("main[role=main]").innerHTML = response;
// }
//
// socket.connect()
//
// let presences = {}
//
// let channel = socket.channel("room:lobby", {})
//
// channel.on("presence_state", state => {
//   presences = Presence.syncState(presences, state)
//   renderOnlineUsers(presences)
// })
//
// channel.on("presence_diff", diff => {
//   presences = Presence.syncDiff(presences, diff)
//   renderOnlineUsers(presences)
// })
//
// channel.join()



// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"
import {Socket, Presence} from "phoenix"

// Socket
let user_id = document.getElementById("user_id").innerText
let socket = new Socket("/socket", {
  params: { user_id: user_id }
})
socket.connect()

// Presence
let presences = {}

let formatTimestamp = (timestamp) => {
  let date = new Date(timestamp)
  return date.toLocaleTimeString()
}
let listBy = (user_id, {metas: metas}) => {
  return {
    userId: user_id,
    onlineAt: formatTimestamp(metas[0].online_at)
  }
}

let userList = document.getElementById("user_list")
let render = (presences) => {
  userList.innerHTML = Presence.list(presences, listBy)
    .map(presence => `
      <li>
        <b>${presence.userId}</b>
        <br><small>online since ${presence.onlineAt}</small>
      </li>
    `)
    .join("")
}

// Channels
let channel = socket.channel("room:lobby", {})

channel.on("presence_state", state => {
  console.log("on presence_state")
  presences = Presence.syncState(presences, state)
  render(presences)
})

channel.on("presence_diff", diff => {
  console.log("on presence_diff")
  presences = Presence.syncDiff(presences, diff)
  render(presences)
})

channel.join()

// Chat
let messageInput = document.getElementById("new_message")
messageInput.addEventListener("keypress", (e) => {
  if(e.keyCode == 13 && messageInput.value != ""){
    channel.push("message:new", messageInput.value)
    messageInput.value = ""
  }
})

let messageList = document.getElementById("message_list")
let renderMessage = (message) => {
  let messageElement = document.createElement("li")
  messageElement.innerHTML = `
    <b>${message.user_id}</b>
    <i>${formatTimestamp(message.timestamp)}</i>
    <p>${message.body}</p>
  `
  messageList.appendChild(messageElement)
  messageList.scrollTop = messageList.scrollHeight;
}

channel.on("message:new", message => renderMessage(message))
