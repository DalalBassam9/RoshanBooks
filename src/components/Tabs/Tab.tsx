
import React from 'react';

interface TabProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const Tab: React.FC<TabProps> = ({ label, isActive, onClick }) => {

    return (
        <button className={classNames(
            isActive ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
            'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10'
        )}  onClick={onClick}>
            {label}
            <span
                aria-hidden="true"
                className={classNames(
                    isActive ? 'bg-beige' : 'bg-transparent',
                    'absolute inset-x-0 bottom-0 h-0.5'
                )}
            />
        </button>
    );
}

export default Tab;