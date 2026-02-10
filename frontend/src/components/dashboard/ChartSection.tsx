import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import { Card } from "../common/Card";

const COLORS = ["#8B5CF6", "#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

interface ChartSectionProps {
    issuesByAgent: { name: string; count: number }[];
    issuesBySeverity: { name: string; value: number }[];
}

export const ChartSection = ({ issuesByAgent, issuesBySeverity }: ChartSectionProps) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <h3 className="text-xl font-semibold mb-4">Issues by Severity</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie
                            data={issuesBySeverity}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}`}
                        >
                            {issuesBySeverity.map((_, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </Card>

            <Card>
                <h3 className="text-xl font-semibold mb-4">Issues by Agent</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={issuesByAgent}>
                        <XAxis dataKey="name" tick={{ fill: "#A3A3A3", fontSize: 12 }} />
                        <YAxis tick={{ fill: "#A3A3A3", fontSize: 12 }} />
                        <Tooltip
                            cursor={false}
                            contentStyle={{
                                backgroundColor: "#1F2937",
                                border: "1px solid #374151",
                                borderRadius: "6px",
                                padding: "4px 8px",
                                fontSize: "12px",
                            }}
                        />
                        <Bar dataKey="count" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </Card>
        </div>
    );
};
