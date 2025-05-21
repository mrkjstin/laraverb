import { useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

export default function Index() {
    const [chat, setChat] = useState([]);
    const { data, setData, post, processing, reset } = useForm({
        name: "",
        message: "",
        time: new Date().toLocaleDateString([], {
            hour: "2-digit",
            minute: "2-digit",
        }),
    });

    function submit(e) {
        e.preventDefault();
        post("/send", {
            onSuccess: () => reset("message"),
        });
    }

    useEffect(() => {
        Echo.channel("chat").listen("ChatEvent", (e) => {
            setChat((prevChat) => [...prevChat, e.message]);
        });
    }, []);

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
            <div className="flex flex-col items-center w-full max-w-md px-4">
                <form className="mt-2 w-full" onSubmit={submit}>
                    <div
                        className="border h-64 overflow-y-auto rounded bg-white p-2 mb-2 flex flex-col gap-1"
                        id="chat-box"
                    >
                        {chat.map((msg, index) => {
                            const isCurrentUser = msg.name === data.name;
                            return (
                                <div
                                    key={index}
                                    className={`flex ${
                                        isCurrentUser
                                            ? "justify-end"
                                            : "justify-start"
                                    }`}
                                >
                                    <div
                                        className={`px-3 py-2 rounded-lg max-w-xs break-words ${
                                            isCurrentUser
                                                ? "bg-blue-600 text-white rounded-br-none"
                                                : "bg-gray-200 text-black rounded-bl-none"
                                        }`}
                                    >
                                        <div className="flex justify-between items-center text-xs font-semibold mb-1">
                                            <span>{msg.name}</span>
                                            <span className="ml-2 text-gray-400 text-[10px]">
                                                {msg.time}
                                            </span>
                                        </div>
                                        <div>{msg.message}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex flex-col gap-2">
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="border rounded p-2 "
                            placeholder="Your Name"
                        />
                        <div className="flex gap-2">
                            <textarea
                                value={data.message}
                                onChange={(e) =>
                                    setData("message", e.target.value)
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        submit(e);
                                    }
                                }}
                                rows={1}
                                className="flex-grow border rounded p-2"
                                placeholder="Aa"
                            />
                            <button
                                disabled={processing}
                                type="submit"
                                className="text-2xl px-3 py-2 rounded bg-blue-500 text-white disabled:bg-gray-400"
                            >
                                ✈️
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
