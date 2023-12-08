import { useRef } from "react";

export default function ProjectSort({ filter, search }) {
    const selectElement = useRef();
    const inputElement = useRef();

    return (
        <div className="row">
            <select
                name="project-type"
                id="project-type"
                className="col text-center bkg-achievement p-2 rounded-2"
                onChange={() => filter(inputElement, selectElement)}
                ref={selectElement}
            >
                <option>-- All Projects --</option>
                <option>Completed</option>
                <option>In Progress</option>
            </select>
            <input
                type="search"
                name="search"
                id="search"
                placeholder="Search..."
                className="col ms-2 p-2"
                ref={inputElement}
                onChange={() => search(inputElement)}
            />
        </div>
    );
}
