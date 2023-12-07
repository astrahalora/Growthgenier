import { useRef } from "react";

export default function AddNewTask({ project, addNewTask }) {
    const newTaskName = useRef();

    const handleTheAdd = () => {
        addNewTask(project, newTaskName.current.value);
        newTaskName.current.value = "";
    };

    return (
        <div className="row w-100 project-confines mb-3">
            <input type="text" className="col-8" ref={newTaskName} />
            <span className="col-1"></span>
            <button
                type="button"
                className="col btn btn-custom"
                onClick={handleTheAdd}
            >
                Add Task
            </button>
        </div>
    );
}
