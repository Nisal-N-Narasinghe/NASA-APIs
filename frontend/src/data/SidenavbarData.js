import { AiOutlineHome, AiOutlineLogout } from "react-icons/ai";
import { GiAstronautHelmet, GiStarSwirl } from "react-icons/gi";
import { GrOverview } from "react-icons/gr";
import { RxDashboard } from "react-icons/rx";

const SidenavbarData = [
  {
    title: "Home",
    icon: AiOutlineHome,
    link: "#home",
  },
  {
    title: "Main",
    icon: RxDashboard,
    link: "#main",
  },

  {
    title: "Profile",
    icon: GiAstronautHelmet,
    link: "/profile",
  },
  {
    title: "Best Astro",
    icon: GiStarSwirl,
    link: "#bestpicture",
  },
  {
    title: "Mars Rover",
    icon: GrOverview,
    link: "#marsrover",
  },
  // {
  //   title: "Logout",
  //   icon: AiOutlineLogout,
  //   link: "#logout",
  // },
];

export default SidenavbarData;
