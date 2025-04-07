import { useEffect, useRef } from "react";
import Quill from "quill";
import { cn } from "@/lib/utils";

interface EditorProps{
    isCreateMode: boolean;
    initialValue?: string;
}
const Editor = ({initialValue,isCreateMode}:EditorProps) => {
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
                quillRef.current.root.innerHTML = initialValue ? initialValue : "<p><span style=\"color: rgb(187, 187, 187);\">Write a description</span></p>";

            }
        }

        return () => {
        };
    }, [initialValue]);
    const saveChanges = () =>{
        if(isCreateMode) return;
        const editorContent = quillRef.current!.root.innerHTML;
        console.log(editorContent);
    }
    return (
        <div className={cn("editor-wrapper h-full  max-h-[480px] w-full ",{"w-[840px] h-[250px]":isCreateMode})}>



            <div ref={editorRef} className="h-full  border-gray-300 "  onBlur={saveChanges}/>

        </div>
    );
};

export default Editor;
