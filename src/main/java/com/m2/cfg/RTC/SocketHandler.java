package com.m2.cfg.RTC;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
public class SocketHandler extends TextWebSocketHandler {

    List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        //JSONObject jsonObject = new JSONObject(message.getPayload());
        //System.out.println(jsonObject.getJSONObject("event")+"-"+session.getId());
        for (WebSocketSession webSocketSession : sessions) {
            if (webSocketSession.isOpen() && !session.getId().equals(webSocketSession.getId())) {
                webSocketSession.sendMessage(message);
            }
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        System.out.println("Connected client: " + session.getId());
        session.sendMessage(new TextMessage("{\"event\":\"OWN_ID\",\"data\":\""+session.getId()+"\"}"));
        for (WebSocketSession webSocketSession : sessions) {
            if (webSocketSession.isOpen() && !session.getId().equals(webSocketSession.getId())) {
                webSocketSession.sendMessage(new TextMessage("{\"event\":\"PREPARE_CONNECTION\",\"data\":\"" + session.getId() + "\"}"));
                session.sendMessage(new TextMessage("{\"event\":\"NEW_CONNECTION\",\"data\":\""+webSocketSession.getId()+"\"}"));
            }
        }
    }
}