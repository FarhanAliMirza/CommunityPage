"use client";
import { SocialDock } from "../FAQ-Section/Social-dock";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function Footer() {
  return (
    <footer className="border-t dark:bg-blac z-30" id="faq">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2">
          <div className="border-b   py-8 lg:order-last lg:border-b-0 lg:border-s lg:py-16 lg:ps-16">
            {/* // add componenet */}
            <SocialDock />
          </div>

          <div className="py-8 lg:py-16 lg:pe-16">
            
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <p className="font-medium ">Socials</p>

                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a
                      href="/"
                      target="_blank"
                      className="transition hover:opacity-75"
                    >
                      {" "}
                      Twitter{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/"
                      target="_blank"
                      className="  transition hover:opacity-75"
                    >
                      {" "}
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-medium ">Helpful Links</p>

                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a
                      target="_blank"
                      href="/"
                      rel="noopener noreferrer"
                      className="  transition hover:opacity-75"
                    >
                      Docs
                    </a>
                  </li>
                  <li>
                    <a href="/" className="  transition hover:opacity-75">
                      Methodology
                    </a>
                  </li>
                </ul>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
