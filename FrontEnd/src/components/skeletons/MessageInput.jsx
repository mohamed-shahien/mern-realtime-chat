import { useRef, useState } from "react";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { useChat } from "../../store/useChat";

const MessageInput = () => {
        const [text, setText] = useState("");
        const [imagePreview, setImagePreview] = useState(null);
        const fileInputRef = useRef(null);
        const { sendMessage } = useChat();

        const handleImageChange = (e) => {
                const file = e.target.files[0];
                if (!file.type.startsWith("image/")) {
                        toast.error("Please select an image file");
                        return;
                }
                const reader = new FileReader();
                reader.onload = () => {
                        setImagePreview(reader.result);
                }
                reader.readAsDataURL(file);
        }

        const removeImage = () => {
                setImagePreview(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
        };

        const handleSendMessage = async (e) => {
                e.preventDefault();
                if (!text.trim() && !imagePreview) return;
                try {
                        await sendMessage({ text: text.trim(), image: imagePreview });
                        setText("");
                        setImagePreview(null);
                        if (fileInputRef.current) fileInputRef.current.value = "";
                        toast.success("Message sent successfully");
                } catch (error) {
                        toast.error(error.response.data.message);
                }
        }

        return (
                <div className="p-4 w-full">
                        {imagePreview && (
                                <div className="mb-3 flex items-center gap-2">
                                        <div className="relative">
                                                <img
                                                        src={imagePreview}
                                                        alt="Preview"
                                                        className="w-20 h-20 object-cover rounded-lg border border-zinc-700" />
                                                <button
                                                        onClick={removeImage}
                                                        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300flex items-center justify-center" type="button">
                                                        <X className="size-3" />
                                                </button>
                                        </div>
                                </div>
                        )}
                        <form onSubmit={handleSendMessage} className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 bg-base-100 rounded-lg shadow-md">
                                <div className="flex flex-1 items-center gap-2">
                                        <input
                                                type="text"
                                                className="flex-1 input input-bordered rounded-lg input-sm sm:input-md"
                                                placeholder="Type a message..."
                                                value={text}
                                                onChange={(e) => setText(e.target.value)}
                                        />

                                        <input
                                                type="file"
                                                accept="image/*"
                                                ref={fileInputRef}
                                                onChange={handleImageChange}
                                                className="hidden"/>

                                        <button
                                                type="button"
                                                className="btn btn-circle btn-sm sm:btn-md text-zinc-500 hover:text-emerald-500 transition-colors"
                                                onClick={() => fileInputRef.current?.click()}>
                                                <Image size={20} />
                                        </button>
                                </div>

                                <button
                                        type="submit"
                                        disabled={!text.trim() && !imagePreview}
                                        className="btn btn-circle btn-sm sm:btn-md btn-primary">
                                        <Send size={20} />
                                </button>
                        </form>

                </div>
        );
};
export default MessageInput;