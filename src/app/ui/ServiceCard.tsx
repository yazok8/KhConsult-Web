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
    <div className="bg-white text-black text-xl max-w-[250px] flex flex-col items-center rounded-lg shadow-md">
      <Image
        src={imageSrc}
        alt={title}
        width={250}
        height={250}
        className="object-cover w-full h-60 rounded-t-lg"
      />
      <div className="mt-4 w-full flex-grow">
        <p className="text-black font-semibold py-2 text-center">{title}</p>
        <p className="text-black text-sm text-center">{description}</p>
      </div>
    </div>
  );
}
