import { useState } from 'react';
import Head from 'next/head'
import { CldImage, CldUploadButton } from 'next-cloudinary';
import styles from '@/styles/Home.module.scss'

interface UploadResults {
  height: number,
  info: {
    detection: {
      object_detection: {
        data: {
          coco: {
            tags: object
          }
        }
      }
    }
  },
  public_id: string,
  width: number,
}

interface UploadResultsTags {
  "hot-dog"?: Array<object>
}

const MAX_WIDTH = 960;

export default function Home() {
  const [uploadResults, setUploadResults] = useState<UploadResults>();
  const uploadResultsTags: UploadResultsTags = uploadResults?.info.detection.object_detection.data.coco.tags || [];
  const isHotDog = uploadResultsTags['hot-dog'] || false;

  let width: number|undefined = undefined;
  let height: number|undefined = undefined;

  if ( typeof uploadResults?.width === 'number' ) {
    width = uploadResults.width > MAX_WIDTH ? MAX_WIDTH : uploadResults.width;
    height = uploadResults.height * ( width / uploadResults.width );
  }

  function handleOnUpload(result: any, widget: any) {
    setUploadResults(result.info);
    widget.close();
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Not Hot Dog</h1>

        <p className={styles.description}>Is it a hot dog? 🌭</p>

        {uploadResults?.public_id && (
          <div className={styles.image}>
            <span className={styles.imageWrapper}>
              <CldImage
                width={width}
                height={height}
                crop="fill"
                src={uploadResults.public_id}
                alt="Sneakers!"
              />
              {isHotDog && (
                <p className={styles.isHotDog}>Hot Dog</p>
              )}
              {!isHotDog && (
                <p className={styles.isNotHotDog}>Not Hot Dog</p>
              )}
            </span>
          </div>
        )}

        {!uploadResults?.public_id && (
          <div className={styles.image}>
            <span className={styles.imageWrapper}>
              <CldImage
                width="600"
                height="800"
                crop="fill"
                src="not-hot-dog-assets/hot-dogs"
                alt="Hot Dogs"
              />
              <p className={styles.isHotDog}>Hot Dog</p>
            </span>
            <span className={styles.imageWrapper}>
              <CldImage
                width="600"
                height="800"
                crop="fill"
                src="not-hot-dog-assets/dog-pool-toy"
                alt="Hot Dogs"
              />
              <p className={styles.isNotHotDog}>Not Hot Dog</p>
            </span>
          </div>
        )}

        {uploadResults?.public_id && (
          <p className={styles.description}>Need to check another?</p>
        )}

        <div className={styles.upload}>
          <CldUploadButton
            uploadPreset="not-hot-dog"
            onUpload={handleOnUpload}
          />
        </div>
      </main>
    </>
  )
}
