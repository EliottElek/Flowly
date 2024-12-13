import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useProjectContext } from "./project-context"
import { useMemo } from "react"
import Image from "next/image"

export function ThemeDrawer() {
  const { themeDrawerOpen, setThemeDrawerOpen, handleChangeBackground } = useProjectContext()

  const images = useMemo(() => [
    "https://stpeziiligksqifiejoz.supabase.co/storage/v1/object/public/images/bg-1.png",
    "https://stpeziiligksqifiejoz.supabase.co/storage/v1/object/public/images/bg-2.png",
    "https://stpeziiligksqifiejoz.supabase.co/storage/v1/object/public/images/bg-3.png",
    "https://stpeziiligksqifiejoz.supabase.co/storage/v1/object/public/images/bg-4.png",
    "https://stpeziiligksqifiejoz.supabase.co/storage/v1/object/public/images/bg-5.svg",
  ], [])
  return (
    <Sheet open={themeDrawerOpen} onOpenChange={setThemeDrawerOpen}>
      <SheetContent className="!bg-background overflow-y-auto h-screen">
        <SheetHeader>
          <SheetTitle>Edit theme</SheetTitle>
          <SheetDescription>
            Make changes to your board's theme here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4 space-y-2">
          {images.map((img: string, i: number) =>
            <button onClick={() => handleChangeBackground(img)} key={i} className="overflow-hidden rounded-md">
              <Image src={img} className="object-cover" alt="" height={200} width={350} />
            </button>
          )}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}