// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint no-use-before-define: 0 */
// /* eslint-disable no-use-before-define */
import React, { useState } from "react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";

import utipa from "@/assets/utipa.jpg";

import { PluginConstructor, Viewer } from "@photo-sphere-viewer/core";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";

import "@photo-sphere-viewer/markers-plugin/index.css";

type ImageConfig = {
  id: string;
  path: string;
  name: string;
  isDefault: boolean;
};

type Marker = {
  id: string;
  position: {
    yaw: number;
    pitch: number;
  };
  image: string;
  anchor: "bottom center";
  size: {
    width: number;
    height: number;
  };
  tooltip: string;
  visible: boolean;
  onClick?: null;
};

type Collections = {
  id: string;
  image: ImageConfig;
  position: {
    yaw: number;
    pitch: number;
  };
  zoom: number;
  markers?: Marker[];
};

type Image = {
  path: string;
  zoom: number;
  position: {
    yaw: number;
    pitch: number;
  };
};

type ImageCollections = {
  id: string;
  isDefault: boolean;
  images: Image;
  markers: Marker | null | undefined;
};

const generateRandomId = (length = 12) => {
  return [...Array(length)].map(() => Math.random().toString(36)[2]).join("");
};

const sampleData: ImageCollections[] = [
  {
    id: generateRandomId(),
    isDefault: true,
    images: {
      path: utipa,
      position: {
        yaw: 0,
        pitch: 0,
      },
      zoom: 0,
    },
    markers: undefined,
  },
];

function App() {
  const [collections, setCollections] =
    useState<ImageCollections[]>(sampleData);

  const [selectedImage, setSelectedImage] = useState<string>();

  const onHandleClick = (item: Collections) => {
    setSelectedImage(item.image.path);
  };

  const plugins: Array<PluginConstructor | [PluginConstructor, any]> = [
    [MarkersPlugin, {}],
  ];

  const handleReady = (instance: Viewer) => {
    // const markersPlugs: any = instance.getPlugin(MarkersPlugin);

    // instance.addEventListener("position-updated", ({ position }) => {
    //   const updateCollection = collections.find(
    //     (item) => item.image.path === selectedImage
    //   );

    //   if (!updateCollection) return;

    //   updateCollection.position = {
    //     pitch: position.pitch,
    //     yaw: position.yaw,
    //   };
    // });

    // instance.addEventListener("zoom-updated", ({ zoomLevel }) => {
    //   const updateCollection = collections.find(
    //     (item) => item.image.path === selectedImage
    //   );

    //   if (!updateCollection) return;

    //   updateCollection.zoom = zoomLevel;
    // });

    // instance.addEventListener("click", ({ data }) => {
    //   const updateCollection = collections.find(
    //     (item) => item.image.path === selectedImage
    //   );

    //   if (!updateCollection) return;

    //   const randId = generateRandomId();
    //   const obj: Marker = {
    //     id: randId,
    //     position: { yaw: data.yaw, pitch: data.pitch },
    //     image: "pin.png",
    //     anchor: "bottom center",
    //     size: { width: 64, height: 64 },
    //     tooltip: "New Marker",
    //     visible: true,
    //   };

    //   markersPlugs.addMarker(obj);

    //   const findMarker = updateCollection.markers?.find(
    //     (item) => item.id === randId
    //   );

    //   if (!findMarker) {
    //     updateCollection.markers?.push(obj);

    //     setCollections([...collections, updateCollection]);
    //   } else {
    //     console.log({
    //       findMarker,
    //     });
    //   }
    // });
  };

  return (
    <main className='flex'>
      <div className='max-w-xl grid grid-cols-3 w-full min-h-screen border-r'>
        <div className='w-full col-span-1 bg-pink-50 p-4'>
          <div className='w-full'>
            <input type='file' multiple />
          </div>
        </div>
        <div className='w-full col-span-2 bg-pink-300'></div>
        {/* <div className='w-full'>
          <input type='file' multiple />
        </div> */}
        {/* <div className='space-y-2'>
          {collections.map((item) => (
            <div
              key={item.id}
              className='w-full p-1 border rounded-md cursor-pointer hover:opacity-50'
              onClick={() => onHandleClick(item)}
            >
              {item.image.isDefault ? <p>Set As Main</p> : null}
              <div className='w-full h-[200px]'>
                <img src={item.image.path} className='w-full h-full' />
              </div>
              <p>id: {item.id}</p>
              <p>Name: {item.image.name}</p>
            </div>
          ))}
        </div>

        <div className='space-y-2'>
          <h1 className='mb-4'>Markers</h1>
          {collections
            .find((item) => item.image.path === selectedImage)
            ?.markers?.map((mark) => (
              <div
                key={mark.id}
                className='w-full px-2 py-3'
                onClick={() => console.log(mark)}
              >
                <span>Id Mark: </span>
                <span>{mark.id}</span>
              </div>
            ))}
        </div>

        <button
          className='w-full border px-3 py-2'
          onClick={() =>
            console.log({
              collections,
            })
          }
        >
          Check Data
        </button> */}
      </div>
      <div className='h-screen w-full bg-zinc-100'>
        {/* {selectedImage !== "" ? (
          
        ) : null} */}

        {/* <ReactPhotoSphereViewer
          src={selectedImage}
          height={"100vh"}
          width={"100%"}
          defaultZoomLvl={0}
          onReady={handleReady}
          plugins={plugins}
        ></ReactPhotoSphereViewer> */}

        {/* <div
          ref={sphereElementRef}
          style={{ width: "100%", height: "100vh" }}
        /> */}
        {/* <div ref={viewerRef} style={{ width: "100%", height: "100vh" }} /> */}
      </div>
    </main>
  );
}

export default App;
