import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";

const agents = [
    { icon: "🔍", name: "Code Quality Review" },
    { icon: "🔒", name: "Security Audit" },
    { icon: "⚡", name: "Performance Analysis" },
    { icon: "🧪", name: "Test Coverage" },
    { icon: "📝", name: "Documentation Quality" },
];

export const HomePage = () => {
    const [repoUrl, setRepoUrl] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const confirmed = window.confirm(
            "현재 데모 모드로 실행됩니다.\nAPI 비용 관계로 실제 분석 대신 샘플 데이터가 표시됩니다.",
        );
        if (confirmed) {
            navigate(`/dashboard?repo=${encodeURIComponent(repoUrl)}`);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
            <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-2">CodeBuddy</h1>
                <p className="text-text-secondary text-lg mb-8">
                    Multi-Agent Code Analysis Platform
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-12">
                    <Input
                        placeholder="https://github.com/owner/repo"
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                    />
                    <Button type="submit" aria-label="Start analysis">
                        Start Analysis
                    </Button>
                </form>

                <div>
                    <h3 className="text-sm text-text-muted uppercase tracking-wider mb-4">
                        5 Specialized AI Agents
                    </h3>
                    <div className="flex flex-col gap-2">
                        {agents.map((agent) => (
                            <div
                                key={agent.name}
                                className="flex items-center gap-3 text-text-secondary"
                            >
                                <span>{agent.icon}</span>
                                <span>{agent.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
