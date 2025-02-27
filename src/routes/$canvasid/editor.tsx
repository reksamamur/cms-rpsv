/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, GalleryThumbnails, Save, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/$canvasid/editor")({
  component: Editor,
});

function Editor() {
  const { canvasid } = Route.useParams();
  const [panel, setPanel] = useState<"show" | "hide">("hide");

  function onOpenPanel(item: any) {
    setPanel("show");
  }

  function onSwitchDefault(checked: boolean) {
    // TODO: Check is false and all images no mark as default
    if (!checked) {
      return toast.warning("No Image set as default", {
        description: "Please select at least one image as default!",
      });
    }

    return toast.info("Image {name} set as default", {
      description: "This image will be default or first shown!",
    });
  }

  return (
    <main>
      <section className='grid w-full transition duration-300 grid-cols-[300px_1fr]'>
        <section className='min-h-screen h-screen overflow-y-auto bg-zinc-50 block border-r px-4 space-y-4'>
          <div className='space-y-2 sticky top-0 z-10 flex flex-col border-b bg-zinc-50/50 backdrop-blur py-4'>
            <div className='flex justify-between'>
              <Button asChild variant='link'>
                <Link to='/'>
                  <ChevronLeft />
                  <span>Back</span>
                </Link>
              </Button>
              <Button variant='default'>
                <Save />
                <span>Save</span>
              </Button>
            </div>
            <div className='gap-2 flex flex-col pt-6'>
              <Label className='text-zinc-400'>{canvasid}</Label>
              <Label className='text-xl w-full truncate'>Canvas Name</Label>
            </div>

            <Separator />

            <Button>Add images</Button>

            <Label className='text-zinc-600 text-xs'>List images</Label>
          </div>

          <div className='flex flex-col gap-2'>
            {[...Array(10).keys()].map((item) => (
              <Card
                key={item}
                className='transition-all duration-200 hover:shadow-md hover:border-primary/20 cursor-pointer'
                onClick={() => onOpenPanel(item)}
              >
                <CardHeader>Main</CardHeader>
                <CardContent>Image</CardContent>
                <CardFooter>Footer</CardFooter>
              </Card>
            ))}
          </div>
        </section>
        <section className='min-h-screen h-screen overflow-auto bg-sidebar block p-4 relative'>
          {panel === "show" ? (
            <div className='bg-zinc-50/50 backdrop-blur rounded-lg border shadow-sm w-full max-w-xs h-[98vh] xl:h-fit px-3 absolute top-2 left-2 bottom-2 space-y-2'>
              <div className='w-full flex items-center justify-between sticky top-0 bg-zinc-50/50 backdrop-blur z-10 py-3'>
                <div className='w-full flex-1'>
                  <Label>Details</Label>
                </div>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={() => setPanel("hide")}
                >
                  <X />
                </Button>
              </div>

              <div className='w-full border rounded-lg h-40 bg-white relative group cursor-pointer ease-out duration-300 transition-all'>
                <Label className='ease-out duration-300 transition-all opacity-0 group-hover:opacity-100 rounded-b-lg bg-gradient-to-t from-zinc-600/20 to-transparent absolute bottom-0 w-full text-center py-4 px-2'>
                  Change image
                </Label>
              </div>

              <Separator />

              {/* Switch toggle Main/Entry */}
              <div className='flex flex-row items-center justify-between rounded-lg border p-4'>
                <div className='space-y-0.5 flex flex-col'>
                  <Label className='text-base'>Image Default</Label>
                  <p className='text-xs'>Set image as default or first entry</p>
                </div>
                <div>
                  <Switch onCheckedChange={(e) => onSwitchDefault(e)} />
                </div>
              </div>

              <div className='overflow-y-auto h-[63vh] xl:h-fit'>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing
                and typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown
                printer took a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but also
                the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more
                recently with desktop publishing software like Aldus PageMaker
                including versions of Lorem Ipsum. Lorem Ipsum is simply dummy
                text of the printing and typesetting industry. Lorem Ipsum has
                been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it
                to make a type specimen book. It has survived not only five
                centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged. It was popularised in the 1960s
                with the release of Letraset sheets containing Lorem Ipsum
                passages, and more recently with desktop publishing software
                like Aldus PageMaker including versions of Lorem Ipsum. Lorem
                Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing
                and typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown
                printer took a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but also
                the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more
                recently with desktop publishing software like Aldus PageMaker
                including versions of Lorem Ipsum. Lorem Ipsum is simply dummy
                text of the printing and typesetting industry. Lorem Ipsum has
                been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it
                to make a type specimen book. It has survived not only five
                centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged. It was popularised in the 1960s
                with the release of Letraset sheets containing Lorem Ipsum
                passages, and more recently with desktop publishing software
                like Aldus PageMaker including versions of Lorem Ipsum.
              </div>
            </div>
          ) : null}

          <div>Content</div>
        </section>
      </section>
    </main>
  );
}
