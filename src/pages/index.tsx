import { useState } from 'react';
import Head from 'next/head'
import { CldImage, CldUploadButton, CldOgImage } from 'next-cloudinary';
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
    width = uploadResults.width > MAX_WIDTH ? MAX_WIDTH : Math.round(uploadResults.width);
    height = Math.round(uploadResults.height * ( width / uploadResults.width ));
  }

  function handleOnUpload(result: any, widget: any) {
    setUploadResults(result.info);
    widget.close();
  }

  return (
    <>
      <Head>
        <title>Not Hot Dog - Use AI to Detect If It&apos;s a Hot Dog</title>
        <meta name="description" content="Is it a hot dog? Are YOU a hot dog?" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CldOgImage
        width="2400"
        height="1200"
        src="not-hot-dog-assets/not-hot-dog-og"
        gravity="auto"
        alt="og"
        twitterTitle="Not Hot Dog"
      />
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
                alt="Results!"
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
                alt="Dogs that are hot"
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

      <footer className={styles.footer}>
        <div>
          <p>
            By <a href="https://twitter.com/colbyfayock">Colby Fayock</a> with <a href="https://nextjs.org/">Next.js</a> &amp; <a href="https://cloudinary.com/">Cloudinary</a>.
          </p>
          <p>
            <a href="https://github.com/colbyfayock/not-hot-dog">View the source</a> or <a href="https://www.youtube.com/watch?v=2hQa_N3ILjM">learn how to build this</a>!
          </p>
        </div>
      </footer>
    </>
  )
}
