import { motion } from "framer-motion";
import React, { useState } from "react";
import { Image } from "semantic-ui-react";
import {
  AgileWrapper,
  SolutionImageWrapper,
  SolutionOptions,
  SolutionsWrapper,
} from "../util/AgileStyledComponents";
import { secondVariants } from "../util/animations";
import Solution from "./Solution";
import {
  images,
  keys,
  softwareNames,
  solutionImages,
  titles,
} from "./solutionImages";

const Solutions = () => {
  const [selectedSolution, setSelectedSolution] = useState("solution-1");
  const [selectedImage, setSelectedImage] = useState(0);

  const renderSolutionOptions = () => (
    <div style={{ display: "flex", flexDirection: "row", padding: "25px 0" }}>
      {keys.map((key, index) => (
        <SolutionOptions
          onClick={() => {
            setSelectedSolution(key);
            setSelectedImage(index);
          }}
        >
          {titles[index]}
        </SolutionOptions>
      ))}
    </div>
  );

  const renderSolutions = () =>
    keys.map(
      (key) =>
        selectedSolution == key && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={secondVariants}
          >
            <Solution
              imageUris={solutionImages.get(key)}
              softwareNames={softwareNames.get(key)}
            />
          </motion.div>
        )
    );

  return (
    <>
      <AgileWrapper>
        <SolutionsWrapper>Our solutions</SolutionsWrapper>
        {renderSolutionOptions()}
        {renderSolutions()}
      </AgileWrapper>
      <SolutionImageWrapper>
        <Image size="big" src={images[selectedImage]} />
      </SolutionImageWrapper>
    </>
  );
};

export default Solutions;
