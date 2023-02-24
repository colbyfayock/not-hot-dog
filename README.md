# Not Hot Dog 🌭

Is it a hot dog?

Demo: <https://not-hot-dog-cloudinary.vercel.app/>

## What is this?

Demo app built for the [Cloudinary CloudCreate Hackathon](https://cloudinary.com/blog/cloudinary-cloudcreate-tech-products-hackathon).

### Hot Dog Detection

Uses Cloudinary AI to determine if an image includes a hot dog!

<https://console.cloudinary.com/documentation/cloudinary_ai_content_analysis_addon>

### Image Uploading

Uses the [CldUploadButton](https://next-cloudinary.spacejelly.dev/components/clduploadbutton/examples) component from [Next Cloudinary](https://next-cloudinary.spacejelly.dev/) for an easy drop-in upload solution.

### Why a hot dog?

The original Not Hot Dog is from the TV show Silicon Valley: https://www.theverge.com/tldr/2017/5/14/15639784/hbo-silicon-valley-not-hotdog-app-download

This was a fun attempt at recreating it as an example of how to use Cloudinary tech.

## Getting Started

* Install the dependencies with:

```
yarn install
```

* Add a `.env.local` file with your environment variables:

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="<Your Cloud Name>"
```

* Enable the Cloudinary AI Content Analysis Add-On in your Cloudinary account

* Create a new Upload Preset named "not-hot-dog" in your Cloudinary account that allows for unsigned uploads and uses "coco" for the detection method

* Start your development server:

```
yarn dev
```

And your application should be available at http://localhost:3000!
