import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

interface Message {
    avatarUrl: string;
    nickName: string;
    message: string;
    timestamp: string;
}

export const useChat = () => {
    const [connection, setConnection] = useState<signalR.HubConnection | null>(
        null,
    );
    const [messages, setMessages] = useState<Message[]>([]);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${process.env.NEXT_PUBLIC_SOCKET_URL}/chathub`, {
                transport: signalR.HttpTransportType.WebSockets,
                skipNegotiation: true,
            })
            .configureLogging(signalR.LogLevel.Information)
            .withAutomaticReconnect([0, 2000, 5000, 10000])
            .build();

        newConnection
            .start()
            .then(() => {
                setIsConnected(true);
                setConnection(newConnection);

                newConnection.invoke("GetChatHistory").catch(console.error);
            })
            .catch(console.error);

        return () => {
            newConnection.stop().then();
        };
    }, []);

    useEffect(() => {
        if (!connection) return;

        connection.on("ReceiveMessage", (chatMessage) => {
            setMessages((prev) => [...prev, chatMessage]);
        });

        connection.on("ChatHistory", (chatMessages) => {
            setMessages(chatMessages);
        });

        return () => {
            connection.off("ReceiveMessage");
            connection.off("ChatHistory");
        };
    }, [connection]);

    const sendMessage = async (text: string, userId: string) => {
        if (
            !text.trim() ||
            !connection ||
            connection.state !== signalR.HubConnectionState.Connected
        )
            return;

        try {
            await connection.invoke("SendMessage", userId, text);
        } catch (error) {
            console.error("[Chat] ❌ Ошибка отправки:", error);
        }
    };

    return { messages, sendMessage, isConnected };
};
