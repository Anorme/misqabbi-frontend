import { FaWhatsapp } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { RiTwitterXFill } from "react-icons/ri";
import { PiTelegramLogoLight } from "react-icons/pi";
const Footer = () => {
  return <div className="bg-[#b3a7d8] w-full h-[400px] mt-[100px]">
     <div className=" flex justify-around pt-[50px]">
    <div className="flex flex-col">
    <img src="/images/Logo.png" alt="logo here" className="w-[350px]" />
    <p className="text-lg">Discover beautifully women's clothing, <br />thoughtfully styled for both special occasions and <br /> everyday elegance</p>
    </div>
    <span className="flex gap-[150px]">
    <p> <span className="text-gray-600 text-lg">Made for </span> <br /> Women clothes <br />Classy <br /> Casual</p>
    <p> <span className="text-gray-600 text-lg">Collections </span> <br />Wedding dress <br />Events and occasions <br />Group match <br />Summer <br />Handwoven</p>
    </span>
   <p> <span className="text-lg text-gray-600">Quick links </span> <br />Home <br />Shop All <br />About Us</p>
</div>
<div className="flex justify-around pt-[70px]">
<span className="flex text-2xl text-gray-500 gap-[20px]">
<FaWhatsapp />
<IoLogoInstagram />
<RiTwitterXFill />
<PiTelegramLogoLight />
</span>
<span className="flex gap-[30px]">
<p>About Us</p>
<p>Terms of Service</p>
<p>Privacy Policies</p>
<p>Cookies</p>
</span>
 ©️2025 Misqabbi. All rights reserved.
</div>
  </div>;
};

export default Footer;
