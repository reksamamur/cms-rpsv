/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { PluginConstructor, Viewer } from '@photo-sphere-viewer/core';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ChevronLeft, Pen, Save, Upload, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';
import { toast } from 'sonner';
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';
import useCreateSphere from '@/hooks/use-create-sphere';
import useGetCollection from '@/hooks/use-get-collection';
import { format } from 'date-fns';
import useGetSphere from '@/hooks/use-get-sphere';
import { pb } from '@/lib/pb';
import { Badge } from '@/components/ui/badge';

export const Route = createFileRoute('/$canvasid/editor')({
  component: Editor,
});

type SphereImages = {
  image: any;
  default: boolean;
  name: string;
};

function Editor() {
  const { canvasid } = Route.useParams();
  const [panel, setPanel] = useState<'show' | 'hide'>('hide');

  const inputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<SphereImages[]>([]);

  const [positionImage, setPositionImage] = useState<number>(0);

  const { data: dataSphere } = useGetSphere(canvasid);
  const { data: dataCanvas } = useGetCollection(canvasid);
  const { mutate } = useCreateSphere();

  const plugins: Array<PluginConstructor | [PluginConstructor, any]> = [
    [MarkersPlugin, {}],
  ];

  function onOpenPanel(index: number) {
    setPositionImage(index);
  }

  const handleReady = (instance: Viewer) => {};

  function onSwitchDefault(checked: boolean) {
    const updatedImages = images.map((img, idx) => ({
      ...img,
      default: idx === positionImage ? checked : false,
    }));

    setImages(updatedImages);

    if (!checked) {
      return toast.warning('No Image set as default', {
        description: 'Please select at least one image as default!',
      });
    }

    return toast.info(`Image ${images[positionImage].name} set as default`, {
      description: 'This image will be default or first shown!',
    });
  }

  function onhandleClick() {
    inputRef.current?.click();
  }

  function onAddImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files;

    if (file) {
      const collectImage: SphereImages[] = [];

      const formData = new FormData();
      for (let i = 0; i < file.length; i++) {
        const isDefault = dataSphere && dataSphere.length > 0 ? false : i === 0;

        collectImage.push({
          image: file[i],
          name: file[i].name,
          default: isDefault,
        });

        formData.append('collection', canvasid);
        formData.append('image', file[i]);
        formData.append('filename', file[i].name);
        formData.append('default', isDefault ? 'true' : 'false');
      }

      mutate(formData, {
        onSuccess: () => {
          const mapSphere = dataSphere?.map((item) => ({
            image: pb.files.getURL(dataSphere, item.image),
            name: item.filename,
            default: item.default,
          })) as SphereImages[];

          const updatedImages = dataSphere
            ? [...mapSphere, ...collectImage]
            : collectImage;

          setImages(updatedImages);
          toast.success('Success upload images!');
        },
      });
    }
  }

  useEffect(() => {
    if (dataSphere) {
      const mappedSpheres = dataSphere.map((item) => ({
        image: pb.files.getURL(item, item.image),
        name: item.filename,
        default: item.default,
      })) as SphereImages[];

      setImages(mappedSpheres);
    }
  }, [dataSphere]);

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
                <span>Publish</span>
              </Button>
            </div>
            <div className='gap-2 flex flex-col pt-6'>
              <Label className='text-zinc-400'>{canvasid}</Label>
              <Label className='text-xl w-full truncate'>
                {dataCanvas?.name || '-'}
              </Label>
              <Label className='text-muted-foreground'>
                Created:{' '}
                {dataCanvas?.created ? format(dataCanvas.created, 'Pp') : '-'}
              </Label>
            </div>

            <Separator />

            <Button
              onClick={onhandleClick}
              className='relative'
              variant='outline'
            >
              <Upload className='mr-2 h-4 w-4' />
              Upload File
              <input
                ref={inputRef}
                type='file'
                className='sr-only'
                onChange={onAddImage}
                multiple
              />
            </Button>

            <Label className='text-zinc-600 text-xs'>List images</Label>
          </div>

          <div className='flex flex-col gap-2'>
            {images.map((item, index) => (
              <Card
                key={index}
                className='relative transition-all duration-200 hover:shadow-md hover:border-primary/20 cursor-pointer'
                onClick={() => onOpenPanel(index)}
              >
                <CardContent className='h-40 p-1'>
                  <img src={item.image} className='h-full w-full rounded-lg' />
                </CardContent>
                {item.default ? (
                  <Badge
                    variant='destructive'
                    className='absolute top-5 left-3'
                  >
                    Default
                  </Badge>
                ) : null}
                <CardFooter className='p-2 inline-flex gap-2'>
                  <span>Name: </span>
                  <span>{item.name}</span>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
        <section className='min-h-screen h-screen overflow-auto bg-sidebar block relative'>
          {panel === 'show' ? (
            <div className='bg-zinc-50/50 z-[60] backdrop-blur rounded-lg border shadow-sm w-full max-w-xs h-[98vh] px-3 absolute top-2 left-2 bottom-2 space-y-2'>
              <div className='w-full flex items-center justify-between sticky top-0 z-10 py-3'>
                <div className='w-full flex-1'>
                  <Label>Details</Label>
                </div>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={() => {
                    setPanel('hide');
                  }}
                >
                  <X />
                </Button>
              </div>

              <div className='w-full border rounded-lg h-40 bg-white relative group cursor-pointer ease-out duration-300 transition-all'>
                <div className='w-full h-full rounded-lg'>
                  {images && images[positionImage].image ? (
                    <img
                      className='h-full w-full bg-cover rounded-lg'
                      src={images[positionImage].image}
                    />
                  ) : null}
                </div>
                <Label className='ease-out duration-300 transition-all opacity-0 group-hover:opacity-100 rounded-b-lg bg-gradient-to-t from-white to-transparent absolute bottom-0 w-full text-center py-4 px-2'>
                  Change image
                </Label>
              </div>

              <Separator />

              {/* Switch toggle Main/Entry */}
              <div className='bg-white flex flex-row items-center justify-between rounded-lg border p-4'>
                <div className='space-y-0.5 flex flex-col'>
                  <Label className='text-base'>Image Default</Label>
                  <p className='text-xs'>Set image as default or first entry</p>
                </div>
                <div>
                  <Switch
                    checked={images[positionImage]?.default}
                    onCheckedChange={(e) => onSwitchDefault(e)}
                  />
                </div>
              </div>

              <div className='overflow-y-auto h-[63vh] xl:h-fit'></div>
            </div>
          ) : null}

          <div className='relative'>
            {images.length > 1 && images[positionImage].image ? (
              <div className='absolute top-0 left-0 p-4 z-10'>
                <Button
                  variant='outline'
                  onClick={() => {
                    onOpenPanel(positionImage);
                    setPanel('show');
                  }}
                >
                  <Pen />
                  <span>Details</span>
                </Button>
              </div>
            ) : null}

            {images.length > 1 && images[positionImage].image ? (
              <ReactPhotoSphereViewer
                src={images[positionImage].image}
                height={'100vh'}
                width={'100%'}
                defaultZoomLvl={0}
                onReady={handleReady}
                plugins={plugins}
              ></ReactPhotoSphereViewer>
            ) : null}
          </div>
        </section>
      </section>
    </main>
  );
}
