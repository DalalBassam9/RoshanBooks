"use client"
import React, { useState } from 'react';
import Tab from './Tab';

interface TabsProps {
    children: React.ReactElement[];
}

const Tabs: React.FC<TabsProps> = ({ children }) => {
    const [activeTab, setActiveTab] = useState(children[0].props.label);

    return (
        <div>
                <nav className="isolate flex divide-x divide-gray-200 rounded-lg shadow" aria-label="Tabs">
                    {children.map((child) => {
                        const { label } = child.props;

                        return (
                            <Tab
                                
                                key={label}
                                label={label}
                                isActive={label === activeTab}
                                onClick={() => setActiveTab(label)}
                            />
                        );
                    })}
                </nav>
            <div className="p-4">
                {children.map((child) => {
                    if (child.props.label !== activeTab) return undefined;
                    return child.props.children;
                })}
            </div>
        </div>
    );
}

export default Tabs;