import { useEffect, useRef } from "react";
import Quill from "quill";

const Editor = ({initalValue = ""}) => {
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
                quillRef.current.root.innerHTML = initalValue
            }
        }

        return () => {
        };
    }, [initalValue]);
    const test = () =>{
        const editorContent = quillRef.current!.root.innerHTML;
    }
    return (
        <div className="editor-wrapper h-full w-ful flex flex-col">
            <div ref={editorRef} className="flex-1 border border-gray-300"  onBlur={test}/>
        </div>
    );
};

export default Editor;
