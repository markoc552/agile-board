import { motion } from "framer-motion";
import React from "react";
import { Grid, Image } from "semantic-ui-react";
import useMediaQuery from "use-mediaquery";
import companyFive from "../../assets/images/company-five.png";
import companyFour from "../../assets/images/company-four.png";
import companySeven from "../../assets/images/company-seven.png";
import companyThree from "../../assets/images/company-three.png";
import {
  SolutionsWrapper,
  TrustedCompany,
  TrustedCompanyDescription,
  TrustedCompanyWrapper,
} from "../util/AgileStyledComponents";
import { secondVariants } from "../util/animations";

const TrustedCompanies = () => {
  const isTabletOnly = useMediaQuery("only screen and (max-width: 1010px)");

  const imageUris = [companyFive, companySeven, companyFour, companyThree];

  const colors = ["#172b4d", "#172b4d", "#79f2c0", "#ffc400", "#0052cc"];

  const renderCompanies = () =>
    imageUris.map((imageUri, index) => (
      <TrustedCompany style={{ backgroundColor: `${colors[index]}` }}>
        <Grid>
          <Grid.Row>
            <Image
              src={`${imageUri}`}
              size="mini"
              centered
              style={{
                width: "125px",
                height: "125px",
                margin: "0 auto",
              }}
            />
          </Grid.Row>
          <Grid.Row>
            <div
              style={{
                margin: "0 auto",
                fontSize: "17px",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Lorem ipsum
            </div>
          </Grid.Row>
          <Grid.Row>
            <TrustedCompanyDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </TrustedCompanyDescription>
          </Grid.Row>
        </Grid>
      </TrustedCompany>
    ));

  return (
    <TrustedCompanyWrapper>
      <div>
        <SolutionsWrapper>Trusted Companies</SolutionsWrapper>
        <div style={{ marginTop: "15px", width: "75vw" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris.
        </div>
      </div>
      <motion.div initial="hidden" animate="visible" variants={secondVariants}>
        <div
          style={{
            display: "flex",
            flexDirection: isTabletOnly ? "column" : "row",
            width: "70vw",
          }}
        >
          {renderCompanies()}
        </div>
      </motion.div>
    </TrustedCompanyWrapper>
  );
};

export default TrustedCompanies;
