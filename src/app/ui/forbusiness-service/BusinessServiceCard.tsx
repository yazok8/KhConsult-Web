// components/ServiceCard.js
import Image,{StaticImageData} from "next/image";

export default function ServiceCard({
  imageSrc,
  title,
  description,
}: {
    imageSrc: StaticImageData | string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white text-black text-xl max-w-[400px] w-[300px] flex flex-col items-center rounded-lg shadow-md mt-0">
      <Image
        src={imageSrc}
        alt={title}
        width={250}
        height={250}
        className="object-cover w-full h-60 rounded-t-lg"
      />
      <div className="mt-4 w-full flex-grow">
        <p className="text-black font-semibold py-2 text-center px-2">{title}</p>
        <p className="text-black text-sm text-center p-4">{description}</p>
      </div>
    </div>
  );
}

