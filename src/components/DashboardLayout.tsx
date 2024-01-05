const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex gap-8">
            <aside className="flex-[2]">
                {/* Include shared UI here e.g. a sidebar */}
            </aside>
            <div className="bg-gray-100 flex-[8] p-4 rounded min-h-[300px]">
                {children}
            </div>
        </div>
    );
};