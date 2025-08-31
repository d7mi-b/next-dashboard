import getMimeTypeFromBase64 from "@/utils/getMimeTypeFromBase64";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function PartnerAvatar({ image, name }: { image: Base64URLString, name: string }) {
    return (
        <section className="w-[40px] h-[40px] bg-main rounded-md flex items-center justify-center text-background overflow-hidden">
            <Avatar>
                {
                    image && <AvatarImage src={`data:${getMimeTypeFromBase64(image)};base64,${image}`} alt="Avatar" className="w-full h-full object-cover" />
                    || <AvatarFallback className="bg-main">{name.slice(0, 2).toUpperCase()}</AvatarFallback>
                }
            </Avatar>
        </section>
    );
}