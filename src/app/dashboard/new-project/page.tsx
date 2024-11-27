"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { createProject } from "@/lib/actions/project"
import { UseOrganizations } from "@/hooks/organizations/use-organizations"
import { Card } from "@/components/ui/card"

const formSchema = z.object({
    name: z.string(),
    org_id: z.string(),
    description: z.string(),
});

export default function CreateProjectForm() {
    const router = useRouter()
    const { organizations, isLoading } = UseOrganizations();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const { id } = await createProject(values)
            toast({
                title: "Project created !",
                description: "Your project has been created.",
            })
            router.push(`/dashboard/project/${id}`)
        } catch (error) {
            console.error("Form submission error", error);
            toast({
                title: "An error occured.",
                description: "An error occured while creating this project.",
                variant: "destructive"
            })
        }
    }

    return (
        <Card className="max-w-5xl mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-10 px-8">
                    <div className="">
                        <h1 className="text-2xl mb-2 font-bold">New project</h1>
                        <p className="opacity-60">Create a new project here.</p>
                    </div>
                    <div className="grid lg:grid-cols-12 gap-4">
                        <div className="col-span-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Project name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Project name"

                                                type="text"
                                                {...field} />
                                        </FormControl>
                                        <FormDescription>This is the name of the project.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-6">
                            <FormField
                                control={form.control}
                                name="org_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Oraganization</FormLabel>
                                        <Select disabled={isLoading} onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="My org name" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Array.isArray(organizations) && organizations.map((org) => <SelectItem key={org.id} value={org.id}>{org.name}</SelectItem>
                                                )
                                                }
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>This is the name of the organization of you want to associate the project to.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="My project description."
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>Add a description to the project you want to create.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </Card >
    )
}