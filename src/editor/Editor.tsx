import { useEffect, useRef } from "react";
import Quill from "quill";
import { cn } from "@/lib/utils";

interface EditorProps{
    isCreateMode: boolean;
    initialValue?: string;
    onChange?: (value: string) => void;
}
const Editor = ({initialValue,isCreateMode,onChange}:EditorProps) => {
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
                            ["link"],
                            [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
                            [{ color: [] }, { background: [] }],
                        ],
                    },
                });
                quillRef.current.root.innerHTML = initialValue ? initialValue : "<p><span style=\"color: rgb(187, 187, 187);\">Write a description</span></p>";

            }
        }

        return () => {
        };
    }, []);

    useEffect(() => {
        if (quillRef.current && initialValue) {
            const currentContent = quillRef.current.root.innerHTML;

            // Only update if content is different to avoid unnecessary DOM updates
            if (currentContent !== initialValue) {
                quillRef.current.root.innerHTML = initialValue;
            }
        }
    }, [initialValue]);

    const saveChanges = () =>{
        const editorContent = quillRef.current!.root.innerHTML;
            onChange?.(editorContent)
            return;

    }
    return (
        <div className={cn("editor-wrapper h-full  max-h-[480px]  w-full ",{"min-w-[640px] h-[250px]":isCreateMode})}>



            <div ref={editorRef} className=" h-full border-gray-300 "  onBlur={saveChanges}/>

        </div>
    );
};

export default Editor;
