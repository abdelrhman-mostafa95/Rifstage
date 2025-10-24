import DashboardSidebar from '@/components/DashboardSidebar';

export default function DashboardLayout({ children }) {
    return (
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-12 gap-6 mt-15">
            {/* Sidebar */}
            <aside className="col-span-12 md:col-span-3">
                <DashboardSidebar />
            </aside>

            {/* Main Content */}
            <section className="col-span-12 md:col-span-9  bg-zinc-900 rounded-2xl shadow-md p-6">
                {children}
            </section>
        </div>
    );
}
