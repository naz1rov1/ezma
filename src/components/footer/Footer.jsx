
import { Container, Group, Text } from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandYoutube,
  IconMail,
  IconPhone,
  IconMapPin,
} from "@tabler/icons-react";

const Footer = () => {
     const logoUrl =
       "https://ezma-client.vercel.app/assets/ezma-light-D6Z9QF3F.svg";
  return (
    <footer className="bg-white mt-2 py-12 ">
      <Container size="xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img className="w-[130px]" src={logoUrl} alt="Ezma Logo" />
            </div>
            <Text className="max-w-xs text-sm">
              O'zbekistonning eng yirik kutubxona tarmog'i. Biz bilan kitob
              o'qishni boshlang!
            </Text>
          </div>

          <div>
            <Text className="font-semibold text-lg mb-3">Tezkor havolalar</Text>
            <ul className="space-y-2 text-sm">
              <li>Bosh sahifa</li>
              <li>Kutubxonalar</li>
              <li>Kitoblar</li>
              <li>Tadbirlar</li>
              <li>Biz haqimizda</li>
            </ul>
          </div>

          <div>
            <Text className="font-semibold text-lg mb-3">Bog'lanish</Text>
            <div className="flex items-center gap-2 mb-2 text-sm">
              <IconPhone size={18} /> +998 90 123 45 67
            </div>
            <div className="flex items-center gap-2 mb-2 text-sm">
              <IconMail size={18} /> info@ezma.uz
            </div>
            <div className="flex items-center gap-2 text-sm">
              <IconMapPin size={18} /> Toshkent shahri, Yunusobod tumani
            </div>
          </div>

          <div>
            <Text className="font-semibold text-lg mb-3">
              Ijtimoiy tarmoqlar
            </Text>
            <Group gap={12}>
              <IconBrandFacebook size={22} />
              <IconBrandInstagram size={22} />
              <IconBrandYoutube size={22} />
            </Group>
          </div>
        </div>

        <div className="border-t mt-10 pt-5 flex flex-col md:flex-row justify-between text-xs text-gray-500">
          <Text>© 2024 EZMA. Barcha huquqlar himoyalangan.</Text>
          <div className="flex gap-6 mt-2 md:mt-0">
            <Text>Maxfiylik siyosati</Text>
            <Text>Foydalanish shartlari</Text>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
