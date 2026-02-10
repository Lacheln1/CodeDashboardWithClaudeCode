import { NavLink } from "react-router-dom";

const navItems = [
    { to: "/", label: "Home" },
    { to: "/dashboard", label: "Dashboard" },
];

const agents = [
    { name: "Code Reviewer", icon: "🔍" },
    { name: "Security Auditor", icon: "🔒" },
    { name: "Performance Analyzer", icon: "⚡" },
    { name: "Test Generator", icon: "🧪" },
    { name: "Doc Writer", icon: "📝" },
];

export const Sidebar = () => {
    return (
        <aside className="w-[250px] h-screen bg-bg-secondary border-r border-border flex flex-col fixed left-0 top-0">
            <div className="p-6 border-b border-border">
                <h1 className="text-xl font-bold text-text-primary">CodeBuddy</h1>
            </div>

            <nav className="p-4 flex flex-col gap-1">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `px-4 py-2 rounded-lg text-sm transition-colors ${
                                isActive
                                    ? "bg-accent/10 text-accent font-medium"
                                    : "text-text-secondary hover:bg-bg-tertiary hover:text-text-primary"
                            }`
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 mt-4">
                <h3 className="text-xs text-text-muted uppercase tracking-wider mb-3 px-4">
                    Agents
                </h3>
                <div className="flex flex-col gap-1">
                    {agents.map((agent) => (
                        <div
                            key={agent.name}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-text-secondary"
                        >
                            <span>{agent.icon}</span>
                            <span>{agent.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
};
