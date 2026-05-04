import React from "react";
import Link from "next/link";
import { footerLinks, socialMedia, openingHours } from "@/constants/data";
import Image from "next/image";
import { Content } from "../ui";

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-secondary-off">
      <div className="page-wrapper pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-8">
          {/* Left Column - Logo and Description */}
          <div className="space-y-[30px]">
            <Link href="/">
              <Image
                src="/logo-white.svg"
                alt="Bedia Pottery Logo"
                width={290}
                height={31}
              />
            </Link>
            <Content className="  !text-secondary-off mb-2.5">
              A Premium Ceramic Studio Offers A Unique Fusion Of Art, Mental
              Health & Fun!
            </Content>
            <div className="relative  overflow-hidden h-48">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.198509554!2d55.2703!3d25.2048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDEyJzE3LjMiTiA1NcKwMTYnMTMuMSJF!5e0!3m2!1sen!2sae!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
              <div className="absolute bottom-2 right-2 bg-gray-200/90 px-3 py-1.5 rounded flex items-center gap-1.5 text-gray-700 text-sm cursor-pointer hover:bg-gray-300/90 transition-colors">
                <span>View large map</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Middle-Left Column - Links */}
          <div className="mt-16">
            <h3 className=" 2xl:text-2xl  xl:text-xl font-medium mb-10">Links</h3>
            <ul className="space-y-4">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-secondary-off hover:text-white transition-colors duration-200 2xl:text-[22px]  xl:text-lg font-normal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Middle-Right Column - Opening Hours */}
          <div className="mt-16">
            <h3 className="font-semibold mb-10 2xl:text-2xl  xl:text-xl">Opening Hours</h3>
            <ul className="space-y-4  2xl:text-[22px]  xl:text-lg">
              <li>
                <p className="font-normal">{openingHours.weekdays.days}</p>
                <p className="font-light">{openingHours.weekdays.hours}</p>
              </li>
              <li className="mt-4">
                <p className="font-normal">{openingHours.sunday.days}</p>
                <p className="font-light">{openingHours.sunday.hours}</p>
              </li>
            </ul>
          </div>

          {/* Right Column - Newsletter & Social Media */}
          <div className="mt-16">
            <h3 className=" 2xl:text-2xl  xl:text-xl font-medium mb-10">Newsletter</h3>
            <form className="mb-6">
              <div className="flex pr-1.5  border-[0.8px] h-[60px] border-secondary-off  items-center">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="flex-1 px-4 py-6  relative
  font-normal
  text-[18px]
  leading-none
  tracking-normal
  capitalize  w-full text-white  placeholder-white focus:outline-none focus:bg-transparent focus:bg-none bg-transparent"
                />
                {/* Arrow Circle */}
                <span
                  className="flex items-center justify-center w-12 h-12 rounded-full 
        bg-white  transition-transform duration-300 
  cursor-pointer
  z-10
        group-hover:translate-x-1"
                >
                  <svg
                    width="46"
                    height="46"
                    viewBox="0 0 46 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <circle cx="23" cy="23" r="23" fill="white" />
                    <mask
                      id="mask0_47_96"
                      style={{ maskType: "alpha" }}
                      maskUnits="userSpaceOnUse"
                      x="10"
                      y="10"
                      width="26"
                      height="26"
                    >
                      <rect
                        x="10"
                        y="10"
                        width="26"
                        height="26"
                        fill="url(#pattern0_47_96)"
                      />
                    </mask>
                    <g mask="url(#mask0_47_96)">
                      <rect
                        x="10"
                        y="10"
                        width="26"
                        height="26"
                        fill="url(#pattern1_47_96)"
                      />
                      <rect
                        x="10"
                        y="10"
                        width="26"
                        height="26"
                        fill="#0D463D"
                      />
                    </g>
                    <defs>
                      <pattern
                        id="pattern0_47_96"
                        patternContentUnits="objectBoundingBox"
                        width="1"
                        height="1"
                      >
                        <use
                          xlinkHref="#image0_47_96"
                          transform="scale(0.00195312)"
                        />
                      </pattern>
                      <pattern
                        id="pattern1_47_96"
                        patternContentUnits="objectBoundingBox"
                        width="1"
                        height="1"
                      >
                        <use
                          xlinkHref="#image0_47_96"
                          transform="scale(0.00195312)"
                        />
                      </pattern>
                      <image
                        id="image0_47_96"
                        width="512"
                        height="512"
                        preserveAspectRatio="none"
                        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAACAKADAAQAAAABAAACAAAAAAAL+LWFAAAglElEQVR4Ae3de4ytV1kH4J5eoS3XtNACknJLABMKYiAkQEEiAha0QkRBY2LAxEREIAaVaKohhn80kcRE4A8MSpQ7ihQIlxaIBCqXFoFSbQEt9E5rC5TTK/4WnEkn05meM2f296332+v5ktU9s2fv9b7vs6ZnvbMv3z7iCAcBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgMA2Avu2uc5VBAgQmFPg/gn2jjkDbol1Xb5/8ZbrfEuAAAECBAhMLHBK5v9Rx3HFxPWZnkBJgSNLZiUpAgQIECBAYFIBDcCkvCYnQIAAAQI1BTQANddFVgQIECBAYFIBDcCkvCYnQIAAAQI1BTQANddFVgQIECBAYFIBDcCkvCYnQIAAAQI1BTQANddFVgQIECBAYFIBDcCkvCYnQIAAAQI1BTQANddFVgQIECBAYFIBDcCkvCYnQIAAAQI1BTQANddFVgQIECBAYFIBDcCkvCYnQIAAAQI1BTQANddFVgQIECBAYFIBDcCkvCYnQIAAAQI1BTQANddFVgRGErijc7H+Hey8AML3EfCL38ddVAIE7hS45c4vu3x1bJeoghLoLKAB6LwAwhMgcMTNnQ2O6xxfeAJdBPZ1iSooAQIE7hRof4jcfue3s3/VnoI4avaoAhLoLOARgM4LIDwBAke0Dfi2jg7t38GjO8YXmkAXAQ1AF3ZBCRDYIrB/y/dzf3vC3AHFI9BbQAPQewXEJ0CgCfR+HcDJloHAaAIagNFWXL0Eagrc0DktDUDnBRB+fgENwPzmIhIgcFeBa+561azXaABm5RasgoAGoMIqyIEAgWs7Ezygc3zhCcwuoAGYnVxAAgS2Eej9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UEFAA1BhFeRAgAABAgRmFtAAzAwuHAECBAgQqCCgAaiwCnIgQIAAAQIzC2gAZgYXjgABAgQIVBDQAFRYBTkQIECAAIGZBTQAM4MLR4AAAQIEKghoACqsghwIECBAgMDMAhqAmcGFI0CAAAECFQQ0ABVWQQ4ECBAgQGBmAQ3AzODCESBAgACBCgIagAqrIAcCBAgQIDCzgAZgZnDhCBAgQIBABQENQIVVkAMBAgQIEJhZ4OiZ4wlHgACBrQK35IqPbb1yxu+vmzGWUAQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQI1Bb4fwWEHqLw/bqdAAAAAElFTkSuQmCC"
                      />
                    </defs>
                  </svg>
                </span>
              </div>
            </form>

            <div className="mb-4">
              <h3 className=" 2xl:text-2xl  xl:text-xl font-medium mb-10">Follow Us On:</h3>
              <div className="flex gap-8">
                {socialMedia.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-full border-[0.5px] border-secondary-off flex items-center justify-center hover:border-white/50 transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <Image
                      src={social.icon}
                      alt={social.name}
                      width={24}
                      height={24}
                      className="w-7 h-7"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className=" pt-12 flex justify-between items-center ">
          <Content className="  !text-secondary-off ">
            Made With Love By Bedia Pottery LLC © 2024
          </Content>
          <Content className="  !text-secondary-off ">
            <Link href="/privacy" className="">
              Privacy Policy
            </Link>
          </Content>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
