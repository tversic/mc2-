package com.m2.cfg.RTC;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.json.*;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
public class SocketHandler extends TextWebSocketHandler {
    Map<String, List<WebSocketSession>> rooms = new HashMap<>(); // <RoomID, List of sessions in room>

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException, JSONException {
        JSONObject jsonObject = new JSONObject(message.getPayload());
        String roomID = jsonObject.getString("roomID");

        for (WebSocketSession webSocketSession : rooms.get(roomID)) {
            if (webSocketSession.isOpen() && !session.getId().equals(webSocketSession.getId())) {
                webSocketSession.sendMessage(message);
            }
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {

        String uri = session.getUri().toString().substring(session.getUri().toString().lastIndexOf("/")+1);
        if (!rooms.containsKey(uri)) {
            rooms.put(uri, new CopyOnWriteArrayList<>());
        }
        rooms.get(uri).add(session);

        System.out.println("Connected client: " + session.getId());
        session.sendMessage(new TextMessage("{\"event\":\"OWN_ID\",\"data\":\""+session.getId()+"\"}"));
        for (WebSocketSession webSocketSession : rooms.get(uri)) {
            if (webSocketSession.isOpen() && !session.getId().equals(webSocketSession.getId())) {
                webSocketSession.sendMessage(new TextMessage("{\"event\":\"PREPARE_CONNECTION\",\"data\":\"" + session.getId() + "\"}"));
                session.sendMessage(new TextMessage("{\"event\":\"NEW_CONNECTION\",\"data\":\""+webSocketSession.getId()+"\"}"));
            }
        }
    }
}