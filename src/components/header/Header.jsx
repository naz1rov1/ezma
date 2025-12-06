import { Button, Container, Flex } from "@mantine/core";
import { NavLink, useNavigate } from "react-router-dom";
import authStore from "../store/authStore";
import user from "../../assets/user-circles-set_78370-4704.avif"

export const HEADER_HEIGHT = 100;

const Header = () => {
  const navigate = useNavigate();
  const { isAuth } = authStore();

  const logoUrl =
    "https://ezma-client.vercel.app/assets/ezma-light-D6Z9QF3F.svg";

  return (
    <header
      className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-md"
      style={{ height: HEADER_HEIGHT }}
    >
      <Container maw={1320} mx="auto" className="h-full">
        <Flex justify="space-between" align="center" className="h-full">
        
          <Flex align="center" gap={50}>
            <div>
              <img className="w-[130px]" src={logoUrl} alt="Ezma Logo" />
            </div>

            <Flex gap={25}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `font-Poppins text-lg transition-colors duration-200 ${
                    isActive
                      ? "font-bold text-[#00aeff]"
                      : "text-gray-700 hover:text-[#00aeff]"
                  }`
                }
              >
                Bosh sahifa
              </NavLink>

              <NavLink
                to="/libraries"
                className={({ isActive }) =>
                  `font-Poppins text-lg transition-colors duration-200 ${
                    isActive
                      ? "font-bold text-[#00aeff]"
                      : "text-gray-700 hover:text-[#00aeff]"
                  }`
                }
              >
                Kutubxonalar
              </NavLink>

              <NavLink
                to="/book"
                className={({ isActive }) =>
                  `font-Poppins text-lg transition-colors duration-200 ${
                    isActive
                      ? "font-bold text-[#00aeff]"
                      : "text-gray-700 hover:text-[#00aeff]"
                  }`
                }
              >
                Kitoblar
              </NavLink>
            </Flex>
          </Flex>

  
          <Flex gap={20} align="center">
            {!isAuth && (
              <Button
                variant="filled"
                onClick={() => navigate("/login")} 
                className="bg-[#00aeff] hover:bg-[#0095d6] text-white font-semibold"
              >
                Kutubxonachi bo'lish
              </Button>
            )}
            {isAuth && <NavLink to="profile">
              <img className="w-15" src={user} alt="" /></NavLink>}
          </Flex>
        </Flex>
      </Container>
    </header>
  );
};

export default Header;
