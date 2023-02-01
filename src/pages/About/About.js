
import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import { BsInstagram, BsYoutube } from "react-icons/bs";

const About = () => {
    const visitInstagram = () => {
        window.location = "https://instagram.com/shahriarlimon";
    };
    return (
        <div className="aboutSection">
            <div></div>
            <div className="aboutSectionGradient"></div>
            <div className="aboutSectionContainer">
                <Typography component="h1">About Us</Typography>

                <div>
                    <div>
                        <Avatar
                            style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                            src="https://res-console.cloudinary.com/dgccwhsv8/thumbnails/v1/image/upload/v1674738054/YXZhdGFycy94cGZtbzRxd3J0dGI1aDM4eGVsMA==/folder_thumbnail/d184OCxoXzg4LGNfdGh1bWI="
                            alt="Founder"
                        />
                        <Typography>SHAHRIAR LIMON</Typography>
                        <Button onClick={visitInstagram} color="primary">
                            Visit Instagram
                        </Button>
                        <span>
                            This is a sample wesbite made by @shahriarlimon.
                        </span>
                    </div>
                    <div className="aboutSectionContainer2">
                        <Typography component="h2">Our Brands</Typography>
                        <a
                            href="https://www.youtube.com/"
                            target="blank"
                        >
                            <BsYoutube className="youtubeSvgIcon" />
                        </a>

                        <a href="https://instagram.com/shahriarlimon" target="blank">
                            <BsInstagram className="instagramSvgIcon" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;