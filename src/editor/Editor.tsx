import { useEffect, useRef } from "react";
import Quill from "quill";

const Editor = () => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const quillRef = useRef<Quill | null>(null);

    useEffect(() => {
        if (editorRef.current && !quillRef.current) {
            // Check if an instance already exists in the div before initializing
            if (editorRef.current.children.length === 0) {
                quillRef.current = new Quill(editorRef.current, {
                    theme: "snow",
                    modules: {
                        toolbar: [
                            ["bold", "italic", "underline"],
                            [{ header: 1 }, { header: 2 }, { header: 3 }, { header: 4 }],
                            ["link", "image"],
                            [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
                            [{ color: [] }, { background: [] }],
                        ],
                    },
                });
            }
        }

        return () => {
            // No need to reset quillRef.current as it only gets initialized once
        };
    }, []);
    return (
        <div className="editor-wrapper h-full max-h-[400px]">
            <div ref={editorRef} className="h-64 border border-gray-300" />
        </div>
    );
};

export default Editor;
