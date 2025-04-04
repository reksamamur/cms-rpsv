import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateId } from "@/lib/pb";
import "@photo-sphere-viewer/markers-plugin/index.css";
import useCollections from "@/hooks/use-collections";
import useCreateCollection from "@/hooks/use-create-collection";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [collectionName, setCollectionName] = useState("");
  const [dialogCreate, setDialogCreate] = useState(false);
  const navigate = useNavigate();

  const { data } = useCollections();
  const { mutate } = useCreateCollection();

  function onCreateCanvas() {
    mutate(
      {
        name: collectionName,
      },
      {
        onSuccess: (e) => {
          console.log({
            m: "masuk",
            e,
          });
          setDialogCreate(false);
          setCollectionName("");

          navigate({
            href: `${e.id}/editor`,
          });
        },
        onError: (e) => {
          console.log({
            m: "masuk error",
            e,
          });
        },
      }
    );
  }

  return (
    <main className='container min-h-screen max-w-4xl mx-auto border-l border-r px-4 pt-20 pb-4'>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-bold tracking-tight'>CMS Sphere</h1>
        <Button className='px-8' onClick={() => setDialogCreate(true)}>
          Create
        </Button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
        {data?.map((item) => (
          <Card
            key={item.id}
            className='transition-all duration-200 hover:shadow-md hover:border-primary/20 cursor-pointer'
            onClick={() =>
              navigate({
                href: `${item.id}/editor`,
              })
            }
          >
            <CardHeader className='p-4 pb-2'>
              <p className='text-xs text-muted-foreground'>Collection</p>
            </CardHeader>
            <CardContent className='p-4 pt-0'>
              <h3 className='text-xl font-medium'>{item.name}</h3>
              <p className='text-xs text-muted-foreground mt-1'>{item.id}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={dialogCreate} onOpenChange={setDialogCreate}>
        <DialogContent className='space-y-4'>
          <DialogHeader>
            <DialogTitle>Create Canvas</DialogTitle>
          </DialogHeader>
          <div className='space-y-2'>
            <Label>Canvas name</Label>
            <Input
              type='text'
              placeholder='eg: Hotel California'
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value)}
            />
            <Button onClick={() => onCreateCanvas()}>Create</Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
