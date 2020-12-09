import React, { useState } from "react";
import {
  SolutionsWrapper,
  AgileWrapper,
  SoftwareName,
  SolutionOptions,
  SolutionImageWrapper,
} from "../util/AgileStyledComponents";
import { Grid, Image } from "semantic-ui-react";
import SolutionOne from "./Solution-One";
import SolutionTwo from "./Solution-Two";
import SolutionThree from "./Solution-Three";
import SolutionFour from "./Solution-Four";

const images = [
  "https://www.prunderground.com/wp-content/uploads/2019/02/animation-creator-software-4.png",
  "https://www.prunderground.com/wp-content/uploads/2019/02/animation-creator-software-3.png",
  "https://www.prunderground.com/wp-content/uploads/2019/02/animation-creator-software-2.png",
  "https://www.prunderground.com/wp-content/uploads/2019/02/animation-creator-software.png",
];

const Solutions = (props) => {
  const [selectedSolution, setSelectedSolution] = useState("solution-1");
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <>
      <div>
        <SolutionsWrapper>Our solutions</SolutionsWrapper>
        <AgileWrapper>
          <div
            style={{ display: "flex", flexDirection: "row", padding: "25px 0" }}
          >
            <SolutionOptions
              onClick={() => {
                setSelectedSolution("solution-1");
                setSelectedImage(0);
              }}
            >
              Solution 1
            </SolutionOptions>
            <SolutionOptions
              onClick={() => {
                setSelectedSolution("solution-2");
                setSelectedImage(1);
              }}
            >
              Solution 2
            </SolutionOptions>
            <SolutionOptions
              onClick={() => {
                setSelectedSolution("solution-3");
                setSelectedImage(2);
              }}
            >
              Solution 3
            </SolutionOptions>
            <SolutionOptions
              onClick={() => {
                setSelectedSolution("solution-4");
                setSelectedImage(3);
              }}
            >
              Solution 4
            </SolutionOptions>
          </div>
          {selectedSolution === "solution-1" ? (
            <SolutionOne />
          ) : selectedSolution === "solution-2" ? (
            <SolutionTwo />
          ) : selectedSolution === "solution-3" ? (
            <SolutionThree />
          ) : selectedSolution === "solution-4" ? (
            <SolutionFour />
          ) : (
            <div></div>
          )}
        </AgileWrapper>
      </div>
      <SolutionImageWrapper>
        <Image size="big" src={images[selectedImage]} />
      </SolutionImageWrapper>
    </>
  );
};

export default Solutions;
