import React from 'react';
import AcceptTask from './AcceptTask';
import NewTask from './NewTask';
import CompleteTask from './CompleteTask';
import FailedTask from './FailedTask';

const TaskList = ({ data, onTaskUpdate }) => {
    return (
        <div id="tasklist" className="flex items-stretch justify-start gap-6 overflow-x-auto flex-nowrap w-full py-4 mt-10 scroll-smooth">
            {data?.tasks?.map((elem, idx) => {
                if (elem.active) {
                    return <AcceptTask key={idx} data={elem} onTaskUpdate={onTaskUpdate} />;
                }
                if (elem.newTask) {
                    return <NewTask key={idx} data={elem} onTaskUpdate={onTaskUpdate} />;
                }
                if (elem.completed) {
                    return <CompleteTask key={idx} data={elem} />;
                }
                if (elem.failed) {
                    return <FailedTask key={idx} data={elem} />;
                }
                return null;
            })}
        </div>
    );
};

export default TaskList;