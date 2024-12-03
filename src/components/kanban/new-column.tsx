import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Column } from "@/types/kanban"
import { useState, useEffect } from "react"
import { useCreateColumn } from "@/hooks/kanban/use-create-column"
import { PlusIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { Card } from "../ui/card"


export default function NewColumn({ refetch, project_id }: { refetch: () => void, project_id: string }) {
    const [open, setOpen] = useState(false)
    const { toast } = useToast()
    const { createColumn, isLoading, error } = useCreateColumn();

    const [formData, setFormData] = useState<Partial<Column>>({
        name: '',
        project_id: project_id
    })

    useEffect(() => {
        setFormData({
            name: '',
            description: '',
            project_id: project_id
        })
    }, [open, project_id])

    const handleAddColumn = async () => {
        const { error } = await createColumn({ ...formData } as Column);
        if (!error) {
            refetch();
            setOpen(false);
            toast({
                title: "Your column has been created.",
                description: "Your column has been successfully created.",
            })
        } else {
            setOpen(false); // Close dialog on success
            toast({
                variant: "destructive",
                title: "Failed to create new column.",
                description: error.message,
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        }
    };

    return (
        <div className="p-2">{!open ?
            <Button variant="secondary" className="!w-72 bg-muted/50 rounded-lg" onClick={() => setOpen(true)}>
                <PlusIcon /> New Column
            </Button>
            :
            <Card className="!w-72 p-2 bg-muted/50 flex flex-col h-fit shadow-none border-none rounded-xl">
                <form className="flex flex-col gap-2">
                    <Input
                        required
                        autoFocus
                        onBlur={(e) => {
                            if (!e.relatedTarget?.matches("button")) {
                                setOpen(false);
                            }
                        }}
                        className="bg-background"
                        placeholder="Column Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <div className="flex justify-end"><Button formAction={handleAddColumn}>Add</Button></div>
                </form>
            </Card>
        }
        </div>
    )
} 