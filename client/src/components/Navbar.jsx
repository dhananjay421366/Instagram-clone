
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Search } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";

export const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  let username = `${user?.data.user.username}`
  // username only contain 10 letters
  let completedUsername = username.slice(0, 10);


  const sidebarItems = [
    { icon: <Home />, text: "Home", route: "/home" },
    { icon: <FontAwesomeIcon icon={faPlay} size="" />, text: "Shorts", route: "/reels" },
    {
      icon: (
        <Avatar className="w-6 h-6 text-black">
          {/* profilePicture */}
          <AvatarImage src={user ? `${user?.data.user.profilePicture}` : <AvatarFallback>CN</AvatarFallback>} alt={user?.data.user.username} />

          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      text: user ? `${completedUsername}` : "Profile",
      route: `${user?.data.user._id}/profile`
    },
  ];

  const handleClick = (route) => {
    navigate(route);
  };

  return (
    <div className="flex justify-between sticky top-0  items-center">

      <div className="flex justify-between  sticky top-2    left-0 items-center ">
        <div class="x2lah0s p-4 sticky top-0 left-0 flex md:hidden x1to3lk4 x1n2onr6 xh8yej3">
          <div class="xxz18i5 x17qophe x10l6tqk x13vifvy x1lliihq x14vqqas x1kjsxda x1useyqa">
            <div className="transform: scale(1);">
              <span
                aria-describedby=":r1e:"
                class="x4k7w5x x1h91t0o x1h9r5lt x1jfb8zj xv2umb2 x1beo9mf xaigb6o x12ejxvf x3igimt xarpa2k xedcshv x1lytzrv x1t2pt76 x7ja8zs x1qrby5j"
              >
                <div class="x1n2onr6 x6s0dn4 x78zum5">
                  <Link
                    class="x1i10hfl xjbqb8w x1ejq31n xd10rxx x1sy0etr x17r0tee x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1ypdohk xt0psk2 xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz _a6hd"
                    to={"/home"}
                    role="link"
                    tabindex="0"
                  >
                    <div class="x9f619 x3nfvp2 xr9ek0c xjpr12u xo237n4 x6pnmvc x7nr27j x12dmmrz xz9dl7a xn6708d xsag5q8 x1ye3gou x80pfx3 x159b3zp x1dn74xm xif99yt x172qv1o x10djquj x1lhsz42 xzauu7c xdoji71 x1dejxi8 x9k3k5o xs3sg5q x11hdxyr x12ldp4w x1wj20lx x1lq5wgf xgqcy7u x30kzoy x9jhf4c">
                      <div>
                        <div class="x9f619 xjbqb8w x78zum5 x168nmei x13lgxp2 x5pf9jr xo71vjh x1n2onr6 x1plvlek xryxfnj x1c4vz4f x2lah0s xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1">
                          <div class="x9f619 xxk0z11 xii2z7h x11xpdln x19c4wfv xvy4d1p">
                            <svg
                              aria-label="Instagram"
                              class="x1lliihq x1n2onr6 x5n08af"
                              fill="currentColor"
                              height="24"
                              role="img"
                              viewBox="0 0 24 24"
                              width="24"
                            >
                              <title>VisualSnap</title>
                              <path d="M12 2.982c2.937 0 3.285.011 4.445.064a6.087 6.087 0 0 1 2.042.379 3.408 3.408 0 0 1 1.265.823 3.408 3.408 0 0 1 .823 1.265 6.087 6.087 0 0 1 .379 2.042c.053 1.16.064 1.508.064 4.445s-.011 3.285-.064 4.445a6.087 6.087 0 0 1-.379 2.042 3.643 3.643 0 0 1-2.088 2.088 6.087 6.087 0 0 1-2.042.379c-1.16.053-1.508.064-4.445.064s-3.285-.011-4.445-.064a6.087 6.087 0 0 1-2.043-.379 3.408 3.408 0 0 1-1.264-.823 3.408 3.408 0 0 1-.823-1.265 6.087 6.087 0 0 1-.379-2.042c-.053-1.16-.064-1.508-.064-4.445s.011-3.285.064-4.445a6.087 6.087 0 0 1 .379-2.042 3.408 3.408 0 0 1 .823-1.265 3.408 3.408 0 0 1 1.265-.823 6.087 6.087 0 0 1 2.042-.379c1.16-.053 1.508-.064 4.445-.064M12 1c-2.987 0-3.362.013-4.535.066a8.074 8.074 0 0 0-2.67.511 5.392 5.392 0 0 0-1.949 1.27 5.392 5.392 0 0 0-1.269 1.948 8.074 8.074 0 0 0-.51 2.67C1.012 8.638 1 9.013 1 12s.013 3.362.066 4.535a8.074 8.074 0 0 0 .511 2.67 5.392 5.392 0 0 0 1.27 1.949 5.392 5.392 0 0 0 1.948 1.269 8.074 8.074 0 0 0 2.67.51C8.638 22.988 9.013 23 12 23s3.362-.013 4.535-.066a8.074 8.074 0 0 0 2.67-.511 5.625 5.625 0 0 0 3.218-3.218 8.074 8.074 0 0 0 .51-2.67C22.988 15.362 23 14.987 23 12s-.013-3.362-.066-4.535a8.074 8.074 0 0 0-.511-2.67 5.392 5.392 0 0 0-1.27-1.949 5.392 5.392 0 0 0-1.948-1.269 8.074 8.074 0 0 0-2.67-.51C15.362 1.012 14.987 1 12 1Zm0 5.351A5.649 5.649 0 1 0 17.649 12 5.649 5.649 0 0 0 12 6.351Zm0 9.316A3.667 3.667 0 1 1 15.667 12 3.667 3.667 0 0 1 12 15.667Zm5.872-10.859a1.32 1.32 0 1 0 1.32 1.32 1.32 1.32 0 0 0-1.32-1.32Z"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div
                        class="x6s0dn4 x9f619 xxk0z11 x6ikm8r xeq5yr9 x1swvt13 x1s85apg xzzcqpx"
                        className="opacity: 1;"
                      >
                        <div className="width: 100%;">
                          <div class="" className="width: 100%;">
                            <span
                              class="x1lliihq x1plvlek xryxfnj x1n2onr6 x193iq5w xeuugli x1fj9vlw x13faqbe x1vvkbs x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x1i0vuye xl565be xo1l8bm x5n08af x1tu3fi x3x7a5m x10wh9bi x1wdrske x8viiok x18hxmgj"
                              dir="auto"
                              className="line-height: var(--base-line-clamp-line-height); --base-line-clamp-line-height: 20px;"
                            >
                              <span class="x1lliihq x193iq5w x6ikm8r x10wlt62 xlyipyv xuxw1ft"></span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </span>
            </div>
          </div>
        </div>
        <div class="x2lah0s  sticky top-0 left-0 hidden md:flex p-8 x1to3lk4 x1n2onr6 xh8yej3">
          <div class="x9f619 x1r3wxaz x9tmck8 xn6708d x1l90r2v x1ye3gou xh8yej3 xxz18i5 x17qophe x10l6tqk x13vifvy">
            <div className="opacity: 1;">
              <Link
                class="x1i10hfl xjbqb8w x1ejq31n xd10rxx x1sy0etr x17r0tee x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1ypdohk xt0psk2 xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz _a6hd"
                to={"/home"}
                role="link"
                tabindex="0"
              >
                <div class="flex items-center space-x-2">
                  <div class="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                    VisualSnap
                  </div>
                  <div class="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6h18M3 12h18m-7 6h7m-7 0H3m0 0V6m0 6v6" />
                    </svg>
                  </div>
                </div>

              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex sticky top-2 left-0 items-center">
        {/* Mobile View */}
        <div className="p-4 sticky top-0 left-0 flex md:hidden">
          {sidebarItems.map((item) => (
            <span
              key={item.text}
              onClick={() => handleClick(item.route)}
              className="cursor-pointer p-2"
            >
              {item.icon}
              {/* <div className="text-center">{item.text}</div> */}
            </span>
          ))}
        </div>
      </div>
      {
        user ? "" : <Link to={'/login'}>  <Button className="mr-2">Login</Button></Link>
      }
    </div>
  );
};

