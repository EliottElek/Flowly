

export default function PriorityBadge({ priority }: { priority: string }) {

    function renderBadge() {
        switch (priority) {
            case 'low':
                return <span className="inline-flex items-center rounded-full bg-green-400/20 px-2 py-.5 text-xs font-medium text-green-600">
                    {priority}
                </span>;
            case 'medium':
                return <span className="inline-flex items-center rounded-full bg-orange-400/20 px-2 py-.5 text-xs font-medium text-orange-400">
                    {priority}
                </span>
            case 'high':
                return <span className="inline-flex items-center rounded-full bg-red-400/20 px-2 py-.5 text-xs font-medium text-red-700">
                    {priority}
                </span>
            default:
                return <span className="inline-flex items-center rounded-full bg-gray-400/20 px-2 py-.5 text-xs font-medium text-gray-600">
                    {priority}
                </span>;
        }
    }
    return (
        renderBadge()
    )
}
